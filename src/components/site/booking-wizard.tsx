"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBooking } from "./booking-provider";
import { ADDONS_EXP, ADDONS_VILLA, EXPERIENCES, UNITS, type Addon } from "@/lib/data";
import { fmtDate, money, nightsBetween, TODAY_ISO, toISO, villaQuote, expQuote, addonAmount } from "@/lib/pricing";
import { rangeFullyAvailable, expDateTaken, nightTaken, remainingFor } from "@/lib/availability";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, InfoIcon,
  MinusIcon, PlusIcon, XIcon,
} from "./icons";

const SEQ = {
  villa: ["villa", "dates", "guests", "addons", "review"],
  experience: ["experience", "edate", "slot", "people", "addons", "review"],
} as const;
const LABELS = {
  villa: ["Villa", "Dates", "Guests", "Extras", "Review"],
  experience: ["Experience", "Date", "Time", "Guests", "Extras", "Review"],
};

/* ---------------- small pieces ---------------- */

function Head({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="wk-head">
      <span className="wk-kicker">{kicker}</span>
      <div className="wk-title">{title}</div>
      {sub && <p className="wk-sub">{sub}</p>}
    </div>
  );
}

/* ---------------- main wizard ---------------- */

function useMountReset(active: boolean, fn: () => void) {
  // runs once per open transition, after paint
  const wasOpen = useRef(false);
  useEffect(() => {
    if (active && !wasOpen.current) fn();
    wasOpen.current = active;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

export function BookingWizard() {
  const { b, isOpen, update, close, back, next, bookings } = useBooking();
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [summaryOpen, setSummaryOpen] = useState(false);

  // fresh slate every time the wizard opens
  useMountReset(isOpen, () => {
    setSummaryOpen(false);
  });

  const mode = b.mode;
  const stepName = mode && b.step >= 0 ? SEQ[mode][b.step] ?? null : null;
  const isLast = mode ? b.step === SEQ[mode].length - 1 : false;

  const keptNights = useMemo(() => {
    const list: { checkIn?: string | null; checkOut?: string | null }[] = [];
    bookings.forEach((x) => {
      if (x.type === "villa" && x.status !== "cancelled") list.push({ checkIn: x.checkIn, checkOut: x.checkOut });
    });
    return list;
  }, [bookings]);

  const quote = useMemo(() => {
    if (mode === "villa") return villaQuote(b);
    if (mode === "experience") return expQuote(b);
    return null;
  }, [b, mode]);

  const addonList: Addon[] = mode === "experience" ? ADDONS_EXP : ADDONS_VILLA;

  function canNext(): boolean {
    if (!mode) return false;
    if (mode === "villa") {
      const v = UNITS.find((x) => x.id === b.villaId);
      if (stepName === "villa") return !!b.villaId;
      if (stepName === "dates")
        return !!(b.checkIn && b.checkOut && nightsBetween(b.checkIn, b.checkOut) >= 1 && rangeFullyAvailable(villaIdOf(), b.checkIn, b.checkOut, TODAY_ISO, keptNights));
      if (stepName === "guests") return !!v && b.adults + b.children <= v.max;
      if (stepName === "addons") return true;
    } else {
      const e = EXPERIENCES.find((x) => x.id === b.expId);
      const local = localPeople(b.expId, b.date, b.slot);
      if (stepName === "experience") return !!b.expId;
      if (stepName === "edate") return !!b.date;
      if (stepName === "slot") return !!e && !!b.slot && !!b.date && remainingFor(b.expId!, b.date, b.slot, e.cap, local) > 0;
      if (stepName === "people") return !!e && !!b.date && !!b.slot && b.people >= 1 && b.people <= remainingFor(b.expId!, b.date, b.slot, e.cap, local);
      if (stepName === "addons") return true;
    }
    return true;
  }

  function villaIdOf() {
    return b.villaId ?? "__none__";
  }
  function localPeople(expId: string | null, date: string | null, slot: string | null) {
    if (!expId || !date || !slot) return 0;
    return bookings
      .filter((x) => x.type === "experience" && x.expId === expId && x.status !== "cancelled" && x.date === date && x.slot === slot)
      .reduce((t, x) => t + (x.people ?? 0), 0);
  }

  /* ---------- public demo completion ---------- */
  function confirm() {
    toast({ title: "Public demo only. No booking was made, and no information was sent or saved." });
    close();
  }

  function onNext() {
    if (stepName === "review") void confirm();
    else next();
  }

  return (
    <div
      className={`overlay${isOpen ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Booking"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={`panel${summaryOpen ? " show-summary" : ""}`}>
        <button className="bm-close" aria-label="Close booking" onClick={close}>
          <XIcon />
        </button>

        <div className="bm-main">
          {mode && <Progress mode={mode} step={b.step} />}
          <div id="bmStep" className="anim" key={`${mode}-${b.step}`}>
            {!mode ? (
              <Chooser />
            ) : stepName === "villa" ? (
              <VillaStep />
            ) : stepName === "dates" ? (
              <DatesStep calMonth={calMonth} setCalMonth={setCalMonth} keptNights={keptNights} />
            ) : stepName === "guests" ? (
              <GuestsStep />
            ) : stepName === "experience" ? (
              <ExpStep />
            ) : stepName === "edate" ? (
              <EDateStep calMonth={calMonth} setCalMonth={setCalMonth} />
            ) : stepName === "slot" ? (
              <SlotStep localPeople={localPeople} />
            ) : stepName === "people" ? (
              <PeopleStep localPeople={localPeople} />
            ) : stepName === "addons" ? (
              <AddonsStep list={addonList} />
            ) : stepName === "review" ? (
              <ReviewStep />
            ) : null}
          </div>

          <div className="bm-actions">
            <button id="bmBack" onClick={back} hidden={mode === null || b.step < 0}>
              <ArrowLeftIcon /> Back
            </button>
            <Button id="bmNext" disabled={!canNext()} onClick={onNext} className="ml-auto">
              {isLast ? "Finish demo" : "Continue"}
            </Button>
          </div>
        </div>

        <Summary quote={quote} mode={mode} addonList={addonList} />

        <div className="bm-bar">
            <div className="bm-total">
              <span>Grand total</span>
              <b>{quote ? money(quote.grand) : "—"}</b>
            </div>
            <button id="bmBarToggle" aria-expanded={summaryOpen} onClick={() => setSummaryOpen((v) => !v)}>
              Details{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
        </div>
      </div>
    </div>
  );
}

function Progress({ mode, step }: { mode: "villa" | "experience"; step: number }) {
  const labels = LABELS[mode];
  return (
    <div className="bm-progress" aria-hidden="true">
      <div className="pg-row">
        {labels.map((_, i) => (
          <FragmentLine key={i} i={i} step={step} />
        ))}
      </div>
      <div className="pg-labels">
        {labels.map((l, i) => (
          <span key={l} className={i <= step ? "on" : ""}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
function FragmentLine({ i, step }: { i: number; step: number }) {
  return (
    <>
      {i > 0 && <span className={`pg-bar${i <= step ? " done" : ""}`} />}
      <span className={`pg-dot${i === step ? " cur" : i < step ? " done" : ""}`} />
    </>
  );
}

/* ---------------- steps ---------------- */

function Chooser() {
  const { update } = useBooking();
  const pick = (m: "villa" | "experience") => update({ mode: m, step: 0 });
  return (
    <>
      <Head
        kicker="Azure Palms — Reservations"
        title="What brings you to the bay?"
        sub="Both books take about a minute. Nothing is charged today — we hold your dates and confirm by email."
      />
      <div className="chooser">
        <button type="button" className="chooser__opt" data-pick="villa" onClick={() => pick("villa")}>
          <img src="/images/chooser-villa.jpg" alt="An Azure Palms villa and its pool" loading="lazy" />
          <div className="co-body">
            <h3>A villa stay</h3>
            <p>Nights, breakfast at the beach kitchen, the whole slow routine.</p>
            <span className="co-from">From $240 / night</span>
          </div>
        </button>
        <button type="button" className="chooser__opt" data-pick="experience" onClick={() => pick("experience")}>
          <img src="/images/chooser-exp.jpg" alt="Golden hour over the bay" loading="lazy" />
          <div className="co-body">
            <h3>A day experience</h3>
            <p>One outing, one slot on the day sheet — no room required.</p>
            <span className="co-from">From $45 / person</span>
          </div>
        </button>
      </div>
    </>
  );
}

function VillaStep() {
  const { b, update } = useBooking();
  const row = (v: (typeof UNITS)[number]) => (
    <button
      type="button"
      key={v.id}
      className={`opt-row${b.villaId === v.id ? " sel" : ""}`}
      data-v={v.id}
      onClick={() => update({ villaId: v.id })}
    >
      <img src={v.img} alt="" />
      <div style={{ minWidth: 0 }}>
        <h4>{v.name}</h4>
        <span className="opt-meta">
          Sleeps {v.max} · {v.amenities.slice(0, 2).join(" · ")}
        </span>
      </div>
      <div className="opt-price">
        {money(v.price)}
        <small>per night</small>
      </div>
      <span className="opt-check">
        <CheckIcon />
      </span>
    </button>
  );
  const groups: [string, typeof UNITS][] = [
    ["Villas & suites", UNITS.filter((v) => v.kind !== "room")],
    ["Rooms", UNITS.filter((v) => v.kind === "room")],
  ];
  return (
    <>
      <Head kicker="Villa stay" title="Pick the one that fits" sub="Four villas and three rooms — every rate includes breakfast from the beach kitchen." />
      <div className="opt-list">
        {groups.map(([label, list]) => (
          <div key={label}>
            <p className="opt-group">{label}</p>
            {list.map(row)}
          </div>
        ))}
      </div>
    </>
  );
}

function ExpStep() {
  const { b, update } = useBooking();
  return (
    <>
      <Head kicker="Day experience" title="Pick your outing" sub="Slots are small and fill early — the day sheet below is live." />
      <div className="opt-list">
        {EXPERIENCES.map((e) => (
          <button
            type="button"
            key={e.id}
            className={`opt-row${b.expId === e.id ? " sel" : ""}`}
            data-e={e.id}
            onClick={() => update({ expId: e.id })}
          >
            <img src={e.img} alt="" />
            <div style={{ minWidth: 0 }}>
              <h4>{e.name}</h4>
              <span className="opt-meta">
                {e.dur} · up to {e.cap} guests
              </span>
            </div>
            <div className="opt-price">
              {money(e.price)}
              <small>per person</small>
            </div>
            <span className="opt-check">
              <CheckIcon />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function CalBox({
  mode,
  calMonth,
  setCalMonth,
  keptNights,
}: {
  mode: "villa" | "experience";
  calMonth: Date;
  setCalMonth: (d: Date) => void;
  keptNights: { checkIn?: string | null; checkOut?: string | null }[];
}) {
  const { b, update } = useBooking();
  const y = calMonth.getFullYear();
  const m = calMonth.getMonth();
  const now = new Date();
  const curM = y * 12 + m;
  const minM = now.getFullYear() * 12 + now.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const dim = new Date(y, m + 1, 0).getDate();

  const cells: React.ReactNode[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(<span key={`o${i}`} className="cal__day is-out" />);
  for (let d = 1; d <= dim; d++) {
    const iso = toISO(y, m, d);
    const dis =
      mode === "villa"
        ? nightTaken(b.villaId ?? "__none__", iso, TODAY_ISO, keptNights)
        : expDateTaken(b.expId ?? "__none__", iso, TODAY_ISO);
    let cls = "cal__day";
    if (iso === TODAY_ISO) cls += " is-today";
    if (mode === "villa") {
      if (iso === b.checkIn || iso === b.checkOut) cls += " is-sel";
      else if (b.checkIn && b.checkOut && iso > b.checkIn && iso < b.checkOut) cls += " is-in";
    } else if (iso === b.date) cls += " is-sel";
    cells.push(
      <button
        type="button"
        key={iso}
        className={cls}
        data-date={iso}
        disabled={dis}
        aria-label={`${fmtDate(iso)}${dis ? ", unavailable" : ""}`}
        onClick={() => {
          if (mode === "villa") {
            if (!b.checkIn || (b.checkIn && b.checkOut)) update({ checkIn: iso, checkOut: null });
            else if (iso > b.checkIn) update({ checkOut: iso });
            else update({ checkIn: iso });
          } else update({ date: iso, slot: null });
        }}
      >
        {d}
      </button>
    );
  }

  const title = new Date(y, m, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <div className="cal" id="calBox">
      <div className="cal__head">
        <button
          type="button"
          className="cal__nav"
          aria-label="Previous month"
          disabled={curM <= minM}
          onClick={() => setCalMonth(new Date(y, m - 1, 1))}
        >
          <ChevronLeftIcon />
        </button>
        <b>{title}</b>
        <button
          type="button"
          className="cal__nav"
          aria-label="Next month"
          disabled={curM >= minM + 11}
          onClick={() => setCalMonth(new Date(y, m + 1, 1))}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="cal__dow">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="cal__grid">{cells}</div>
    </div>
  );
}

function DatesStep({
  calMonth,
  setCalMonth,
  keptNights,
}: {
  calMonth: Date;
  setCalMonth: (d: Date) => void;
  keptNights: { checkIn?: string | null; checkOut?: string | null }[];
}) {
  const { b } = useBooking();
  const n = b.checkIn && b.checkOut ? nightsBetween(b.checkIn, b.checkOut) : 0;
  const ok =
    b.checkIn && b.checkOut
      ? rangeFullyAvailable(b.villaId ?? "__none__", b.checkIn, b.checkOut, TODAY_ISO, keptNights)
      : false;
  return (
    <>
      <Head kicker="Villa stay" title="When should the bay expect you?" sub="Struck-through days are already spoken for. Weekends fill first." />
      <CalBox mode="villa" calMonth={calMonth} setCalMonth={setCalMonth} keptNights={keptNights} />
      <div className="cal-legend">
        <span><i style={{ background: "var(--teal)" }} />Selected</span>
        <span><i style={{ background: "var(--sand)" }} />Your stay</span>
        <span><i style={{ background: "#fff", border: "1px solid var(--line)" }} />Available</span>
      </div>
      {b.checkIn && (
        <div className="readout show">
          {b.checkOut ? (
            <>
              <b>
                {fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}
              </b>{" "}
              · {n} night{n > 1 ? "s" : ""}
              {!ok && " — unavailable"}
            </>
          ) : (
            <>
              Checking in <b>{fmtDate(b.checkIn)}</b> — now tap your departure.
            </>
          )}
        </div>
      )}
      {b.checkIn && b.checkOut && !ok && (
        <div className="wk-warn show">Some nights in that stretch are already taken — nudge your dates slightly.</div>
      )}
    </>
  );
}

function EDateStep({ calMonth, setCalMonth }: { calMonth: Date; setCalMonth: (d: Date) => void }) {
  const { b } = useBooking();
  return (
    <>
      <Head kicker="Day experience" title="Which day suits?" sub="Struck-through days are off the sheet — boat maintenance, spa turnover, weather." />
      <CalBox mode="experience" calMonth={calMonth} setCalMonth={setCalMonth} keptNights={[]} />
      {b.date && (
        <div className="readout show">
          <b>{fmtDate(b.date)}</b> — good day for it.
        </div>
      )}
    </>
  );
}

function GuestsStep() {
  const { b, update } = useBooking();
  const v = UNITS.find((x) => x.id === b.villaId);
  if (!v) return null;
  const total = b.adults + b.children;
  const setG = (which: "adults" | "children", d: number) => {
    if (which === "adults") update({ adults: Math.min(8, Math.max(1, b.adults + d)) });
    else update({ children: Math.min(6, Math.max(0, b.children + d)) });
  };
  return (
    <>
      <Head kicker="Villa stay" title="Who's coming, and how many?" sub="Ages 0–11 count as children; cribs and extra beds on request." />
      <div className="stepper-row">
        <div>
          <b>Adults</b>
          <span className="sr-note">13 and up</span>
        </div>
        <div className="stepper">
          <button type="button" className="stepper__btn" aria-label="Fewer adults" disabled={b.adults <= 1} onClick={() => setG("adults", -1)}><MinusIcon /></button>
          <span className="stepper__num">{b.adults}</span>
          <button type="button" className="stepper__btn" aria-label="More adults" disabled={b.adults >= 8} onClick={() => setG("adults", 1)}><PlusIcon /></button>
        </div>
      </div>
      <div className="stepper-row">
        <div>
          <b>Children</b>
          <span className="sr-note">0–12</span>
        </div>
        <div className="stepper">
          <button type="button" className="stepper__btn" aria-label="Fewer children" disabled={b.children <= 0} onClick={() => setG("children", -1)}><MinusIcon /></button>
          <span className="stepper__num">{b.children}</span>
          <button type="button" className="stepper__btn" aria-label="More children" disabled={b.children >= 6} onClick={() => setG("children", 1)}><PlusIcon /></button>
        </div>
      </div>
      <div className="occ-note">
        <InfoIcon />
        <span>
          {v.name} accommodates up to <b>{v.max}</b> guests.
        </span>
      </div>
      {total > v.max && (
        <div className="wk-warn show">
          That&apos;s <b>{total}</b> — {v.name} sleeps up to {v.max}. Trim the party or choose a larger villa.
        </div>
      )}
    </>
  );
}

function SlotStep({ localPeople }: { localPeople: (expId: string | null, date: string | null, slot: string | null) => number }) {
  const { b, update } = useBooking();
  const e = EXPERIENCES.find((x) => x.id === b.expId);
  if (!e || !b.date) return null;
  return (
    <>
      <Head kicker="Day experience" title={`${e.name} — pick a time`} sub={`Live capacity for ${fmtDate(b.date)}. Numbers fall as the day fills.`} />
      <div className="slot-grid" id="slotGrid">
        {e.slots.map((s) => {
          const left = remainingFor(e.id, b.date!, s, e.cap, localPeople(e.id, b.date, s));
          return (
            <button
              type="button"
              key={s}
              className={`slot-pick${b.slot === s ? " sel" : ""}`}
              disabled={left === 0}
              onClick={() => update({ slot: s, people: Math.min(b.people, Math.max(1, left)) })}
            >
              <span className="sp-t">{s}</span>
              <span className="sp-l">{left === 0 ? "Full" : `${left} of ${e.cap} left`}</span>
            </button>
          );
        })}
      </div>
      <div className="occ-note">
        <InfoIcon />
        <span>Running late? The concierge can hold a slot for twenty minutes — mention it under special requests.</span>
      </div>
    </>
  );
}

function PeopleStep({ localPeople }: { localPeople: (expId: string | null, date: string | null, slot: string | null) => number }) {
  const { b, update } = useBooking();
  const e = EXPERIENCES.find((x) => x.id === b.expId);
  if (!e || !b.date || !b.slot) return null;
  const left = remainingFor(e.id, b.date, b.slot, e.cap, localPeople(e.id, b.date, b.slot));
  return (
    <>
      <Head
        kicker="Day experience"
        title="How many are in?"
        sub={`This slot has ${left} place${left === 1 ? "" : "s"} left of ${e.cap}.`}
      />
      <div className="stepper-row">
        <div>
          <b>Guests</b>
          <span className="sr-note">
            {e.name} · {e.dur}
          </span>
        </div>
        <div className="stepper">
          <button type="button" className="stepper__btn" aria-label="Fewer guests" disabled={b.people <= 1} onClick={() => update({ people: Math.max(1, b.people - 1) })}><MinusIcon /></button>
          <span className="stepper__num">{b.people}</span>
          <button type="button" className="stepper__btn" aria-label="More guests" disabled={b.people >= left} onClick={() => update({ people: Math.min(left, b.people + 1) })}><PlusIcon /></button>
        </div>
      </div>
      <div className="occ-note">
        <InfoIcon />
        <span>
          Per-slot cap is {e.cap} guests — you&apos;re booking the remaining {left}.
        </span>
      </div>
      {b.people > left && <div className="wk-warn show">Only {left} place{left === 1 ? "" : "s"} left in this slot.</div>}
    </>
  );
}

function AddonsStep({ list }: { list: Addon[] }) {
  const { b, update } = useBooking();
  const toggle = (id: string) => update({ addons: { ...b.addons, [id]: !b.addons[id] } });
  return (
    <>
      <Head kicker="Optional" title="Make it yours" sub="Settled at checkout — skip anything you like." />
      <div className="addon-list">
        {list.map((a) => (
          <button type="button" key={a.id} className={`addon${a.pack ? " addon--pack" : ""}${b.addons[a.id] ? " sel" : ""}`} data-a={a.id} onClick={() => toggle(a.id)}>
            <span className="addon__check">
              <CheckIcon />
            </span>
            <div style={{ minWidth: 0 }}>
              <b>{a.name}</b>
              <span className="ad-note">{a.note}</span>
            </div>
            <div className="ad-price">
              {money(a.price)}
              <small>{a.unit}</small>
            </div>
            {a.pack && <span className="addon__flag">Most loved</span>}
          </button>
        ))}
      </div>
    </>
  );
}

function ReviewStep() {
  const { b } = useBooking();
  const isVilla = b.mode === "villa";
  const obj = isVilla ? UNITS.find((x) => x.id === b.villaId) : EXPERIENCES.find((x) => x.id === b.expId);
  const addonNames = (isVilla ? ADDONS_VILLA : ADDONS_EXP).filter((a) => b.addons[a.id]).map((a) => a.name);
  const when = isVilla
    ? b.checkIn && b.checkOut
      ? `${fmtDate(b.checkIn)} → ${fmtDate(b.checkOut)} · ${nightsBetween(b.checkIn, b.checkOut)} nights`
      : "Dates pending"
    : b.date
      ? `${fmtDate(b.date)}${b.slot ? " · " + b.slot : ""}`
      : "Date pending";
  const who = isVilla
    ? `${b.adults} adult${b.adults > 1 ? "s" : ""}${b.children ? ` · ${b.children} child${b.children > 1 ? "ren" : ""}` : ""}`
    : `${b.people} guest${b.people > 1 ? "s" : ""}`;

  return (
    <>
      <Head
        kicker="Public demo"
        title="Your plan is ready to preview"
        sub="Explore the dates, room options, and sample pricing."
      />
      <div className="review-box">
        <h4>The plan</h4>
        <div className="rb-row"><span>{isVilla ? "Villa" : "Experience"}</span><b>{obj?.name}</b></div>
        <div className="rb-row"><span>When</span><b>{when}</b></div>
        <div className="rb-row"><span>Who</span><b>{who}</b></div>
        <div className="rb-row"><span>Extras</span><b>{addonNames.length ? addonNames.join(", ") : "None — nicely minimal"}</b></div>
      </div>
      <p className="policy">
        <InfoIcon />
        <span>This is a preview only. No reservation is created, and no personal information is requested, sent, or saved.</span>
      </p>
    </>
  );
}

function Summary({ quote, mode, addonList }: { quote: ReturnType<typeof villaQuote> | null; mode: "villa" | "experience" | null; addonList: Addon[] }) {
  const { b } = useBooking();
  if (!mode) {
    return (
      <aside className="bm-aside" aria-label="Booking summary">
        <p className="sum-title">Your escape</p>
        <p className="sum-note">Villa stay or day experience — choose one, and this panel does the arithmetic live.</p>
      </aside>
    );
  }
  if (!quote) {
    return (
      <aside className="bm-aside" aria-label="Booking summary">
        <p className="sum-title">Your escape</p>
      </aside>
    );
  }
  const unit = mode === "villa" ? UNITS.find((x) => x.id === b.villaId) : EXPERIENCES.find((x) => x.id === b.expId);
  const stayImg = unit?.img ?? "";
  const stayWhen =
    mode === "villa"
      ? b.checkIn
        ? `${fmtDate(b.checkIn)} → ${b.checkOut ? fmtDate(b.checkOut) : "…"}`
        : "Dates pending"
      : b.date
        ? `${fmtDate(b.date)}${b.slot ? " · " + b.slot : ""}`
        : "Date pending";
  const lines: React.ReactNode[] = [];
  if (quote.nights > 0 && mode === "villa")
    lines.push(
      <div className="sum-line" key="room">
        <span>
          {quote.unitName} × {quote.nights} night{quote.nights > 1 ? "s" : ""}
        </span>
        <b>{money(quote.room)}</b>
      </div>
    );
  if (mode === "experience")
    lines.push(
      <div className="sum-line" key="exp">
        <span>
          {quote.unitName} × {quote.guests} guest{quote.guests !== 1 ? "s" : ""}
        </span>
        <b>{money(quote.room)}</b>
      </div>
    );
  addonList.forEach((a) => {
    if (!b.addons[a.id]) return;
    const amt = addonAmount(a, quote.guests, quote.nights);
    lines.push(
      <div className={`sum-line muted${a.pack ? " packline" : ""}`} key={a.id}>
        <span>{a.name}</span>
        <b>{money(amt)}</b>
      </div>
    );
  });
  if (lines.length === 0) lines.push(<div className="sum-line muted" key="none"><span>Nothing added yet</span></div>);

  return (
    <aside className="bm-aside" aria-label="Booking summary">
      <p className="sum-title">Your escape</p>
      {unit && (
        <div className="sum-stay">
          <img src={stayImg} alt="" />
          <div>
            <b>{quote.unitName}</b>
            <span>{stayWhen}</span>
            <span>
              {quote.guests} guest{quote.guests !== 1 ? "s" : ""}
              {mode === "experience" ? ` · ${EXPERIENCES.find((x) => x.id === b.expId)?.dur ?? ""}` : ""}
            </span>
          </div>
        </div>
      )}
      <div className="sum-lines">
        {lines}
        <div className="sum-line muted"><span>Subtotal</span><b>{money(quote.subtotal)}</b></div>
        <div className="sum-line muted"><span>Taxes &amp; service (12%)</span><b>{money(quote.tax)}</b></div>
      </div>
      <div className="sum-total">
        <span>Grand total</span>
        <b>{money(quote.grand)}</b>
      </div>
      <p className="sum-note">
        In USD. {mode === "villa" ? "Breakfast is priced per guest, per night —" : "Champagne pairing is per person —"} the
        arithmetic updates as you change anything.
      </p>
    </aside>
  );
}
