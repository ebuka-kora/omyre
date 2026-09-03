"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { luxuryEase } from "@/lib/motion";

const ITEMS = [
  {
    title: "Body Care",
    href: "/shop?category=body-care",
    image: "/brand/candles-wood.jpg",
  },
  {
    title: "Fragrance",
    href: "/shop?category=fragrance",
    image: "/brand/room-sprays.jpg",
  },
  {
    title: "Candles",
    href: "/shop?category=candles",
    image: "/brand/candles-velvet.jpg",
  },
  {
    title: "Home",
    href: "/shop?category=home-fragrance",
    image: "/brand/candles-wood.jpg",
  },
];

export function EditorialCategories() {
  const [active, setActive] = useState(2);

  return (
    <section className="relative min-h-[52vh] overflow-hidden bg-plum md:min-h-[62vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={ITEMS[active].title}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: luxuryEase }}
        >
          <Image
            src={ITEMS[active].image}
            alt=""
            fill
            quality={95}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-plum/50" />
        </motion.div>
      </AnimatePresence>
      <nav className="relative z-10 flex min-h-[52vh] flex-col items-center justify-center gap-1 py-14 md:min-h-[62vh] md:gap-2">
        {ITEMS.map((item, i) => (
          <Link
            key={item.title}
            href={item.href}
            data-cursor="Explore"
            onMouseEnter={() => setActive(i)}
            className="overflow-hidden"
          >
            <motion.span
              className={`block font-serif text-4xl text-cream md:text-6xl transition ${
                active === i ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
              whileHover={{ x: 14, color: "#B68A4A" }}
              transition={{ duration: 0.6, ease: luxuryEase }}
            >
              {item.title}
            </motion.span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
