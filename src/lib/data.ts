// lib/data.js — content inventory (villas, rooms, experiences, add-ons, gallery, quotes)
export interface Unit {
  id: string;
  kind: "villa" | "room";
  name: string;
  price: number;
  max: number;
  img: string;
  desc: string;
  amenities: string[];
}

export interface Experience {
  id: string;
  name: string;
  price: number;
  dur: string;
  cap: number;
  slots: string[];
  img: string;
  desc: string;
}

export interface Addon {
  id: string;
  name: string;
  note: string;
  price: number;
  unit: string;
  pack?: boolean;
}

export interface GalleryItem {
  src: string;
  w: number;
  h: number;
  t: string;
  c: string;
}

export interface Testimonial {
  q: string;
  n: string;
  w: string;
  s: number;
}

export const UNITS: Unit[] = [
  { id: "garden", kind: "villa", name: "Garden Villa", price: 290, max: 2, img: "/images/villa-garden.jpg",
    desc: "A thatched-roof hideaway set in the frangipani garden, four slow minutes from the sand.",
    amenities: ["Plunge pool", "Outdoor rain shower", "King bed", "Breakfast terrace"] },
  { id: "ocean", kind: "villa", name: "Ocean View Suite", price: 460, max: 3, img: "/images/villa-ocean.jpg",
    desc: "Full-height glass frames the bay from a hand-plastered suite above the club house.",
    amenities: ["Ocean view", "Soaking tub", "Reading nook", "Daily turndown"] },
  { id: "beachpool", kind: "villa", name: "Beach Pool Villa", price: 690, max: 4, img: "/images/villa-beachpool.jpg",
    desc: "Barefoot steps from the shoreline, with a 12-metre lap pool and a shaded palapa daybed.",
    amenities: ["Private lap pool", "Direct beach access", "Outdoor bath", "Butler service"] },
  { id: "penthouse", kind: "villa", name: "Sunset Penthouse", price: 980, max: 4, img: "/images/villa-penthouse.jpg",
    desc: "The whole top floor of the great house: a 180° west terrace, telescope, record player.",
    amenities: ["Wraparound terrace", "Outdoor kitchen", "Telescope", "Private chef option"] },
  { id: "deluxe", kind: "room", name: "Deluxe Room", price: 240, max: 2, img: "/images/room-deluxe.jpg",
    desc: "Our classic room, rebuilt in 2024: lime-washed walls, a king bed under fan shadows, and a patio onto the frangipani walk.",
    amenities: ["Garden patio", "Rain shower", "King bed", "Smart lighting"] },
  { id: "premium", kind: "room", name: "Premium Villa", price: 520, max: 4, img: "/images/room-premium.jpg",
    desc: "A one-bedroom villa behind the dunes — private plunge pool, outdoor shower, and a hammock that catches the afternoon breeze.",
    amenities: ["Plunge pool", "Garden hammock", "Separate lounge", "Nespresso bar"] },
  { id: "beachsuite", kind: "room", name: "Beachfront Suite", price: 640, max: 3, img: "/images/room-beachsuite.jpg",
    desc: "Wake to the water: a first-line suite with a private balcony over the sand and a tub deep enough to forget your phone.",
    amenities: ["Front-row dune", "Soaking tub", "Sunrise balcony", "Twin daybed"] },
];

export const VILLA_LIST = UNITS.filter((v) => v.kind === "villa");
export const ROOM_LIST = UNITS.filter((v) => v.kind === "room");

export const EXPERIENCES: Experience[] = [
  { id: "cruise", name: "Sunset Cruise", price: 120, dur: "2h 30m", cap: 6, slots: ["15:30", "17:00"], img: "/images/exp-cruise.jpg",
    desc: "A wooden ketch, six guests, one guitar, and Captain Rivas — who has named every cormorant on the point." },
  { id: "spa", name: "Spa Ritual", price: 160, dur: "2h", cap: 2, slots: ["09:00", "11:00", "14:00", "16:00"], img: "/images/exp-spa.jpg",
    desc: "Casa Agua, built around the ceiba tree: warm stone, sea clay, and two hours nobody is allowed to interrupt." },
  { id: "dining", name: "Beach Dining", price: 95, dur: "Evening · 3h", cap: 10, slots: ["18:00", "20:00"], img: "/images/exp-dining.jpg",
    desc: "One long table at the tide line, five courses from the day's catch, your feet in the sand by the second." },
  { id: "snorkel", name: "Snorkeling Safari", price: 85, dur: "3h", cap: 8, slots: ["09:00", "12:00", "15:00"], img: "/images/exp-snorkel.jpg",
    desc: "Mateo leads the panga to three reef stops — turtles before ten, the wall at noon, iced jamaica on the way home." },
  { id: "yoga", name: "Sunrise Yoga", price: 45, dur: "1h", cap: 12, slots: ["06:00", "06:45"], img: "/images/exp-yoga.jpg",
    desc: "On the east deck while the water goes pink. Beginners welcome; the only rule is silence until coffee." },
];

export const ADDONS_VILLA: Addon[] = [
  { id: "pack", name: "The Exclusive Pack", note: "Private pool evening · candlelight dinner for two · 90-min spa ritual for two · private airport pickup", price: 490, unit: "flat, per stay", pack: true },
  { id: "breakfast", name: "Daily breakfast", note: "At the beach kitchen, or laid on your terrace", price: 45, unit: "per guest / night" },
  { id: "transfer", name: "Airport transfer", note: "Private car, CVER ↔ the bay, both ways", price: 120, unit: "flat, round trip" },
  { id: "spacredit", name: "Spa credit", note: "Applied to any ritual at Casa Agua", price: 150, unit: "flat credit" },
];

export const ADDONS_EXP: Addon[] = [
  { id: "pack", name: "Exclusive day pack", note: "Front-row cabana · champagne pairing · photo package, bundled", price: 180, unit: "flat", pack: true },
  { id: "champagne", name: "Champagne pairing", note: "A chilled half-bottle for the moment it deserves", price: 35, unit: "per person" },
  { id: "photo", name: "Photo package", note: "A photographer trails your outing — 30 edited frames", price: 85, unit: "flat" },
  { id: "cabana", name: "Beach cabana", note: "Front row, towels and cold towels waiting", price: 40, unit: "flat" },
];

export const GALLERY: GalleryItem[] = [
  { src: "/images/gal-1.jpg", w: 900, h: 1150, t: "The great house", c: "Villas" },
  { src: "/images/gal-2.jpg", w: 900, h: 640, t: "Casa Mar from the water", c: "Villas" },
  { src: "/images/gal-3.jpg", w: 900, h: 700, t: "Catch of the morning", c: "The Table" },
  { src: "/images/gal-4.jpg", w: 900, h: 1180, t: "Learning the break", c: "The Bay" },
  { src: "/images/gal-5.jpg", w: 900, h: 620, t: "Six-forty at the east jetty", c: "The Bay" },
  { src: "/images/gal-6.jpg", w: 900, h: 1050, t: "Room six, unmade on purpose", c: "Villas" },
  { src: "/images/gal-7.jpg", w: 900, h: 660, t: "Where the reef starts", c: "The Bay" },
  { src: "/images/gal-8.jpg", w: 900, h: 980, t: "Sunday at the infinity edge", c: "Rituals" },
  { src: "/images/gal-9.jpg", w: 900, h: 720, t: "The boats rest at noon", c: "The Bay" },
];
export const GALLERY_CATS = ["All", "Villas", "The Table", "The Bay", "Rituals"];

export const TESTIMONIALS: Testimonial[] = [
  { q: "We came for five nights and stayed for nine. Nobody blinked — the villa simply kept being ours, and the chef kept sending out whatever the boats brought in.", n: "Isabelle & Marc Duval", w: "Paris", s: 5 },
  { q: "The sunset cruise is worth the whole flight. Six guests, one guitar, and a captain who has named every cormorant on the point.", n: "The Okafor family", w: "Lagos", s: 5 },
  { q: "I have stayed at every “quiet” resort from Tulum to Trancoso. This is the only one where I never once heard a pool speaker.", n: "Hannah Lindqvist", w: "Copenhagen", s: 5 },
  { q: "Our children learned to free-dive with Mateo; my husband learned to stop checking his phone. Neither has recovered.", n: "Camila Reyes-de León", w: "Mexico City", s: 5 },
  { q: "Book the penthouse for at least one night of your stay. The telescope, the terrace, the last light — we rearranged our flights around it.", n: "James & Priya Whitfield", w: "London", s: 5 },
];

export const GOOD_TO_KNOW = [
  { q: "Getting here", a: "A private transfer from Costa Verde International (CVER) takes 22 minutes — the pack includes it both ways. By boat from Punta Sur it is 40 minutes, and honestly the better arrival." },
  { q: "With children", a: "Children are guests, not a category. Cribs and extra beds are on request, the children's table at dinner has its own menu, and Mateo runs the reef school every morning but Sunday." },
  { q: "Cancellation", a: "Free cancellation up to 7 days ahead. After that the tide keeps 25% as a promise. Nothing is charged at booking — we hold your dates and confirm by email." },
  { q: "The tide letter", a: "One letter a month: tides, table dates, and the quiet weeks nobody else knows about. No noise, ever — unsubscribe with one tap." },
];
