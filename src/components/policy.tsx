import type { ReactNode } from "react";

export function Policy({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Omyre Essentials</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">{title}</h1>
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-plum/75 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-plum [&_strong]:font-medium [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
