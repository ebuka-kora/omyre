"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/product-card";
import { useStore } from "@/context/store";
import { products } from "@/lib/products";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <h1 className="font-serif text-4xl">Wishlist</h1>
      <p className="mt-2 text-sm text-plum/60">Pieces you&apos;re not ready to let go of.</p>
      <div className="mt-10">
        {saved.length === 0 ? (
          <div>
            <p className="text-plum/55">Your wishlist is empty.</p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-plum px-6 py-3 text-[11px] tracking-[0.2em] text-cream uppercase"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <ProductGrid items={saved} />
        )}
      </div>
    </div>
  );
}
