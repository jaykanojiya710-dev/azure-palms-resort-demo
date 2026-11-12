// lib/availability.js — deterministic simulated availability (client-safe, pure)
const hash = (s: string) => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

export function eachNight(a: string, b: string, fn: (iso: string) => void) {
  const d = new Date(a + "T12:00:00");
  const end = new Date(b + "T12:00:00");
  while (d < end) {
    const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    fn(iso);
    d.setDate(d.getDate() + 1);
  }
}

/** nights already claimed by bookings kept on this device */
export function localVillaNights(
  villaId: string,
  kept: { checkIn?: string | null; checkOut?: string | null }[]
) {
  const set = new Set<string>();
  kept.forEach((b) => {
    if (b.checkIn && b.checkOut) eachNight(b.checkIn, b.checkOut, (d) => set.add(d));
  });
  void villaId;
  return set;
}

export function nightTaken(
  villaId: string,
  iso: string,
  todayIso: string,
  kept: { checkIn?: string | null; checkOut?: string | null }[] = []
) {
  if (iso < todayIso) return true;
  if (localVillaNights(villaId, kept).has(iso)) return true;
  const wd = new Date(iso + "T12:00:00").getDay();
  const threshold = wd === 5 || wd === 6 ? 38 : 24; // weekends busier
  return hash("azure|" + villaId + "|" + iso) % 100 < threshold;
}

export function rangeFullyAvailable(
  villaId: string,
  a: string,
  b: string,
  todayIso: string,
  kept?: { checkIn?: string | null; checkOut?: string | null }[]
) {
  let ok = true;
  eachNight(a, b, (d) => {
    if (nightTaken(villaId, d, todayIso, kept)) ok = false;
  });
  return ok;
}

export function expDateTaken(expId: string, iso: string, todayIso: string) {
  if (iso < todayIso) return true;
  return hash("expdate|" + expId + "|" + iso) % 100 < 16; // boat / room maintenance days
}

export function remainingFor(expId: string, dateISO: string, slot: string, cap: number, local: number = 0) {
  const det = hash("slots|" + expId + "|" + dateISO + "|" + slot) % Math.max(2, cap - 1);
  return Math.max(0, cap - det - local);
}
