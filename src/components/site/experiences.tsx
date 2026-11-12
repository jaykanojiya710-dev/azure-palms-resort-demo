"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { useBooking } from "./booking-provider";
import { Button } from "@/components/ui/button";
import { EXPERIENCES } from "@/lib/data";
import { money, TODAY_ISO } from "@/lib/pricing";
import { remainingFor } from "@/lib/availability";
import { ArrowRightIcon, ClockIcon, UsersIcon } from "./icons";

export function Experiences() {
  const { open } = useBooking();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="section" id="experiences" aria-labelledby="exp-h">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">Experiences — Day Passes &amp; Slots</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="exp-h">Book the day, not the schedule</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sub">
              Small-group outings led by people from the peninsula. Slots are capped — most hold two to twelve guests —
              so reserve the ones you want when you arrive.
            </p>
          </Reveal>
        </div>
        <div className="exp-grid">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <article className="exp-card">
                <div className="exp-media">
                  <img src={e.img} alt={`${e.name} at Azure Palms`} loading="lazy" />
                </div>
                <div className="exp-body">
                  <div className="villa-top">
                    <h3 style={{ fontSize: 21 }}>{e.name}</h3>
                    <p className="price">
                      {money(e.price)}
                      <span>/ person</span>
                    </p>
                  </div>
                  <div className="exp-meta">
                    <span>
                      <ClockIcon />
                      {e.dur}
                    </span>
                    <span>
                      <UsersIcon />
                      Max {e.cap}
                    </span>
                  </div>
                  <p className="villa-desc" style={{ margin: "6px 0 14px" }}>
                    {e.desc}
                  </p>
                  {/* live capacity — rendered after mount so today's date is always the guest's local one */}
                  <div className="slots" aria-label="Today's slots and remaining capacity">
                    {mounted
                      ? e.slots.map((s) => {
                          const left = remainingFor(e.id, TODAY_ISO, s, e.cap);
                          return (
                            <span key={s} className={`slot-chip${left === 0 ? " is-full" : ""}`}>
                              {s} <em>{left === 0 ? "Full" : `${left} left`}</em>
                            </span>
                          );
                        })
                      : [0, 1].map((k) => <span key={k} className="slot-chip animate-shimmer" style={{ background: "var(--sand)" }} aria-hidden="true" />)}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => open({ mode: "experience", expId: e.id })}>
                    Book a slot <ArrowRightIcon />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
