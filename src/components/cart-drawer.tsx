"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { IconClose } from "./icons";
import { QuantitySelector } from "./quantity-selector";
import { Magnetic } from "@/components/motion/magnetic";
import { ClearImage } from "./clear-image";
import { useStore } from "@/context/store";
import { products } from "@/lib/products";
import { luxuryEase } from "@/lib/motion";
import { formatNaira, productPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useStore();

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { item, product } : null;
    })
    .filter(Boolean);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-plum/25 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            aria-hidden={!cartOpen}
          >
            <div className="flex items-center justify-between border-b border-beige px-6 py-5">
              <h2 className="font-serif text-2xl">Your Bag</h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag" className="hover-gold">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-serif text-2xl">Your bag is empty</p>
                  <p className="mt-2 text-sm text-plum/55">Little luxuries are waiting for you.</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 inline-block bg-plum px-6 py-3 text-[11px] tracking-[0.2em] text-cream uppercase transition duration-200 hover:scale-105 hover:bg-[#3a1f33]"
                  >
                    Shop Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line, i) => {
                    if (!line) return null;
                    const { item, product } = line;
                    return (
                      <motion.li
                        key={product.slug}
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 * i, ease: luxuryEase }}
                      >
                        <Link
                          href={`/shop/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_32%,#fffdfb,#ead7cc)]"
                        >
                          <ClearImage
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="p-1.5"
                            sizes="80px"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <p className="font-serif text-base leading-snug">{product.name}</p>
                            <p className="text-sm">
                              {formatNaira(productPrice(product) * item.quantity)}
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-plum/50">{product.type}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <QuantitySelector
                              size="sm"
                              value={item.quantity}
                              max={product.stock}
                              onChange={(q) => updateQuantity(product.slug, q)}
                            />
                            <button
                              type="button"
                              className="text-xs tracking-wide text-plum/50 underline-offset-4 transition hover:text-gold hover:underline"
                              onClick={() => removeFromCart(product.slug)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-beige px-6 py-5">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatNaira(cartSubtotal)}</span>
                </div>
                <p className="mt-2 text-xs text-plum/50">
                  Delivery is calculated at checkout. Full payment is required before shipping.
                </p>
                <Magnetic className="mt-4">
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    data-cursor="Shop"
                    className="block bg-plum py-3.5 text-center text-[11px] tracking-[0.22em] text-cream uppercase transition duration-200 hover:bg-[#3a1f33]"
                  >
                    Checkout
                  </Link>
                </Magnetic>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="cta-underline mt-3 block text-center text-xs tracking-wide text-plum/60 underline-offset-4 hover:underline"
                >
                  View bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
