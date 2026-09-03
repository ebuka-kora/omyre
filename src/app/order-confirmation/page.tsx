"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IconWhatsApp } from "@/components/icons";
import { useStore } from "@/context/store";
import { formatNaira, whatsappUrl } from "@/lib/utils";

function ConfirmationInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const { orders } = useStore();
  const order = useMemo(
    () => orders.find((o) => o.id === id) ?? orders[0],
    [orders, id],
  );

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-4xl">No order to show</h1>
        <Link href="/shop" className="mt-6 inline-block text-sm underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const message = `Hello Omyre Essentials, I've placed order ${order.id}. Name: ${order.customer.fullName}. Total: ${formatNaira(order.subtotal)}. I'd like to complete payment.`;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center md:py-24">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Thank you</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
        Your order is on its way to becoming yours. ✨
      </h1>
      <p className="mt-6 text-sm tracking-[0.2em] text-plum/60">{order.id}</p>
      <ul className="mt-8 space-y-2 text-sm">
        {order.items.map((item) => (
          <li key={item.slug}>
            {item.name} × {item.quantity}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg">Total: {formatNaira(order.subtotal)}</p>
      <p className="mt-2 text-sm text-plum/60">
        Delivery: {order.delivery === "lagos" ? "Lagos — 1–3 days" : "Nationwide — 3–7 days"}
      </p>
      <p className="mt-6 text-sm leading-relaxed text-plum/65">
        Thank you for shopping with Omyre Essentials. Your order has been received. Payment
        instructions will be confirmed via WhatsApp or email. Full payment is required before
        shipping.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        <a
          href={whatsappUrl(message)}
          className="inline-flex items-center justify-center gap-2 bg-plum py-3.5 text-[11px] tracking-[0.2em] text-cream uppercase"
        >
          <IconWhatsApp className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <Link
          href="/shop"
          className="border border-plum py-3.5 text-[11px] tracking-[0.2em] uppercase"
        >
          Continue Shopping
        </Link>
        <Link href="/track" className="cta-underline text-xs text-plum/50 underline-offset-4 hover:underline">
          Track order
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationInner />
    </Suspense>
  );
}
