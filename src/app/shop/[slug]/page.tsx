import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product-view";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    image: product.images,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.salePrice ?? product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductView product={product} />
    </>
  );
}
