"use client";

// Brand glyphs shared across sections (stroke icons, currentColor).
type P = { className?: string };
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const CheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
export const UsersIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const ClockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
export const ArrowRightIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
export const ArrowLeftIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
export const ChevronLeftIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><polyline points="15 18 9 12 15 6" /></svg>
);
export const ChevronRightIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><polyline points="9 18 15 12 9 6" /></svg>
);
export const MinusIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
export const PlusIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
export const InfoIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);
export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" strokeWidth={1} strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
export const SparkIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>
);
export const CompassIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
);
export const WavesIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>
);
export const UtensilsIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
);
export const CarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
);
export const MapPinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="15" y2="17" /></svg>
);
export const XIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={1.6}><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
);
export const InstagramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
export const YoutubeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
);
export const LoaderIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
