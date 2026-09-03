"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

const STORIES = [
  {
    kicker: "Scent journal",
    title: "The art of slow mornings",
    body: "A warm shower. Fresh skin. Your favourite fragrance lingering in the air. Begin the day as if it were already a ritual.",
    href: "/shop?category=fragrance",
    cta: "Discover the ritual",
    image: "/brand/room-sprays.jpg",
    alt: "Fragrance mists arranged in a circle",
    reverse: false,
  },
  {
    kicker: "At home",
    title: "Romanticise your living room",
    body: "Your living room has a love language. Apparently, it's fragrance — a candle at dusk, a mist on the linens, a scent that welcomes you back.",
    href: "/shop?category=candles",
    cta: "Shop candles",
    image: "/brand/candles-wood.jpg",
    alt: "Vanilla Bean, Paris Café and White Tea & Sage",
    reverse: true,
  },
];

export function ScentJournal() {
  return (
    <section className="relative bg-cream">
      <div className="relative space-y-0">
        {STORIES.map((story) => (
          <article
            key={story.title}
            className={`mx-auto grid max-w-7xl items-stretch gap-0 px-0 py-0 md:grid-cols-2 ${
              story.reverse ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-24">
              <Reveal>
                <p className="text-[11px] tracking-[0.32em] text-gold uppercase">{story.kicker}</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.02] md:text-5xl">{story.title}</h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-plum/65">{story.body}</p>
                <Link
                  href={story.href}
                  data-cursor="Explore"
                  className="mt-8 inline-block cta-underline text-[11px] tracking-[0.28em] uppercase underline decoration-gold/70 underline-offset-[10px]"
                >
                  {story.cta}
                </Link>
              </Reveal>
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-[#2c2416] md:min-h-[560px]">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                quality={95}
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
