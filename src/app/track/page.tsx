"use client";

import { FormEvent, useMemo, useState } from "react";
import { IconWhatsApp } from "@/components/icons";
import { useStore } from "@/context/store";
import type { Order, OrderStatus } from "@/lib/types";
import { formatNaira, whatsappUrl } from "@/lib/utils";

const STEPS: OrderStatus[] = [
  "Payment Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
];

function normalizeId(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function stepIndex(status: OrderStatus) {
  if (status === "Pending") return 0;
  if (status === "Cancelled" || status === "Returned") return -1;
  const i = STEPS.indexOf(status);
  return i === -1 ? 0 : i;
}

export default function TrackPage() {
  const { orders } = useStore();
  const [id, setId] = useState("");
  const [lookedUp, setLookedUp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const order = useMemo(
    () => orders.find((o) => normalizeId(o.id) === lookedUp) ?? null,
    [orders, lookedUp],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLookedUp(normalizeId(id));
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 md:px-8 md:py-24">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Orders</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Track your order</h1>
      <p className="mt-4 text-sm leading-relaxed text-plum/65">
        Enter the order ID from your confirmation — it looks like{" "}
        <span className="tracking-wide">OMY-123456</span>.
      </p>

      <form className="mt-10" onSubmit={onSubmit}>
        <label className="block text-[11px] tracking-[0.18em] text-gold uppercase">
          Order ID
          <input
            required
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setSubmitted(false);
            }}
            placeholder="OMY-000000"
            autoComplete="off"
            className="mt-2 w-full border border-beige bg-transparent px-4 py-3 text-sm tracking-[0.12em] uppercase outline-none transition focus:border-plum"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full bg-plum py-3.5 text-[11px] tracking-[0.22em] text-cream uppercase transition duration-200 hover:bg-[#3a1f33]"
        >
          Track
        </button>
      </form>

      {submitted && lookedUp && !order && (
        <div className="mt-12 border border-beige bg-ivory px-6 py-8 text-center">
          <p className="font-serif text-2xl">We couldn&apos;t find that ID</p>
          <p className="mt-3 text-sm leading-relaxed text-plum/60">
            Check the code and try again, or message us on WhatsApp with your name and order ID.
          </p>
          <a
            href={whatsappUrl(
              `Hello Omyre Essentials, I'd like to track order ${lookedUp}.`,
            )}
            className="mt-6 inline-flex items-center gap-2 text-sm transition hover:text-gold"
          >
            <IconWhatsApp className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}

      {order && <OrderStatusCard order={order} />}
    </div>
  );
}

function OrderStatusCard({ order }: { order: Order }) {
  const current = stepIndex(order.status);
  const stopped = order.status === "Cancelled" || order.status === "Returned";

  return (
    <div className="mt-12 border border-beige bg-ivory px-6 py-8">
      <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{order.id}</p>
      <h2 className="mt-2 font-serif text-3xl">{order.status}</h2>
      <p className="mt-2 text-sm text-plum/55">
        {new Date(order.createdAt).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" · "}
        {formatNaira(order.subtotal)}
      </p>

      {stopped ? (
        <p className="mt-6 text-sm text-plum/65">This order is {order.status.toLowerCase()}.</p>
      ) : (
        <ol className="mt-8 space-y-4">
          {STEPS.map((step, i) => {
            const done = i <= current;
            return (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    done ? "bg-gold" : "bg-beige"
                  }`}
                />
                <span className={done ? "text-plum" : "text-plum/35"}>{step}</span>
              </li>
            );
          })}
        </ol>
      )}

      <ul className="mt-8 space-y-2 border-t border-beige pt-6 text-sm">
        {order.items.map((item) => (
          <li key={item.slug} className="flex justify-between gap-4">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatNaira(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-plum/60">
        {order.delivery === "lagos" ? "Lagos — 1–3 days" : "Nationwide — 3–7 days"}
      </p>
      <a
        href={whatsappUrl(
          `Hello Omyre Essentials, I'm checking on order ${order.id}.`,
        )}
        className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase underline decoration-gold/80 underline-offset-8 transition hover:text-gold"
      >
        <IconWhatsApp className="h-4 w-4" />
        Ask about this order
      </a>
    </div>
  );
}
