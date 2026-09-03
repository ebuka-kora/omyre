import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "WhatsApp and Instagram for Omyre Essentials.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
