"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { luxuryEase } from "@/lib/motion";
import { cx } from "@/lib/utils";

type ProductVisualProps = {
  src: string;
  alt: string;
  spinning?: boolean;
  interactive?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductVisual({
  src,
  alt,
  spinning = false,
  interactive = true,
  priority = false,
  sizes = "(min-width: 1024px) 28vw, 50vw",
  className = "",
}: ProductVisualProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cx("relative overflow-hidden bg-[#f3e6dc]", className)} style={{ perspective: 1100 }}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? { rotateY: 0, y: 0, scale: 1 }
            : spinning
              ? { rotateY: 360, scale: 1.04 }
              : { rotateY: 0, y: 0, scale: 1 }
        }
        whileHover={
          reduce || !interactive || spinning
            ? undefined
            : { scale: 1.08 }
        }
        transition={
          spinning
            ? { duration: 0.72, ease: luxuryEase }
            : { duration: reduce ? 0 : 0.55, ease: luxuryEase }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
