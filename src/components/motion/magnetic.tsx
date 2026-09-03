"use client";

import { useMotionValue, useSpring, motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { reducedMotion } from "@/lib/motion";

export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reducedMotion() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
