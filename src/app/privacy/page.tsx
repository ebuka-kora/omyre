import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Policy title="Privacy Policy">
      <h2>Customer confidentiality</h2>
      <p>Customer information is kept confidential.</p>
      <h2>Data usage</h2>
      <p>Contact details are used only for order processing.</p>
      <h2>Third parties</h2>
      <p>Customer personal information is not shared with third parties.</p>
      <p>
        This page reflects the business&apos;s current principles. A fuller legally reviewed
        policy should be added once payment providers and hosting tools are confirmed for
        production.
      </p>
    </Policy>
  );
}
