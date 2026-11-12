"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Magnetic hover for primary CTAs — leans toward the cursor, springs back on leave.
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const fine = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduced) return <span className={className}>{children}</span>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.16);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
