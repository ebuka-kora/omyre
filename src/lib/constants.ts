import type { CategorySlug } from "./types";

export const BRAND = {
  name: "Omyre Essentials",
  tagline: "Romanticise your everyday.",
  instagramHandle: "@omyre.essentials",
  instagramUrl: "https://www.instagram.com/omyre.essentials/",
  whatsappNumber: "2348126095221",
  whatsappDisplay: "+234 812 609 5221",
  announcement:
    "Authentic self-care & fragrance essentials ✦ Nationwide delivery available",
};

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  description: string;
  href: string;
  image: string;
}[] = [
  {
    slug: "body-care",
    name: "Body Care",
    description: "Everyday rituals, elevated.",
    href: "/shop?category=body-care",
    image: "/brand/candles-wood.jpg",
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    description: "Find a scent that feels like you.",
    href: "/shop?category=fragrance",
    image: "/brand/room-sprays.jpg",
  },
  {
    slug: "candles",
    name: "Candles",
    description: "Set the mood.",
    href: "/shop?category=candles",
    image: "/brand/candles-velvet.jpg",
  },
  {
    slug: "home-fragrance",
    name: "Home Fragrance",
    description: "Your living room has a love language.",
    href: "/shop?category=home-fragrance",
    image: "/brand/candles-wood.jpg",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    description: "Thoughtful little luxuries.",
    href: "/shop?category=gift-sets",
    image: "/brand/candles-velvet.jpg",
  },
];

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?collection=bestsellers", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const MOBILE_NAV = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=body-care", label: "Body Care" },
  { href: "/shop?category=fragrance", label: "Fragrance" },
  { href: "/shop?category=candles", label: "Candles" },
  { href: "/shop?category=home-fragrance", label: "Home Fragrance" },
  { href: "/shop?category=gift-sets", label: "Gift Sets" },
  { href: "/shop?collection=new", label: "New Arrivals" },
  { href: "/shop?collection=bestsellers", label: "Best Sellers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track", label: "Track order" },
  { href: "/shipping", label: "Policies" },
];

export const FOOTER = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop?category=body-care", label: "Body Care" },
    { href: "/shop?category=fragrance", label: "Fragrance" },
    { href: "/shop?category=candles", label: "Candles" },
    { href: "/shop?category=home-fragrance", label: "Home Fragrance" },
    { href: "/shop?category=gift-sets", label: "Gift Sets" },
    { href: "/shop?collection=bestsellers", label: "Best Sellers" },
    { href: "/shop?collection=new", label: "New Arrivals" },
  ],
  care: [
    { href: "/contact", label: "Contact Us" },
    { href: "/shipping", label: "Shipping & Delivery" },
    { href: "/returns", label: "Returns & Exchanges" },
    { href: "/payment", label: "Payment & Orders" },
    { href: "/track", label: "Track order" },
    { href: "/faq", label: "FAQs" },
  ],
  omyre: [
    { href: "/about", label: "About Us" },
    { href: "/authenticity", label: "Quality & Authenticity" },
    {
      href: "https://www.instagram.com/omyre.essentials/",
      label: "Instagram",
      external: true,
    },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const INSTAGRAM_IMAGES = [
  "/brand/candles-velvet.jpg",
  "/brand/room-sprays.jpg",
  "/brand/candles-wood.jpg",
  "/products/a-thousand-wishes.jpg",
  "/products/strawberry-pound-cake.jpg",
  "/products/vanilla-bean.jpg",
];
