"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/motion/magnetic";
import { reducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CandleStory() {
  const section = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!section.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(image.current, { clipPath: "circle(12% at 50% 50%)" });
      gsap.set(copy.current, { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      tl.to(image.current, {
        clipPath: "circle(80% at 50% 50%)",
        ease: "none",
        duration: 1,
      }).to(
        copy.current,
        { opacity: 1, y: 0, ease: "none", duration: 0.35 },
        0.55,
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-[#0e2a32]">
      <div className="relative flex h-screen items-center justify-center overflow-hidden">
        <div ref={image} className="absolute inset-0">
          <Image
            src="/brand/room-sprays.jpg"
            alt="Room sprays arranged in a starburst"
            fill
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div
          ref={copy}
          className="relative z-10 mx-6 max-w-lg bg-cream/92 px-8 py-10 text-center backdrop-blur-[2px] md:px-12 md:py-14"
        >
          <p className="text-[10px] tracking-[0.38em] text-gold uppercase">Home fragrance</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.95] md:text-5xl">
            A scent that welcomes you back.
          </h2>
          <p className="mt-5 font-serif text-base italic text-plum/55">
            Mist the room. Light the candle. Make the ordinary feel like a ritual.
          </p>
          <div className="mt-8">
            <Magnetic>
              <Link
                href="/shop?category=home-fragrance"
                data-cursor="Shop"
                className="inline-block border border-plum/30 px-8 py-3 text-[11px] tracking-[0.28em] uppercase transition duration-200 hover:bg-plum hover:text-cream"
              >
                Shop home
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
