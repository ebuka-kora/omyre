import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Policy title="Terms & Conditions">
      <h2>Orders</h2>
      <p>
        Placing an order constitutes an offer to purchase products subject to availability and
        confirmation. Full payment is required before shipping.
      </p>
      <h2>Authenticity</h2>
      <p>
        We sell authentic Bath & Body Works products sourced from official retailers.
      </p>
      <h2>Delivery</h2>
      <p>Lagos deliveries typically arrive in 1–3 days; nationwide in 3–7 days.</p>
      <h2>Returns</h2>
      <p>
        Unopened items may be returned within 7 days. Damaged items should be reported within 24
        hours of delivery.
      </p>
    </Policy>
  );
}
