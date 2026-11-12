"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./booking-provider";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { fmtDate, money } from "@/lib/pricing";
import { CompassIcon } from "./icons";
import type { ApiBooking } from "@/lib/types";

export function BookingsDrawer() {
  const { bookings, refreshBookings, cancelBooking, open } = useBooking();
  const [openState, setOpenState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = async () => {
      setOpenState(true);
      setLoading(true);
      await refreshBookings();
      setLoading(false);
    };
    window.addEventListener("ap:open-drawer", onOpen);
    return () => window.removeEventListener("ap:open-drawer", onOpen);
  }, [refreshBookings]);

  const cancel = async (ref: string) => {
    if (confirming !== ref) {
      setConfirming(ref);
      setTimeout(() => setConfirming((c) => (c === ref ? null : c)), 4000);
      return;
    }
    setConfirming(null);
    await cancelBooking(ref);
    toast({ title: <><b>{ref}</b> cancelled. The room goes back to the sea — and to someone who needs it.</> });
  };

  return (
    <Sheet open={openState} onOpenChange={setOpenState}>
      <SheetContent side="right" data-lenis-prevent className="gap-0 px-6 pb-6 pt-7" aria-label="My bookings">
        <div className="mb-6 pr-12">
          <h3 className="font-serif text-xl text-char">My bookings</h3>
          <p className="text-[13px] text-char-3">Public demo · booking details are not stored</p>
        </div>
        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto pr-1" role="list" data-lenis-prevent>
          {loading ? (
            [0, 1, 2].map((i) => <Skeleton key={i} className="h-[148px] w-full rounded" />)
          ) : bookings.length === 0 ? (
            <div className="drawer__empty">
              <CompassIcon />
              <p>Nothing on the books yet. The bay, however, is holding a table by the tide line…</p>
              <Button
                size="sm"
                onClick={() => {
                  setOpenState(false);
                  setTimeout(() => open(), 260);
                }}
              >
                Plan your escape
              </Button>
            </div>
          ) : (
            bookings.map((bkg) => (
              <BookingCard key={bkg.ref} bkg={bkg} confirming={confirming === bkg.ref} onCancel={() => cancel(bkg.ref)} />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BookingCard({ bkg, confirming, onCancel }: { bkg: ApiBooking; confirming: boolean; onCancel: () => void }) {
  const isVilla = bkg.type === "villa";
  const guests = isVilla ? (bkg.adults ?? 0) + (bkg.children ?? 0) : (bkg.people ?? 0);
  const when = isVilla
    ? `${fmtDate(bkg.checkIn!)} → ${fmtDate(bkg.checkOut!)} · ${bkg.nights} night${(bkg.nights ?? 0) > 1 ? "s" : ""}`
    : `${fmtDate(bkg.date!)} · ${bkg.slot}`;
  return (
    <div className={`bkg-card${bkg.status === "cancelled" ? " is-cancelled" : ""}`} role="listitem">
      <div className="bkg-card__top">
        <span className="bkg-ref">{bkg.ref}</span>
        <span className={`bkg-status ${bkg.status === "cancelled" ? "cx" : "ok"}`}>
          {bkg.status === "cancelled" ? "Cancelled" : "Confirmed"}
        </span>
      </div>
      <p className="bkg-title">{bkg.title}</p>
      <p className="bkg-meta">
        {when} · {guests} guest{guests !== 1 ? "s" : ""}
      </p>
      <div className="bkg-foot">
        <span className="bkg-total">
          Total<b>{money(bkg.grand)}</b>
        </span>
        {bkg.status !== "cancelled" && (
          <button className={`bkg-cancel${confirming ? " confirming" : ""}`} onClick={onCancel}>
            {confirming ? "Sure?" : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}
