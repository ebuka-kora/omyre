"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IconClose, IconSearch } from "./icons";
import { ClearImage } from "./clear-image";
import { useStore } from "@/context/store";
import { products } from "@/lib/products";
import { formatNaira, matchesQuery, productPrice } from "@/lib/utils";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return products.slice(0, 6);
    return products.filter((p) => matchesQuery(p, query)).slice(0, 8);
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-plum/35"
        aria-label="Close search"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative mx-auto mt-0 max-w-2xl bg-ivory px-5 py-6 shadow-xl md:mt-16 md:px-8">
        <div className="flex items-center gap-3 border-b border-beige pb-3">
          <IconSearch className="h-5 w-5 text-gold" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Omyre Essentials"
            className="w-full bg-transparent text-lg outline-none placeholder:text-plum/35"
          />
          <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close" className="hover-gold">
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-4 divide-y divide-beige/80">
          {results.map((product) => (
            <li key={product.id}>
              <Link
                href={`/shop/${product.slug}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-4 py-3 transition hover:bg-beige/70"
              >
                <span className="relative h-16 w-14 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_32%,#fffdfb,#ead7cc)]">
                  <ClearImage
                    src={product.images[0]}
                    alt=""
                    fill
                    className="p-1"
                    sizes="56px"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg leading-snug">{product.name}</span>
                  <span className="text-xs text-plum/50">
                    {product.brand} · {product.type}
                  </span>
                </span>
                <span className="text-sm">{formatNaira(productPrice(product))}</span>
              </Link>
            </li>
          ))}
        </ul>
        {query && results.length === 0 && (
          <p className="py-10 text-center text-sm text-plum/55">
            Nothing matched “{query}”. Try candle, mist, or a scent name.
          </p>
        )}
      </div>
    </div>
  );
}
