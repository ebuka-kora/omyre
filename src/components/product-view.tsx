"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconHeart, IconWhatsApp } from "./icons";
import { ProductCard } from "./product-card";
import { ProductVisual } from "./product-visual";
import { ClearImage } from "./clear-image";
import { QuantitySelector } from "./quantity-selector";
import { Magnetic } from "@/components/motion/magnetic";
import { useStore } from "@/context/store";
import { useExperience } from "@/context/experience";
import type { Product } from "@/lib/types";
import { getRect, luxuryEase, reducedMotion } from "@/lib/motion";
import {
  editorialTitle,
  formatNaira,
  productPrice,
  productWhatsappMessage,
  stockLabel,
  whatsappUrl,
} from "@/lib/utils";
import { getRelated } from "@/lib/products";

export function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { addToCart, buyNow, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const { morph, setMorphTo, startFly, pulseBag } = useExperience();
  const reduce = useReducedMotion();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState<"top" | "heart" | "base">("top");
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const related = useMemo(() => getRelated(product).slice(0, 4), [product]);
  const soldOut = product.stock <= 0;
  const wished = isWishlisted(product.slug);
  const hiding = morph?.slug === product.slug;
  const gallery = product.images;
  const current = gallery[active] ?? gallery[0];

  useEffect(() => {
    if (!morph || morph.slug !== product.slug) return;
    const id = requestAnimationFrame(() => {
      const rect = getRect(heroRef.current);
      if (rect) setMorphTo(rect);
    });
    return () => cancelAnimationFrame(id);
  }, [morph, product.slug, setMorphTo]);

  function spinThen(done: () => void) {
    if (spinning) return;
    setSpinning(true);
    const delay = reduce || reducedMotion() ? 0 : 680;
    window.setTimeout(() => {
      done();
      setSpinning(false);
    }, delay);
  }

  function add() {
    const bag = document.getElementById("omyre-bag");
    const from = getRect(heroRef.current);
    const to = getRect(bag);
    spinThen(() => {
      addToCart(product.slug, qty, { open: false });
      if (from && to) startFly(product.images[0], from, to);
      setAdded(true);
      pulseBag();
      setCartOpen(true);
      window.setTimeout(() => setAdded(false), 900);
    });
  }

  const noteCopy = product.notes
    ? { top: product.notes.top, heart: product.notes.heart, base: product.notes.base }
    : null;

  return (
    <div className="bg-cream">
      <div className="lg:grid lg:grid-cols-[72px_minmax(0,1fr)_min(42vw,520px)]">
        <div className="hidden lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:items-center lg:justify-center lg:gap-3">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-14 overflow-hidden rounded-xl bg-beige/40 transition duration-200 ${
                i === active
                  ? "opacity-100 ring-2 ring-gold"
                  : "opacity-40 hover:opacity-100 hover:ring-1 hover:ring-gold"
              }`}
            >
              <ClearImage src={src} alt="" fill sizes="56px" />
            </button>
          ))}
        </div>

        <div className="px-4 pt-6 lg:px-8 lg:pt-10">
          <div
            ref={heroRef}
            className={`relative ${hiding ? "opacity-0" : "opacity-100"}`}
          >
            <p className="mb-4 font-serif text-3xl text-plum lg:hidden">{editorialTitle(product.name)}</p>
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[72vh]">
              <ProductVisual
                src={current}
                alt={product.name}
                spinning={spinning}
                interactive
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full min-h-[70vw] w-full lg:min-h-[72vh]"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:hidden">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-beige/40 transition duration-200 ${
                  i === active
                    ? "opacity-100 ring-2 ring-gold"
                    : "opacity-40 hover:opacity-100 hover:ring-1 hover:ring-gold"
                }`}
              >
                <ClearImage src={src} alt="" fill sizes="56px" />
              </button>
            ))}
          </div>

          <div className="mt-6 hidden space-y-6 lg:block">
            {gallery.slice(1).map((src) => (
              <div
                key={src}
                className="relative hidden min-h-[62vh] overflow-hidden lg:block"
              >
                <ClearImage src={src} alt="" fill sizes="50vw" />
              </div>
            ))}
          </div>
        </div>

        <aside className="px-5 py-10 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:px-10 lg:py-8">
          <p className="hidden text-[11px] tracking-[0.32em] text-gold uppercase lg:block">
            {product.brand}
          </p>
          <h1 className="mt-3 hidden font-serif text-4xl leading-[0.95] lg:block">
            {editorialTitle(product.name)}
          </h1>
          <p className="mt-3 hidden font-serif italic text-plum/50 lg:block">{product.type}</p>
          <p className="mt-6 font-serif text-2xl">{formatNaira(productPrice(product))}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-plum/65">
            {product.description}
          </p>
          <p className={`mt-3 text-xs ${soldOut ? "text-rose" : "text-plum/40"}`}>
            {stockLabel(product)}
          </p>

          <div className="mt-8">
            <QuantitySelector value={qty} max={Math.max(1, product.stock)} onChange={setQty} />
          </div>

          <Magnetic className="mt-6">
            <button
              type="button"
              disabled={soldOut || spinning}
              data-cursor="Add"
              onClick={add}
              className="w-full rounded-full bg-plum py-4 text-[11px] tracking-[0.24em] text-cream uppercase transition duration-200 hover:scale-[1.02] hover:bg-[#3a1f33] disabled:opacity-40"
            >
              {spinning ? "Adding ✦" : added ? "Added to your bag ✦" : "Add to bag"}
            </button>
          </Magnetic>
          <button
            type="button"
            disabled={soldOut || spinning}
            onClick={() => {
              spinThen(() => {
                buyNow(product.slug, qty);
                router.push("/checkout");
              });
            }}
            className="cta-underline mt-3 w-full py-3 text-[11px] tracking-[0.22em] uppercase underline decoration-gold/70 underline-offset-8"
          >
            Buy now
          </button>

          <div className="mt-5 flex items-center gap-5 text-sm text-plum/60">
            <button type="button" onClick={() => toggleWishlist(product.slug)} className="inline-flex items-center gap-2 transition hover:text-gold">
              <IconHeart className="h-4 w-4" filled={wished} />
              {wished ? "Saved" : "Save"}
            </button>
            <a href={whatsappUrl(productWhatsappMessage(product))} className="inline-flex items-center gap-2 transition hover:text-gold">
              <IconWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {noteCopy && (
            <div className="mt-14 border-t border-beige/80 pt-10">
              <p className="font-serif text-2xl">Fragrance notes</p>
              <div className="mt-5 flex gap-5 font-serif text-sm">
                {(["top", "heart", "base"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setNote(key);
                      setActive(key === "top" ? 0 : key === "heart" ? 1 : Math.min(2, gallery.length - 1));
                    }}
                    className={`italic ${note === key ? "text-plum" : "text-plum/30"}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={note}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: luxuryEase }}
                  className="mt-5 font-serif text-xl leading-snug"
                >
                  {noteCopy[note]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          <div className="mt-12 space-y-6 font-serif text-sm leading-relaxed text-plum/60">
            <p>{product.details.size} · {product.details.origin}</p>
            <p>Lagos 1–3 days. Nationwide 3–7 days.</p>
            <p>100% authentic, sourced from official retailers.</p>
          </div>
        </aside>
      </div>

      <div className="sticky bottom-0 z-20 border-t border-beige bg-cream/95 p-3 backdrop-blur lg:hidden">
        <button
          type="button"
          disabled={soldOut || spinning}
          onClick={add}
          className="w-full rounded-full bg-plum py-3.5 text-[11px] tracking-[0.2em] text-cream uppercase transition duration-200 hover:bg-[#3a1f33] disabled:opacity-40"
        >
          {spinning ? "Adding ✦" : `Add to bag · ${formatNaira(productPrice(product))}`}
        </button>
      </div>

      {related.length > 0 && (
        <section className="px-5 py-16 md:px-12">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Pair it with</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">A complete ritual</h2>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
