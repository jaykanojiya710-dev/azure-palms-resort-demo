"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Magnetic } from "./magnetic";
import { Button } from "@/components/ui/button";
import { useBooking } from "./booking-provider";
import { site } from "@/lib/site";

const HERO_NAME = "Azure Palms Resort & Spa";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { open } = useBooking();
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // gentle mouse parallax on the backdrop
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const bgX = useTransform(smx, [-1, 1], [-16, 16]);
  const bgYm = useTransform(smy, [-1, 1], [-10, 10]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // deterministic floating motes — ambient life over the photo
  const motes = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const seed = (i * 137.5) % 100;
        return {
          left: (seed * 0.97) % 100,
          top: 18 + ((seed * 1.31) % 60),
          size: 2 + ((i * 7) % 4),
          dur: 9 + ((i * 13) % 8),
          delay: (i * 1.7) % 9,
          mx: ((i % 2 ? 1 : -1) * (14 + ((i * 11) % 30))),
          mo: 0.25 + ((i * 17) % 40) / 100,
        };
      }),
    []
  );

  return (
    <section
      ref={ref}
      className="hero"
      id="top"
      aria-label={`Welcome to ${site.name}`}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <motion.div style={{ x: bgX, y: bgYm }} className="h-full w-full">
          <img
            className="hero__img"
            src="/images/hero.jpg"
            alt="A private Caribbean beach at Azure Palms, palm shade and turquoise water"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
      <div className="hero__scrim" />
      <div className="hero__motes" aria-hidden="true">
        {motes.map((m, i) => (
          <span
            key={i}
            className="mote"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
              "--mx": `${m.mx}px`,
              "--mo": m.mo,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <motion.div className="hero__fade" style={{ opacity: fadeOpacity }} />

      <div className="hero__inner container eyebrow-in-wrap">
        <p className="hero__eyebrow">
          <span className="hero-name" aria-label="Azure Palms Resort and Spa">
            {mounted
              ? HERO_NAME.split("").map((ch, i) => (
                  <span key={i} aria-hidden="true" className="bl" style={{ "--i": i, "--bd": "250ms" } as React.CSSProperties}>
                    {ch}
                  </span>
                ))
              : HERO_NAME}
          </span>
          <span className="hero-loc">· Costa Verde Peninsula</span>
        </p>
        <h1 className="hero__title eyebrow-in">
          {site.tagline} <em className="gradient-text">{site.taglineAccent}</em>
        </h1>
        <p className="hero__sub eyebrow-in">{site.sub}</p>
        <div className="hero__ctas eyebrow-in">
          <Magnetic>
            <Button onClick={() => open()}>Reserve your stay</Button>
          </Magnetic>
          <Button variant="light" asChild>
            <a href="#villas">Explore the villas</a>
          </Button>
        </div>
      </div>

      <a className="hero__scroll" href="#story" aria-label="Scroll to our story">
        <span className="line" />
        Scroll
      </a>
    </section>
  );
}
