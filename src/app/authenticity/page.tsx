import type { Metadata } from "next";
import { Policy } from "@/components/policy";

export const metadata: Metadata = { title: "Quality & Authenticity" };

export default function AuthenticityPage() {
  return (
    <Policy title="Quality & Authenticity">
      <h2>100% Authentic</h2>
      <p>All Bath & Body Works products sold by Omyre Essentials are 100% authentic.</p>
      <h2>Official retailers</h2>
      <p>Products are sourced from official retailers.</p>
      <h2>Hygiene</h2>
      <p>Strict hygiene standards are maintained throughout product handling.</p>
    </Policy>
  );
}
