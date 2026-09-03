"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { ClearImage } from "@/components/clear-image";
import { NIGERIAN_STATES } from "@/lib/constants";
import { products } from "@/lib/products";
import type { DeliveryOption, PaymentMethod } from "@/lib/types";
import { formatNaira, productPrice } from "@/lib/utils";

export function CheckoutView() {
  const router = useRouter();
  const { cart, cartSubtotal, placeOrder } = useStore();
  const [delivery, setDelivery] = useState<DeliveryOption>("lagos");
  const [payment, setPayment] = useState<PaymentMethod>("bank-transfer");

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { item, product } : null;
    })
    .filter(Boolean);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-plum/60">Add a little luxury before checking out.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-plum px-6 py-3 text-[11px] tracking-[0.2em] text-cream uppercase"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const order = placeOrder({
      customer: {
        fullName: String(data.get("fullName")),
        email: String(data.get("email")),
        phone: String(data.get("phone")),
        whatsapp: String(data.get("whatsapp")),
        address: String(data.get("address")),
        state: String(data.get("state")),
        city: String(data.get("city")),
        landmark: String(data.get("landmark")),
      },
      delivery,
      payment,
    });
    router.push(`/order-confirmation?id=${order.id}`);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:px-8 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Checkout</p>
        <h1 className="mt-2 font-serif text-4xl">Almost yours</h1>
        <p className="mt-3 text-sm text-plum/60">
          Guest checkout is welcome. Full payment is required before shipping.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-8">
          <fieldset>
            <legend className="font-serif text-2xl">Customer information</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field name="fullName" label="Full name" required className="sm:col-span-2" />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone number" required />
              <Field
                name="whatsapp"
                label="WhatsApp number"
                required
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-2xl">Delivery</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field name="address" label="Address" required className="sm:col-span-2" />
              <label className="block text-sm">
                <span className="mb-1.5 block text-plum/60">State</span>
                <select
                  name="state"
                  required
                  defaultValue="Lagos"
                  className="w-full border border-beige bg-ivory px-3 py-3 outline-none"
                >
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <Field name="city" label="City" required />
              <Field name="landmark" label="Landmark" className="sm:col-span-2" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DeliveryCard
                selected={delivery === "lagos"}
                onSelect={() => setDelivery("lagos")}
                title="Lagos"
                copy="1–3 business days"
              />
              <DeliveryCard
                selected={delivery === "nationwide"}
                onSelect={() => setDelivery("nationwide")}
                title="Nationwide"
                copy="3–7 business days"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-serif text-2xl">Payment</legend>
            <p className="mt-2 text-sm text-plum/60">
              Accepted methods: bank transfer, mobile payments, and cash. Full payment is
              required before shipping.
            </p>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["bank-transfer", "Bank transfer"],
                  ["mobile", "Mobile payment"],
                  ["cash", "Cash (pay in full before shipping)"],
                ] as [PaymentMethod, string][]
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${
                    payment === value ? "border-plum" : "border-beige"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === value}
                    onChange={() => setPayment(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-plum py-4 text-[11px] tracking-[0.22em] text-cream uppercase transition duration-200 hover:bg-[#3a1f33]"
          >
            Place order · {formatNaira(cartSubtotal)}
          </button>
        </form>
      </div>

      <aside className="h-fit border border-beige bg-ivory p-6">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <ul className="mt-6 space-y-4">
          {lines.map((line) => {
            if (!line) return null;
            const { item, product } = line;
            return (
              <li key={product.slug} className="flex gap-3">
                <span className="relative h-16 w-14 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_32%,#fffdfb,#ead7cc)]">
                  <ClearImage src={product.images[0]} alt="" fill className="p-1" sizes="56px" />
                </span>
                <span className="flex-1 text-sm">
                  <span className="block font-medium">{product.name}</span>
                  <span className="text-plum/50">× {item.quantity}</span>
                </span>
                <span className="text-sm">
                  {formatNaira(productPrice(product) * item.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex justify-between border-t border-beige pt-4 text-sm">
          <span>Subtotal</span>
          <span>{formatNaira(cartSubtotal)}</span>
        </div>
        <p className="mt-3 text-xs text-plum/50">
          7-day returns on unopened items. Contact us within 24 hours for damaged orders.
        </p>
      </aside>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block text-plum/60">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border border-beige bg-ivory px-3 py-3 outline-none"
      />
    </label>
  );
}

function DeliveryCard({
  selected,
  onSelect,
  title,
  copy,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  copy: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`border px-4 py-4 text-left ${selected ? "border-plum" : "border-beige"}`}
    >
      <p className="font-serif text-xl">{title}</p>
      <p className="mt-1 text-sm text-plum/55">{copy}</p>
    </button>
  );
}
