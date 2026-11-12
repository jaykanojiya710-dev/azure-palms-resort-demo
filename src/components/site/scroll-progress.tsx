"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin teal→gold progress bar pinned under the very top edge.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div style={{ scaleX }} />
    </div>
  );
}
