"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./reveal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY, GALLERY_CATS } from "@/lib/data";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "./icons";

export function Gallery() {
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);

  const items = cat === "All" ? GALLERY : GALLERY.filter((g) => g.c === cat);
  const current = idx !== null ? items[idx] : null;

  const go = useCallback(
    (dir: number) => setIdx((p) => (p === null ? p : (p + dir + items.length) % items.length)),
    [items.length]
  );

  // keyboard nav + scroll lock while the lightbox is open
  useEffect(() => {
    if (idx === null) return;
    document.body.classList.add("locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [idx, go]);

  return (
    <section className="section section--tint" id="gallery" aria-labelledby="gal-h">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">Gallery</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="gal-h">The bay, unretouched</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sub">Shot on property across one week in late October. Click any frame to step inside.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mb-8 flex justify-center">
          <Tabs value={cat} onValueChange={setCat}>
            <TabsList aria-label="Filter gallery by category">
              {GALLERY_CATS.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Reveal>

        <motion.div className="masonry" layout>
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.figure
                layout
                key={g.t}
                className="gitem"
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.04 }}
                data-gi={i}
                tabIndex={0}
                role="button"
                aria-label={`Open photo: ${g.t}`}
                onClick={() => setIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIdx(i);
                  }
                }}
              >
                <img src={g.src} alt={g.t} loading="lazy" />
                <figcaption>
                  <strong>{g.t}</strong>
                  <span>{g.c}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lb-pane"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            onClick={() => setIdx(null)}
          >
            <span className="lb__count">
              {(idx ?? 0) + 1} / {items.length}
            </span>
            <motion.img
              key={current.t}
              className="lb__img"
              src={current.src}
              alt={current.t}
              initial={{ scale: 0.96, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="lb__cap" onClick={(e) => e.stopPropagation()}>
              <strong>{current.t}</strong>
              <span>{current.c}</span>
            </div>
            <button
              className="lb__btn lb__btn--close"
              aria-label="Close viewer"
              onClick={(e) => {
                e.stopPropagation();
                setIdx(null);
              }}
            >
              <XIcon />
            </button>
            <button
              className="lb__btn lb__btn--prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="lb__btn lb__btn--next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRightIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
