"use client";

import Image from "next/image";
import { useState } from "react";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { ScrollChapters } from "@/components/home/scroll-chapters";
import { HorizontalLoved } from "@/components/home/horizontal-loved";
import { CandleStory } from "@/components/home/candle-story";
import { MagazineFloat } from "@/components/home/magazine-float";
import { ScentJournal } from "@/components/home/scent-journal";
import { AuthenticityStory } from "@/components/home/authenticity-story";
import { Reveal } from "@/components/motion/reveal";
import { useStore } from "@/context/store";
import { BRAND, INSTAGRAM_IMAGES } from "@/lib/constants";

export function HomeView() {
  return (
    <>
      <CinematicHero />
      <section className="bg-cream px-6 py-16 text-center md:py-20">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Lagos · Nationwide</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-serif text-3xl leading-[1.05] md:text-5xl">
            Little luxuries, every day.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-md font-serif text-base italic leading-relaxed text-plum/55">
            A curated house of fragrances, body care and beautiful essentials.
          </p>
        </Reveal>
      </section>

      <ScrollChapters />
      <HorizontalLoved />
      <CandleStory />
      <MagazineFloat />
      <ScentJournal />
      <AuthenticityStory />

      <section className="bg-cream px-0 py-16 md:py-20">
        <Reveal>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="Explore"
            className="block px-6 text-center font-serif text-3xl md:text-5xl"
          >
            {BRAND.instagramHandle}
          </a>
        </Reveal>
        <p className="mt-3 px-6 text-center text-[11px] tracking-[0.28em] text-gold uppercase">
          From the studio
        </p>
        <div className="mt-12 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:gap-5 md:px-8">
          {INSTAGRAM_IMAGES.map((src) => (
            <a
              key={src}
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Explore"
              className="relative h-[58vw] w-[72vw] shrink-0 overflow-hidden bg-[#2c2416] sm:h-[380px] sm:w-[280px] md:h-[460px] md:w-[340px]"
            >
              <Image
                src={src}
                alt=""
                fill
                quality={95}
                className="object-cover transition duration-500 hover:scale-110"
                sizes="340px"
              />
            </a>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const { subscribe } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-beige bg-ivory px-6 py-16 text-center md:py-20">
      <h2 className="font-serif text-3xl md:text-4xl">A little something for your inbox.</h2>
      {done ? (
        <p className="mt-8 font-serif italic">You&apos;re on the list.</p>
      ) : (
        <form
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            subscribe(email);
            setDone(true);
          }}
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 border-b border-beige bg-transparent px-0 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            data-cursor="Add"
            className="cta-underline py-3 text-[11px] tracking-[0.22em] uppercase underline decoration-gold/80 underline-offset-8"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
