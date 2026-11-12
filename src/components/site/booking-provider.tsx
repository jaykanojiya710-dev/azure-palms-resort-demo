"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { emptyBooking, type ApiBooking, type BookingState, type Gender } from "@/lib/types";

interface OpenOpts {
  mode?: "villa" | "experience";
  villaId?: string;
  expId?: string;
  pack?: boolean;
}

interface BookingCtx {
  b: BookingState;
  isOpen: boolean;
  update: (patch: Partial<BookingState>) => void;
  open: (opts?: OpenOpts) => void;
  close: () => void;
  back: () => void;
  next: () => void;
  bookings: ApiBooking[];
  refreshBookings: () => Promise<void>;
  confirmedCount: number;
  cancelBooking: (ref: string) => Promise<void>;
}

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [b, setB] = useState<BookingState>(emptyBooking);
  const [openState, setOpenState] = useState(false);
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const openCount = useRef(0);

  const update = useCallback((patch: Partial<BookingState>) => setB((prev) => ({ ...prev, ...patch })), []);

  const refreshBookings = useCallback(async () => setBookings([]), []);

  const open = useCallback(
    (opts: OpenOpts = {}) => {
      const base: BookingState = { ...emptyBooking, guest: { ...emptyBooking.guest } };
      if (opts.mode === "villa") {
        base.mode = "villa";
        base.villaId = opts.villaId ?? null;
        base.step = opts.villaId ? 1 : 0;
      } else if (opts.mode === "experience") {
        base.mode = "experience";
        base.expId = opts.expId ?? null;
        base.step = opts.expId ? 1 : 0;
      }
      if (opts.pack) base.addons = { pack: true };
      setB(base);
      setOpenState(true);
    },
    []
  );

  const close = useCallback(() => {
    setOpenState(false);
    setB({ ...emptyBooking, guest: { ...emptyBooking.guest } });
  }, []);
  const back = useCallback(() => setB((p) => ({ ...p, step: p.step > 0 ? p.step - 1 : -1 })), []);
  const next = useCallback(() => setB((p) => ({ ...p, step: p.step + 1 })), []);

  // esc + scroll lock while the wizard is open
  useEffect(() => {
    if (!openState) {
      if (openCount.current === 0) document.body.classList.remove("locked");
      return;
    }
    openCount.current++;
    document.body.classList.add("locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenState(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      openCount.current--;
      if (openCount.current === 0) document.body.classList.remove("locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [openState]);

  // keep the navbar badge warm
  useEffect(() => {
    void refreshBookings();
  }, [refreshBookings]);

  const cancelBooking = useCallback(async () => setBookings([]), []);

  const confirmedCount = useMemo(() => bookings.filter((x) => x.status !== "cancelled").length, [bookings]);

  const value = useMemo<BookingCtx>(
    () => ({ b, isOpen: openState, update, open, close, back, next, bookings, refreshBookings, confirmedCount, cancelBooking }),
    [b, openState, update, open, close, back, next, bookings, refreshBookings, confirmedCount, cancelBooking]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export type { Gender };
