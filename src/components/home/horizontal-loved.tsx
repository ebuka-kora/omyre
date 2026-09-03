"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/product-card";
import { getBestSellers } from "@/lib/products";
import { reducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalLoved() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const products = getBestSellers().slice(0, 7);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!section.current || !track.current) return;
      const tween = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${track.current!.scrollWidth}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-cream">
      <div className="flex min-h-[auto] flex-col justify-center py-14 md:min-h-[82vh] md:pt-24 md:pb-16">
        <p className="px-6 text-center text-[11px] tracking-[0.32em] text-gold uppercase">
          Best sellers
        </p>
        <h2 className="mt-3 px-6 text-center font-serif text-4xl md:text-5xl">Loved by Omyre</h2>
        <div className="mt-10 overflow-x-auto overflow-y-visible px-4 pb-8 no-scrollbar md:px-0">
          <div ref={track} className="flex w-max items-stretch gap-8 px-6 md:gap-14 md:px-16">
            {products.map((product) => (
              <div key={product.id} className="flex w-[200px] shrink-0 sm:w-[240px] md:w-[300px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
