import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = { title: "Payment & Orders" };

export default function PaymentPage() {
  return (
    <Policy title="Payment & Orders">
      <h2>Accepted payment methods</h2>
      <p>Bank transfers, cash, and mobile payments.</p>
      <h2>Payment policy</h2>
      <p>Full payment is required before shipping.</p>
      <h2>Order confirmation</h2>
      <p>Orders are confirmed via WhatsApp or email.</p>
    </Policy>
  );
}
