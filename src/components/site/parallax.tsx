"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Subtle scroll parallax wrapper — drifts its content as it passes the viewport.
export function Parallax({
  children,
  className,
  amount = 26,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
