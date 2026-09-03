export const luxuryEase = [0.22, 1, 0.36, 1] as const;

export function getRect(el: Element | null) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

export type Rect = NonNullable<ReturnType<typeof getRect>>;

export function reducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
