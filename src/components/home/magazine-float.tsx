"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ProductCard } from "@/components/product-card";
import { getFeatured } from "@/lib/products";

export function MagazineFloat() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [36, -64]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-16, 48]);
  const y3 = useTransform(scrollYProgress, [0, 1], [48, -28]);
  const items = getFeatured().slice(0, 3);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream px-6 py-20 md:py-28">
      <p className="text-center text-[11px] tracking-[0.32em] text-gold uppercase">Featured</p>
      <h2 className="mt-3 text-center font-serif text-4xl md:text-5xl">Little luxuries, every day.</h2>
      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-2 items-end gap-8 md:grid-cols-3 md:gap-14">
        {items[0] && (
          <motion.div style={{ y: y1 }} className="md:mt-10">
            <ProductCard product={items[0]} />
          </motion.div>
        )}
        {items[1] && (
          <motion.div style={{ y: y2 }} className="mt-12 md:mt-0">
            <ProductCard product={items[1]} />
          </motion.div>
        )}
        {items[2] && (
          <motion.div style={{ y: y3 }} className="col-span-2 mx-auto w-1/2 md:col-span-1 md:mt-20 md:w-full">
            <ProductCard product={items[2]} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
