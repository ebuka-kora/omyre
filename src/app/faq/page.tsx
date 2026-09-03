import type { Metadata } from "next";
import { Policy } from "@/components/policy";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqPage() {
  return (
    <Policy title="Frequently asked questions">
      <h2>Are your products authentic?</h2>
      <p>
        Yes. Every Bath & Body Works product we offer is 100% authentic and sourced from official
        retailers. Read more on our{" "}
        <Link href="/authenticity" className="underline">
          authenticity page
        </Link>
        .
      </p>
      <h2>How long does delivery take?</h2>
      <p>Lagos: 1–3 days. Nationwide: 3–7 days.</p>
      <h2>What payment methods do you accept?</h2>
      <p>Bank transfer, mobile payments, and cash. Full payment is required before shipping.</p>
      <h2>Can I order on WhatsApp?</h2>
      <p>
        Yes. Use the Chat with us button, or tap Order via WhatsApp on any product page.
      </p>
      <h2>Do I need an account?</h2>
      <p>No. Guest checkout is fully supported.</p>
    </Policy>
  );
}
