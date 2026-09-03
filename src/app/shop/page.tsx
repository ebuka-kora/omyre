import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop authentic Bath & Body Works body care, fragrance, candles and gift sets at Omyre Essentials.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string; q?: string }>;
}) {
  const params = await searchParams;
  return <ShopView filters={params} />;
}
