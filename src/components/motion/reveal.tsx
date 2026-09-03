"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { luxuryEase } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  );
}
