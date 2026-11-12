// Booking record shape shared between the API and the client.
export interface ApiBooking {
  id?: number;
  ref: string;
  type: "villa" | "experience";
  status: "confirmed" | "cancelled";
  title: string;
  roomId?: string | null;
  expId?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  nights?: number | null;
  date?: string | null;
  slot?: string | null;
  adults?: number | null;
  children?: number | null;
  people?: number | null;
  addons: string[];
  grand: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string | null;
  guestGender?: string | null;
  notes?: string | null;
  createdAt?: string;
}

export type Gender = "" | "female" | "male";

export interface Guest {
  name: string;
  email: string;
  phone: string;
  notes: string;
  gender: Gender;
}

export interface BookingState {
  mode: null | "villa" | "experience";
  step: number;
  villaId: string | null;
  expId: string | null;
  checkIn: string | null;
  checkOut: string | null;
  date: string | null;
  slot: string | null;
  adults: number;
  children: number;
  people: number;
  addons: Record<string, boolean>;
  guest: Guest;
}

export const emptyGuest: Guest = { name: "", email: "", phone: "", notes: "", gender: "" };
export const emptyBooking: BookingState = {
  mode: null, step: -1, villaId: null, expId: null,
  checkIn: null, checkOut: null, date: null, slot: null,
  adults: 2, children: 0, people: 2, addons: {},
  guest: { ...emptyGuest },
};
