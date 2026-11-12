"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

// Custom cursor, ported from the reference site: a fast 6px dot plus a slow
// 38px trailing ring that blooms 1.7x over links and buttons. The native
// cursor stays visible underneath (the reference does the same) — the pair
// is pure accent. Desktop fine pointers only; disabled for reduced motion.
export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  // Dot snaps close to the pointer (stiff spring); ring lags behind (soft spring).
  const dotX = useSpring(-100, { stiffness: 550, damping: 45, mass: 0.5 });
  const dotY = useSpring(-100, { stiffness: 550, damping: 45, mass: 0.5 });
  const ringX = useSpring(-100, { stiffness: 170, damping: 22, mass: 0.7 });
  const ringY = useSpring(-100, { stiffness: 170, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || reduced) return;
    setMounted(true);

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      setHovered(!!(e.target as Element | null)?.closest?.("a, button, [data-cursor='hover']"));
    };
    const out = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", out);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", out);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [dotX, dotY, ringX, ringY, visible, reduced]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] -ml-[19px] -mt-[19px] h-[38px] w-[38px] rounded-full border border-white/50 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? (hovered ? 0.9 : 0.55) : 0, scale: hovered ? 1.7 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}
