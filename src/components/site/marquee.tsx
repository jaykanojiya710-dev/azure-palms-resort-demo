"use client";

import { marqueePhrases } from "@/lib/site";

// Ambient ticker of key phrases — pauses on hover, duplicated for a seamless loop.
export function Marquee() {
  const items = [...marqueePhrases, ...marqueePhrases];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((p, i) => (
          <span className="marquee__item" key={i}>
            {i % 2 === 0 ? <b>{p}</b> : p}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
