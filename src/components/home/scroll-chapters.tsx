"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHAPTERS = [
  {
    n: "01",
    title: "Body Care",
    line: "Everyday rituals, elevated.",
    href: "/shop?category=body-care",
    image: "/brand/candles-wood.jpg",
    alt: "Vanilla Bean, Paris Café and White Tea & Sage candles",
    position: "object-[center_55%]",
  },
  {
    n: "02",
    title: "Fragrance",
    line: "Find a scent that feels like you.",
    href: "/shop?category=fragrance",
    image: "/brand/room-sprays.jpg",
    alt: "Omyre room sprays arranged in a circle",
    position: "object-center",
  },
  {
    n: "03",
    title: "Candles",
    line: "Set the mood.",
    href: "/shop?category=candles",
    image: "/brand/candles-velvet.jpg",
    alt: "In the Stars, Strawberry Pound Cake and A Thousand Wishes",
    position: "object-[center_62%]",
  },
  {
    n: "04",
    title: "Home",
    line: "Your living room has a love language.",
    href: "/shop?category=home-fragrance",
    image: "/products/candles-trio-velvet.jpg",
    alt: "Three-wick candles on olive velvet",
    position: "object-center",
  },
];

function ChapterSlide({
  chapter,
  index,
  total,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  total: number;
}) {
  return (
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] md:grid-rows-none md:grid-cols-[minmax(280px,38%)_minmax(0,1fr)]">
      <div className="relative order-2 flex flex-col justify-between bg-cream px-6 py-7 md:order-1 md:px-10 md:py-12 md:pt-28 lg:px-14">
        <p className="text-[10px] tracking-[0.38em] text-gold uppercase">The collection</p>
        <div>
          <p className="font-serif text-lg text-gold md:text-xl">{chapter.n}</p>
          <h2 className="mt-2 font-serif text-5xl leading-[0.9] md:text-7xl lg:text-8xl">
            {chapter.title}
          </h2>
          <p className="mt-5 max-w-sm font-serif text-lg italic leading-snug text-plum/55">
            {chapter.line}
          </p>
          <Link
            href={chapter.href}
            data-cursor="Shop"
            className="mt-8 inline-block cta-underline text-[11px] tracking-[0.32em] uppercase underline decoration-gold/80 underline-offset-[10px]"
          >
            Shop {chapter.title}
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-between gap-6 md:mt-0">
          <p className="text-[10px] tracking-[0.28em] text-plum/40 uppercase">
            Scroll to view
          </p>
          <p className="text-[10px] tracking-[0.28em] text-plum/40 uppercase">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="relative order-1 min-h-[48vh] overflow-hidden bg-[#2c2416] md:order-2 md:min-h-full">
        <Image
          src={chapter.image}
          alt={chapter.alt}
          fill
          quality={95}
          className={`object-cover ${chapter.position}`}
          sizes="(min-width: 768px) 62vw, 100vw"
        />
      </div>
    </div>
  );
}

export function ScrollChapters() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reduce || !root.current || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      if (slides.length < 2) return;

      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: i + 1,
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * slides.length}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.to(
          slide,
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
          i - 1,
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) {
    return (
      <section className="relative bg-cream">
        {CHAPTERS.map((chapter, i) => (
          <div key={chapter.title} className="h-screen overflow-hidden">
            <ChapterSlide chapter={chapter} index={i} total={CHAPTERS.length} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={root} className="relative bg-cream">
      <div className="relative h-screen overflow-hidden">
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.title}
            data-chapter
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: i + 1 }}
          >
            <ChapterSlide chapter={chapter} index={i} total={CHAPTERS.length} />
          </div>
        ))}
      </div>
    </section>
  );
}
