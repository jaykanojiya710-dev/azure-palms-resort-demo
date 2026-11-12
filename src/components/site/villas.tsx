"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "./reveal";
import { useBooking } from "./booking-provider";
import { Button } from "@/components/ui/button";
import { VILLA_LIST, type Unit } from "@/lib/data";
import { money } from "@/lib/pricing";
import { UsersIcon } from "./icons";

// 3D tilt — leans toward the pointer on fine-pointer devices, springs back on leave.
function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rx = useSpring(rxRaw, { stiffness: 180, damping: 20 });
  const ry = useSpring(ryRaw, { stiffness: 180, damping: 20 });

  const ok = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      ref={ref}
      className="tilt"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (!ok() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ryRaw.set(px * 6);
        rxRaw.set(-py * 6);
      }}
      onPointerLeave={() => {
        rxRaw.set(0);
        ryRaw.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function VillaCard({ v, i }: { v: Unit; i: number }) {
  const { open } = useBooking();
  return (
    <Reveal delay={i * 0.09}>
      <Tilt>
        <article className="villa-card">
          <div className="villa-media">
            <img src={v.img} alt={`${v.name} at Azure Palms`} loading="lazy" />
          </div>
          <div className="villa-body">
            <div className="villa-top">
              <h3>{v.name}</h3>
              <p className="price">
                {money(v.price)}
                <span>/ night</span>
              </p>
            </div>
            <p className="villa-desc">{v.desc}</p>
            <ul className="chips">
              {v.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="villa-foot">
              <span className="sleeps">
                <UsersIcon />
                Sleeps {v.max}
              </span>
              <Button variant="ghost" size="sm" onClick={() => open({ mode: "villa", villaId: v.id })}>
                Reserve
              </Button>
            </div>
          </div>
        </article>
      </Tilt>
    </Reveal>
  );
}

export function Villas() {
  return (
    <section className="section section--tint" id="villas" aria-labelledby="villas-h">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">Villas &amp; Suites</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="villas-h">Rooms that end in sand</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sub">
              Four ways to sleep here, each with its own stretch of quiet. Rates include breakfast from the beach
              kitchen — and kayaks, paddleboards, and nobody asking you anything.
            </p>
          </Reveal>
        </div>
        <div className="villa-grid">
          {VILLA_LIST.map((v, i) => (
            <VillaCard v={v} i={i} key={v.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
