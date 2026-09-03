"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductGrid } from "./product-card";
import { IconClose } from "./icons";
import { products, brands, types, fragranceNames } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import type { SortKey } from "@/lib/types";
import { matchesQuery } from "@/lib/utils";

type Filters = {
  category?: string;
  collection?: string;
  q?: string;
};

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "best-selling", label: "Best Selling" },
];

export function ShopView({ filters }: { filters: Filters }) {
  const router = useRouter();
  const [sort, setSort] = useState<SortKey>("featured");
  const [category, setCategory] = useState(filters.category ?? "");
  const [brand, setBrand] = useState("");
  const [availability, setAvailability] = useState("");
  const [fragrance, setFragrance] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState(65000);
  const [drawer, setDrawer] = useState(false);

  const items = useMemo(() => {
    let list = [...products];
    const cat = category || filters.category;
    if (cat) list = list.filter((p) => p.category === cat);
    const collection = filters.collection;
    if (collection === "new") list = list.filter((p) => p.newArrival);
    if (collection === "bestsellers") list = list.filter((p) => p.bestSeller);
    if (filters.q) list = list.filter((p) => matchesQuery(p, filters.q!));
    if (brand) list = list.filter((p) => p.brand === brand);
    if (fragrance) list = list.filter((p) => p.fragranceName === fragrance);
    if (type) list = list.filter((p) => p.type === type);
    if (availability === "in-stock") list = list.filter((p) => p.stock > 0);
    if (availability === "out") list = list.filter((p) => p.stock <= 0);
    list = list.filter((p) => (p.salePrice ?? p.price) <= maxPrice);

    list.sort((a, b) => {
      if (sort === "price-asc") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sort === "price-desc") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sort === "newest") return Number(b.newArrival) - Number(a.newArrival);
      if (sort === "best-selling") return Number(b.bestSeller) - Number(a.bestSeller);
      return Number(b.featured) - Number(a.featured);
    });
    return list;
  }, [sort, category, brand, availability, fragrance, type, maxPrice, filters]);

  const categoryKey = category || filters.category || "";
  const heading =
    filters.collection === "new"
      ? "New Arrivals"
      : filters.collection === "bestsellers"
        ? "Best Sellers"
        : categoryKey === "home-fragrance"
          ? "Home Fragrance"
          : CATEGORIES.find((c) => c.slug === categoryKey)?.name ?? "Shop Omyre";

  const filterForm = (
    <div className="space-y-6 text-sm">
      <FilterSelect
        label="Category"
        value={category || filters.category || ""}
        onChange={(v) => {
          setCategory(v);
          const params = new URLSearchParams();
          if (v) params.set("category", v);
          router.push(v ? `/shop?${params}` : "/shop");
        }}
        options={[
          { value: "", label: "All" },
          ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name })),
        ]}
      />
      <FilterSelect
        label="Brand"
        value={brand}
        onChange={setBrand}
        options={[{ value: "", label: "All" }, ...brands.map((b) => ({ value: b, label: b }))]}
      />
      <FilterSelect
        label="Availability"
        value={availability}
        onChange={setAvailability}
        options={[
          { value: "", label: "All" },
          { value: "in-stock", label: "In stock" },
          { value: "out", label: "Sold out" },
        ]}
      />
      <FilterSelect
        label="Fragrance"
        value={fragrance}
        onChange={setFragrance}
        options={[
          { value: "", label: "All" },
          ...fragranceNames.map((f) => ({ value: f, label: f })),
        ]}
      />
      <FilterSelect
        label="Product type"
        value={type}
        onChange={setType}
        options={[{ value: "", label: "All" }, ...types.map((t) => ({ value: t, label: t }))]}
      />
      <div>
        <p className="mb-2 text-[11px] tracking-[0.18em] text-gold uppercase">Price</p>
        <input
          type="range"
          min={4000}
          max={65000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-plum"
        />
        <p className="mt-1 text-xs text-plum/55">Up to ₦{maxPrice.toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-cream">
      <div className="relative h-[36vh] min-h-[220px] overflow-hidden bg-[#2c2416] md:h-[42vh]">
        <Image
          src={
            categoryKey === "fragrance" || categoryKey === "home-fragrance"
              ? "/brand/room-sprays.jpg"
              : categoryKey === "candles"
                ? "/brand/candles-velvet.jpg"
                : "/brand/candles-wood.jpg"
          }
          alt=""
          fill
          priority
          quality={95}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-xl">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Catalogue</p>
        <h1 className="mt-2 font-serif text-4xl leading-[0.95] md:text-5xl">{heading}</h1>
        <p className="mt-4 max-w-md font-serif text-base italic text-plum/55">
          Little luxuries for your body, home and everyday rituals.
        </p>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => {
            setCategory("");
            router.push("/shop");
          }}
          className={`shrink-0 border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition duration-200 ${
            !categoryKey ? "border-plum bg-plum text-cream" : "border-beige hover:border-plum hover:bg-beige"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => {
              setCategory(c.slug);
              router.push(`/shop?category=${c.slug}`);
            }}
            className={`shrink-0 border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition duration-200 ${
              categoryKey === c.slug ? "border-plum bg-plum text-cream" : "border-beige hover:border-plum hover:bg-beige"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-y border-beige py-4">
        <button
          type="button"
          className="text-xs tracking-[0.18em] uppercase transition hover:text-gold lg:hidden"
          onClick={() => setDrawer(true)}
        >
          Filters
        </button>
        <p className="hidden text-sm text-plum/55 lg:block">{items.length} products</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-plum/50">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-beige bg-transparent px-2 py-1 outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{filterForm}</aside>
        <ProductGrid items={items} />
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-plum/30"
            aria-label="Close filters"
            onClick={() => setDrawer(false)}
          />
          <div className="relative h-full w-[86%] max-w-sm overflow-y-auto bg-ivory px-6 py-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            {filterForm}
            <button
              type="button"
              className="mt-8 w-full bg-plum py-3 text-[11px] tracking-[0.2em] text-cream uppercase"
              onClick={() => setDrawer(false)}
            >
              View {items.length} products
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] tracking-[0.18em] text-gold uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-beige bg-transparent px-3 py-2 outline-none"
      >
        {options.map((o) => (
          <option key={o.value + o.label} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
