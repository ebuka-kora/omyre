import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Omyre Essentials order. Guest checkout available.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
