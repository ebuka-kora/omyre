"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { luxuryEase } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicHero() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        image.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={root} className="relative h-[calc(100svh-7.5rem)] min-h-[560px] overflow-hidden bg-cream">
      <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] md:grid-rows-none md:grid-cols-[minmax(280px,40%)_minmax(0,1fr)]">
        <div className="relative z-10 order-2 flex flex-col justify-between px-6 py-8 md:order-1 md:px-10 md:py-12 lg:px-16">
          <p className="text-[10px] tracking-[0.38em] text-gold uppercase">Omyre Essentials</p>
          <div>
            <h1 className="max-w-xl font-serif leading-[0.88] text-plum">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-5xl uppercase md:text-6xl lg:text-7xl"
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.2, ease: luxuryEase }}
                >
                  Romanticise
                </motion.span>
              </span>
              <motion.span
                className="mt-3 block font-serif text-xl italic text-rose md:text-2xl"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: luxuryEase }}
              >
                your living room.
              </motion.span>
            </h1>
            <motion.p
              className="mt-6 max-w-sm text-sm leading-relaxed text-plum/60"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: luxuryEase }}
            >
              Authentic candles, fragrance and body care — curated in Nigeria, delivered nationwide.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.15, ease: luxuryEase }}
              className="mt-8"
            >
              <Link
                href="/shop"
                data-cursor="Shop"
                className="cta-underline text-[11px] tracking-[0.32em] uppercase underline decoration-gold/80 underline-offset-[10px]"
              >
                Shop the collection
              </Link>
            </motion.div>
          </div>
          <p className="hidden text-[10px] tracking-[0.32em] text-plum/35 uppercase md:block">
            Scroll
          </p>
        </div>

        <div className="relative order-1 min-h-[46vh] overflow-hidden bg-[#3e4a35] md:order-2 md:min-h-full">
          <div ref={image} className="absolute inset-0 origin-center will-change-transform">
            <Image
              src="/brand/candles-velvet.jpg"
              alt="Omyre Essentials three-wick candles on olive velvet"
              fill
              priority
              quality={95}
              className="object-cover object-[center_58%]"
              sizes="(min-width: 768px) 60vw, 100vw"
              data-cursor="Explore"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
