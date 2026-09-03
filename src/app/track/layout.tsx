import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Enter your Omyre order ID to see where your order is.",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
