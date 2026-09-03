"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { IconHeart } from "./icons";
import { ProductVisual } from "./product-visual";
import { useStore } from "@/context/store";
import { useExperience } from "@/context/experience";
import type { Product } from "@/lib/types";
import { getRect, reducedMotion } from "@/lib/motion";
import { editorialTitle, formatNaira, productPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();
  const { startFly, startMorph, pulseBag } = useExperience();
  const [spinning, setSpinning] = useState(false);
  const soldOut = product.stock <= 0;
  const wished = isWishlisted(product.slug);

  function openProduct(el: HTMLElement) {
    const img = el.querySelector("img");
    const rect = getRect(img);
    if (rect) startMorph(product.images[0], product.slug, rect);
    router.push(`/shop/${product.slug}`);
  }

  function add(el: HTMLElement) {
    if (soldOut || spinning) return;
    setSpinning(true);
    const img = el.querySelector("img");
    const bag = document.getElementById("omyre-bag");
    const from = getRect(img);
    const to = getRect(bag);
    const delay = reduce || reducedMotion() ? 0 : 680;
    window.setTimeout(() => {
      addToCart(product.slug, 1, { open: false });
      if (from && to) startFly(product.images[0], from, to);
      pulseBag();
      setCartOpen(true);
      setSpinning(false);
    }, delay);
  }

  return (
    <article className="group flex h-full w-full flex-col" data-product-card>
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-ivory text-plum/50 shadow-sm transition duration-200 hover:scale-110 hover:bg-plum hover:text-cream group-hover:text-plum"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <IconHeart className="h-4 w-4" filled={wished} />
        </button>

        <button
          type="button"
          data-cursor="View"
          onClick={(e) => openProduct(e.currentTarget.closest("article") as HTMLElement)}
          className="block w-full"
        >
          <ProductVisual
            src={product.images[0]}
            alt={product.name}
            spinning={spinning}
            priority={false}
            className="aspect-[3/4] bg-[#f3e6dc]"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4 text-center">
        <button
          type="button"
          onClick={(e) => openProduct(e.currentTarget.closest("article") as HTMLElement)}
          className="block w-full"
        >
          <h3 className="min-h-[2.5rem] font-serif text-lg leading-snug transition-colors duration-200 group-hover:text-gold md:min-h-[3rem] md:text-xl">
            {editorialTitle(product.name)}
          </h3>
        </button>
        <p className="mt-1 text-[11px] tracking-[0.16em] text-plum/45 uppercase">
          {product.type}
        </p>
        <p className="mt-2 text-sm tracking-wide">{formatNaira(productPrice(product))}</p>
        <div className="mt-auto pt-3">
          <button
            type="button"
            disabled={soldOut || spinning}
            data-cursor="Add"
            onClick={(e) => add(e.currentTarget.closest("article") as HTMLElement)}
            className="inline-flex items-center justify-center rounded-full border border-plum/15 bg-ivory px-4 py-2 text-[10px] tracking-[0.22em] uppercase transition duration-200 hover:scale-105 hover:border-plum hover:bg-plum hover:text-cream disabled:opacity-40"
          >
            {soldOut ? "Sold out" : spinning ? "Adding ✦" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  if (items.length === 0) {
    return (
      <p className="py-16 text-center font-serif text-plum/60">
        No products match these filters just yet.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-10 md:gap-y-16 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
