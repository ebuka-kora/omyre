import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
};

export default function ShippingPage() {
  return (
    <Policy title="Shipping & Delivery">
      <h2>Lagos</h2>
      <p>
        Fast local delivery within <strong>1–3 days</strong>.
      </p>
      <h2>Nationwide</h2>
      <p>
        Nationwide shipping available within <strong>3–7 days</strong>.
      </p>
      <h2>Packaging</h2>
      <p>All products are carefully packaged for protection during delivery.</p>
    </Policy>
  );
}
