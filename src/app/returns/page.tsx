import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = { title: "Returns & Exchanges" };

export default function ReturnsPage() {
  return (
    <Policy title="Returns & Exchanges">
      <h2>Returns</h2>
      <p>We offer a 7-day return policy for unopened items.</p>
      <h2>Exchanges</h2>
      <p>Exchanges are available for damaged products.</p>
      <h2>Damaged orders</h2>
      <p>
        Contact us within 24 hours of delivery for issues relating to damaged products.
      </p>
      <p>
        Please review this policy before checkout. We want you to shop with complete confidence.
      </p>
    </Policy>
  );
}
