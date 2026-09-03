"use client";

import Link from "next/link";
import { QuantitySelector } from "@/components/quantity-selector";
import { ClearImage } from "@/components/clear-image";
import { useStore } from "@/context/store";
import { products } from "@/lib/products";
import { formatNaira, productPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, cartSubtotal, updateQuantity, removeFromCart } = useStore();
  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { item, product } : null;
    })
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl">Your Bag</h1>
      {lines.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-plum/60">Nothing here yet.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-plum px-6 py-3 text-[11px] tracking-[0.2em] text-cream uppercase"
          >
            Shop Collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-beige border-y border-beige">
            {lines.map((line) => {
              if (!line) return null;
              const { item, product } = line;
              return (
                <li key={product.slug} className="flex gap-4 py-6">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_32%,#fffdfb,#ead7cc)]"
                  >
                    <ClearImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="p-2"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <Link href={`/shop/${product.slug}`} className="font-serif text-xl">
                        {product.name}
                      </Link>
                      <p className="text-sm text-plum/50">{product.type}</p>
                      <p className="mt-1 text-sm">{formatNaira(productPrice(product))}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-4 sm:mt-0">
                      <QuantitySelector
                        size="sm"
                        value={item.quantity}
                        max={product.stock}
                        onChange={(q) => updateQuantity(product.slug, q)}
                      />
                      <button
                        type="button"
                        className="text-xs text-plum/50 underline-offset-4 hover:underline"
                        onClick={() => removeFromCart(product.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-lg">
              Subtotal <span className="ml-2 font-medium">{formatNaira(cartSubtotal)}</span>
            </p>
            <Link
              href="/checkout"
              className="bg-plum px-8 py-3.5 text-[11px] tracking-[0.22em] text-cream uppercase"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
