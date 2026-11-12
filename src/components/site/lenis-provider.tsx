"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenis, getLenis } from "@/lib/lenis-store";

// Lenis inertial smooth scrolling, configured exactly like the reference site
// (duration 1.15s, exponential-out easing). Skipped entirely when the visitor
// prefers reduced motion; in-page anchors are routed through lenis.scrollTo.
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis; // debug/verification handle

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Native anchor links go through Lenis so easing stays consistent.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // No offset needed — Lenis honours the CSS scroll-padding-top (nav height) itself.
      getLenis()?.scrollTo(target as HTMLElement);
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
