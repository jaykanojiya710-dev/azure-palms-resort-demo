"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./booking-provider";
import { navLinks, site } from "@/lib/site";
import { MenuIcon, PhoneIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const BRAND = "Azure Palms";

export function Nav() {
  const { open, confirmedCount } = useBooking();
  const [solid, setSolid] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setShrink(y > 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // sliding active indicator — observes each section as it crosses mid-viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className={`nav${solid ? " nav--solid" : ""}${shrink ? " nav--shrink" : ""}`} id="navbar">
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label={`${site.name} — home`}>
            <span aria-label={BRAND}>
              {mounted
                ? BRAND.split("").map((ch, i) => (
                    <span key={i} aria-hidden="true" className="bl" style={{ "--i": i, "--bd": "450ms" } as React.CSSProperties}>
                      {ch}
                    </span>
                  ))
                : BRAND}
            </span>
            <small>RESORT&nbsp;&amp;&nbsp;SPA</small>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} className="nav__link" href={l.href} data-active={active === l.href.slice(1)}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__cta">
            <button
              className="nav__bookings"
              aria-label="My bookings"
              onClick={() => window.dispatchEvent(new CustomEvent("ap:open-drawer"))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              <span>Bookings</span>
              <span className="nav__count" data-zero={confirmedCount ? "0" : "1"} aria-hidden="true">
                {confirmedCount}
              </span>
            </button>
            <Button onClick={() => open()} className="hidden lg:inline-flex">
              Book Now
            </Button>
            <button id="menuBtn" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="gap-0 !bg-ivory px-7 pb-10 pt-7 sm:max-w-[400px]" hideClose={false}>
          <div className="mb-9 flex items-center justify-between pr-12">
            <span className="font-serif text-base uppercase tracking-[.28em]">Azure&nbsp;Palms</span>
          </div>
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-line-2 py-3 font-serif text-[clamp(26px,7vw,32px)] transition-all"
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
                {l.label} <small className="font-sans text-[11px] tracking-[.2em] text-teal">0{i + 1}</small>
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-5 pt-8">
            <Button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="btn--wide"
            >
              Book your stay
            </Button>
            <p className="text-[13px] text-char-3">
              Reservations · {site.phone}
              <br />
              {site.email}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function NavPhoneHint() {
  return <PhoneIcon className="size-4" />;
}
