"use client";

import { MotionConfig } from "framer-motion";

// Honours prefers-reduced-motion for every framer-motion animation on the site.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
