"use client";

const PHRASES = [
  "100% Authentic",
  "Carefully sourced",
  "Official retailers",
  "Nationwide delivery",
  "Romanticise your everyday",
];

export function AuthenticityStory() {
  const loop = [...PHRASES, ...PHRASES];

  return (
    <section className="overflow-hidden border-y border-beige bg-ivory py-8 md:py-10">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {loop.map((word, i) => (
          <p
            key={`${word}-${i}`}
            className="flex items-center px-8 font-serif text-3xl text-plum/80 md:text-5xl"
          >
            {word}
            <span className="ml-8 text-gold" aria-hidden>
              ✦
            </span>
          </p>
        ))}
      </div>
    </section>
  );
}
