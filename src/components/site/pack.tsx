"use client";

import { Reveal } from "./reveal";
import { Parallax } from "./parallax";
import { Magnetic } from "./magnetic";
import { useBooking } from "./booking-provider";
import { Button } from "@/components/ui/button";
import { CarIcon, SparkIcon, UtensilsIcon, WavesIcon } from "./icons";

const INCLUSIONS = [
  { icon: <WavesIcon />, body: <><b>Private pool evening</b> — your pool, heaters on, drinks poured at seven</> },
  { icon: <UtensilsIcon />, body: <><b>Candlelight dinner for two</b> — at the tide line, the chef&apos;s menu</> },
  { icon: <SparkIcon />, body: <><b>90-minute spa ritual for two</b> — Casa Agua, built around the ceiba</> },
  { icon: <CarIcon />, body: <><b>Private airport pickup</b> — CVER both ways, cold towels in the car</> },
];

export function Pack() {
  const { open } = useBooking();
  return (
    <section className="section section--tint" id="pack" aria-labelledby="pack-h">
      <div className="container pack__grid">
        <Reveal>
          <div className="pack__media">
            <span className="pack__float">
              <SparkIcon /> Most loved
            </span>
            <Parallax amount={14}>
              <img src="/images/pack.jpg" alt="Dinner served under warm lights at the resort table" loading="lazy" />
            </Parallax>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">The Exclusive Pack</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="pack-h">One decision, everything arranged</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead" style={{ marginTop: 16 }}>
              The pack is how most guests arrive now: we plan the evenings, you keep the mornings. One flat price for
              the four things people ask for first — added to any villa or room during booking.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="pack__list">
              {INCLUSIONS.map((it, i) => (
                <li key={i}>
                  {it.icon}
                  <span>{it.body}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="pack__cta">
              <span className="pack__price">
                $490
                <small>per stay · a $580 value</small>
              </span>
              <Magnetic>
                <Button onClick={() => open({ mode: "villa", villaId: "beachpool", pack: true })}>
                  Reserve with the pack
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
