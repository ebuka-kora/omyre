"use client";

import Link from "next/link";
import { useStore } from "@/context/store";
import { formatNaira } from "@/lib/utils";
import { ProductGrid } from "@/components/product-card";
import { products } from "@/lib/products";

export default function AccountPage() {
  const { orders, wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Your Omyre</p>
      <h1 className="mt-2 font-serif text-4xl">Account</h1>
      <p className="mt-3 max-w-xl text-sm text-plum/60">
        Guest checkout is always available.{" "}
        <Link href="/track" className="underline-offset-4 hover:text-gold hover:underline">
          Track an order
        </Link>{" "}
        with your ID. Orders and wishlist on this device are saved here until full accounts launch.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-plum/55">No orders on this device yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-beige border-y border-beige">
            {orders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="text-sm tracking-wide">{order.id}</p>
                  <p className="text-xs text-plum/50">
                    {new Date(order.createdAt).toLocaleDateString("en-NG")} · {order.status}
                  </p>
                </div>
                <p className="text-sm">{formatNaira(order.subtotal)}</p>
                <Link
                  href={`/order-confirmation?id=${order.id}`}
                  className="text-xs tracking-wide underline-offset-4 hover:underline"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl">Wishlist</h2>
          <Link href="/wishlist" className="text-xs tracking-wide underline-offset-4 hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6">
          {saved.length === 0 ? (
            <p className="text-sm text-plum/55">Save pieces you love with the heart icon.</p>
          ) : (
            <ProductGrid items={saved.slice(0, 4)} />
          )}
        </div>
      </section>
    </div>
  );
}
