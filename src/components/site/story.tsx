"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";

function CountUp({ end, decimals = 0, suffix = "" }: { end: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 2.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, end]);

  const text =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString("en-US");
  return (
    <span ref={ref} className="stat__num">
      {text}
      {suffix}
    </span>
  );
}

const STATS = [
  { end: 1.2, decimals: 1, label: "km of private shoreline" },
  { end: 24, label: "villas — never more" },
  { end: 98, suffix: "%", label: "average guest rating" },
  { end: 1998, label: "kept in the family since" },
];

export function Story() {
  return (
    <section className="section" id="story" aria-labelledby="story-h">
      <div className="container">
        <div className="story__grid">
          <Parallax className="story__media" amount={18}>
            <img className="story__img" src="/images/story-1.jpg" alt="Villas standing over calm water at the bay" loading="lazy" />
            <img className="story__img--sm" src="/images/story-2.jpg" alt="Aerial view of the cove and the reef at low tide" loading="lazy" />
          </Parallax>
          <div className="story__body">
            <Reveal>
              <p className="eyebrow">Our Story</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="story-h">A quiet mile, kept quiet on purpose</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="has-drop">
                The Alarcón family found this bay in 1997 — a fisherman&apos;s cove on the Costa Verde Peninsula, two hours
                from the nearest town, reachable at the time only at low tide. They kept the coconut palms. They kept the
                fishermen. In 1998 Azure Palms opened with six villas and a single rule: nothing here should ever be
                louder than the sea.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Today there are twenty-four villas along 1.2 kilometres of private shoreline, a kitchen that changes with
                the catch, and a spa built around the ceiba tree that stood here first. We have never added a third
                floor, a buffet, or a neon sign. The bay does the entertaining.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="story__sign">
                Elena &amp; Tomás Alarcón
                <small>Founders — and most weeks, still at the bar at six</small>
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.12} className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
