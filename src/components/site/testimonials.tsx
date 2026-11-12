"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";
import { TESTIMONIALS } from "@/lib/data";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "./icons";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const setT = (i: number) => setIdx((p) => (i + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      return;
    }
    timer.current = setInterval(() => setT(idx + 1), 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [idx, paused]);

  return (
    <section className="section" id="testimonials" aria-labelledby="tst-h">
      <div className="container">
        <div className="section-head section-head--center">
          <Reveal>
            <p className="eyebrow">Guest Book</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="tst-h">What the tide brings back</h2>
          </Reveal>
        </div>
        <Reveal delay={0.14}>
          <div
            className="tst__wrap"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div
              className="tst__stage"
              aria-roledescription="carousel"
              aria-label="Guest testimonials"
              aria-live="polite"
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.n}
                  className={`t-slide${i === idx ? " on" : ""}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  aria-hidden={i !== idx}
                >
                  <span className="t-stars" aria-label={`${t.s} out of 5 stars`}>
                    {Array.from({ length: t.s }).map((_, k) => (
                      <StarIcon key={k} />
                    ))}
                  </span>
                  <blockquote className="t-quote">“{t.q}”</blockquote>
                  <span className="t-ava" aria-hidden="true">
                    {t.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <p className="t-who">
                    <b>{t.n}</b> · {t.w}
                  </p>
                </div>
              ))}
            </div>
            <div className="tst__nav">
              <button className="lb__btn" aria-label="Previous testimonial" onClick={() => setT(idx - 1)}>
                <ChevronLeftIcon />
              </button>
              <div className="t-dots" role="tablist" aria-label="Choose testimonial">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`t-dot${i === idx ? " on" : ""}`}
                    aria-label={`Testimonial ${i + 1}`}
                    aria-selected={i === idx}
                    role="tab"
                    onClick={() => setT(i)}
                  />
                ))}
              </div>
              <button className="lb__btn" aria-label="Next testimonial" onClick={() => setT(idx + 1)}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
