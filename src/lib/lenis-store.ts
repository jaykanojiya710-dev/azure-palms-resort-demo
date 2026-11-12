import type Lenis from "lenis";

// Module-level Lenis handle so the loader and other effects can pause/resume
// smooth scrolling (mirrors the reference site's setLenis/getLenis store).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}
