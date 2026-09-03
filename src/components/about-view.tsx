"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { luxuryEase } from "@/lib/motion";

const lines = [
  "Self-care is a ritual.",
  "A scent.",
  "A moment.",
  "A feeling.",
  "That's Omyre.",
];

export function AboutView() {
  return (
    <div className="bg-cream">
      <section className="mx-auto flex min-h-[72vh] max-w-4xl flex-col justify-center px-6 py-24">
        {lines.map((line, i) => (
          <motion.p
            key={line}
            className={`font-serif leading-[1.15] ${
              i === 0 || i === 4 ? "text-5xl md:text-7xl" : "mt-8 text-3xl text-plum/55 md:text-5xl"
            }`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: i === 0 ? 0.1 : 0, ease: luxuryEase }}
          >
            {line}
          </motion.p>
        ))}
      </section>

      <div className="relative h-[70vh] min-h-[420px] overflow-hidden bg-[#2c2416]">
        <Image
          src="/brand/candles-wood.jpg"
          alt="Vanilla Bean, Paris Café and White Tea & Sage candles"
          fill
          quality={95}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <article className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">The house</p>
        <p className="mt-6 text-sm leading-relaxed text-plum/70">
          At Omyre Essentials, we believe the little things matter — the fragrance in your home,
          the products you use on your body, and the moments you create for yourself. We source
          authentic Bath & Body Works products from official retailers, then package them with
          care for delivery across Nigeria.
        </p>
        <div className="mt-12">
          <Magnetic>
            <Link
              href="/shop"
              data-cursor="Shop"
              className="inline-block border border-plum px-8 py-3 text-[11px] tracking-[0.22em] uppercase transition duration-200 hover:bg-plum hover:text-cream"
            >
              Shop the collection
            </Link>
          </Magnetic>
        </div>
      </article>
    </div>
  );
}
