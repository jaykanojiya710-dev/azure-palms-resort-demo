// lib/pricing.js — money formatting + quote arithmetic (pure, client-safe)
import { ADDONS_VILLA, ADDONS_EXP, UNITS, EXPERIENCES, type Addon } from "./data";

export const TAX_RATE = 0.12;

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
export const toISO = (y: number, m: number, d: number) => y + "-" + pad2(m + 1) + "-" + pad2(d);
export const isoOf = (d: Date) => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
export const TODAY_ISO = isoOf(new Date());
export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
export const nightsBetween = (a: string, b: string) =>
  Math.round((new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime()) / 86400000);

export function addonAmount(a: Addon, guests: number, nights: number) {
  if (a.id === "breakfast") return a.price * guests * nights;
  if (a.id === "champagne") return a.price * guests;
  return a.price;
}

export function addonsTotal(list: Addon[], sel: Record<string, boolean>, guests: number, nights: number) {
  return list.filter((a) => sel[a.id]).reduce((t, a) => t + addonAmount(a, guests, nights), 0);
}

export interface Quote {
  room: number; addons: number; subtotal: number; tax: number; grand: number;
  guests: number; nights: number; unitName: string;
}

export function villaQuote(sel: {
  villaId: string | null; checkIn: string | null; checkOut: string | null;
  adults: number; children: number; addons: Record<string, boolean>;
}): Quote | null {
  const v = UNITS.find((x) => x.id === sel.villaId);
  if (!v) return null;
  const nights = sel.checkIn && sel.checkOut ? Math.max(0, nightsBetween(sel.checkIn, sel.checkOut)) : 0;
  const guests = sel.adults + sel.children;
  const room = v.price * nights;
  const addons = addonsTotal(ADDONS_VILLA, sel.addons, guests, nights);
  const subtotal = room + addons;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { room, addons, subtotal, tax, grand: subtotal + tax, guests, nights, unitName: v.name };
}

export function expQuote(sel: {
  expId: string | null; date: string | null; people: number; addons: Record<string, boolean>;
}): Quote | null {
  const e = EXPERIENCES.find((x) => x.id === sel.expId);
  if (!e) return null;
  const base = e.price * sel.people;
  const addons = addonsTotal(ADDONS_EXP, sel.addons, sel.people, 0);
  const subtotal = base + addons;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { room: base, addons, subtotal, tax, grand: subtotal + tax, guests: sel.people, nights: 0, unitName: e.name };
}
