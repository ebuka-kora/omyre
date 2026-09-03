import type { CategorySlug, FragranceFamily, Product } from "./types";

const IMG = {
  velvet: "/brand/candles-velvet.jpg",
  wood: "/brand/candles-wood.jpg",
  sprays: "/brand/room-sprays.jpg",
  campaign: "/brand/candles-velvet.jpg",
  campaignAlt: "/brand/candles-wood.jpg",
  atw: "/products/a-thousand-wishes.jpg",
  stars: "/products/in-the-stars.jpg",
  cake: "/products/strawberry-pound-cake.jpg",
  vanilla: "/products/vanilla-bean.jpg",
  paris: "/products/paris-cafe.jpg",
  tea: "/products/white-tea-sage.jpg",
  trio: "/products/candles-trio-velvet.jpg",
};

type Draft = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  type: string;
  category: CategorySlug;
  price: number;
  images: string[];
  description: string;
  brand?: string;
  fragranceFamily?: FragranceFamily;
  fragranceName?: string;
  size?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  stock?: number;
  notes?: Product["notes"];
};

function item(d: Draft): Product {
  return {
    id: d.id,
    sku: d.sku,
    slug: d.slug,
    name: d.name,
    brand: d.brand ?? "Bath & Body Works",
    type: d.type,
    category: d.category,
    fragranceFamily: d.fragranceFamily ?? "Floral",
    fragranceName: d.fragranceName ?? "Assorted",
    price: d.price,
    rating: 4.8,
    reviewCount: 24,
    stock: d.stock ?? 14,
    lowStockThreshold: 3,
    featured: Boolean(d.featured),
    bestSeller: Boolean(d.bestSeller),
    newArrival: Boolean(d.newArrival),
    description: d.description,
    notes: d.notes,
    details: { size: d.size ?? "Standard", origin: "USA" },
    images: d.images,
    related: [],
    seoTitle: `${d.name} | Omyre Essentials`,
    seoDescription: `Shop authentic ${d.name} at Omyre Essentials. Lagos and nationwide delivery across Nigeria.`,
  };
}

const drafts: Draft[] = [
  {
    id: "p-001",
    sku: "OMY-ATW-CND",
    slug: "a-thousand-wishes-three-wick-candle",
    name: "A Thousand Wishes 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "A Thousand Wishes",
    fragranceFamily: "Floral",
    size: "411 g / 14.5 oz",
    featured: true,
    bestSeller: true,
    images: [IMG.atw, IMG.velvet, IMG.campaign],
    notes: {
      top: "Champagne toast, sparkling pink prosecco",
      heart: "Sparkling peach, peony",
      base: "Amber, sandalwood, musk",
    },
    description:
      "Champagne toast, sparkling peach and peony — a celebration in wax. The little luxury that turns an ordinary evening into a moment worth remembering.",
  },
  {
    id: "p-002",
    sku: "OMY-SPC-CND",
    slug: "strawberry-pound-cake-three-wick-candle",
    name: "Strawberry Pound Cake 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "Strawberry Pound Cake",
    fragranceFamily: "Gourmand",
    size: "411 g / 14.5 oz",
    featured: true,
    bestSeller: true,
    images: [IMG.cake, IMG.velvet, IMG.trio],
    notes: {
      top: "Fresh strawberries",
      heart: "Golden pound cake",
      base: "Whipped vanilla cream",
    },
    description:
      "Fresh strawberries, golden pound cake and whipped vanilla. A gourmand candle that makes a living room feel like a bakery at dusk.",
  },
  {
    id: "p-003",
    sku: "OMY-ITS-CND",
    slug: "in-the-stars-three-wick-candle",
    name: "In the Stars 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "In the Stars",
    fragranceFamily: "Warm",
    size: "411 g / 14.5 oz",
    featured: true,
    images: [IMG.stars, IMG.velvet, IMG.trio],
    notes: {
      top: "Starflower",
      heart: "Sandalwood, jasmine",
      base: "Warm musk, amber",
    },
    description:
      "Starflower, sandalwood and warm musk. Soft light, a gold lid, and a scent that lingers after the room goes quiet.",
  },
  {
    id: "p-004",
    sku: "OMY-VBN-CND",
    slug: "vanilla-bean-three-wick-candle",
    name: "Vanilla Bean 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "Vanilla Bean",
    fragranceFamily: "Gourmand",
    size: "411 g / 14.5 oz",
    bestSeller: true,
    images: [IMG.vanilla, IMG.wood, IMG.velvet],
    notes: {
      top: "Vanilla bean",
      heart: "Warm sugar",
      base: "Creamy musk",
    },
    description:
      "Warm vanilla bean on a quiet afternoon. Light it, mind your business, and let the room do the rest.",
  },
  {
    id: "p-005",
    sku: "OMY-PCF-CND",
    slug: "paris-cafe-three-wick-candle",
    name: "Paris Café 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "Paris Café",
    fragranceFamily: "Gourmand",
    size: "411 g / 14.5 oz",
    images: [IMG.paris, IMG.wood, IMG.campaign],
    notes: {
      top: "Dark roast espresso",
      heart: "Warm milk",
      base: "Vanilla, sugar",
    },
    description:
      "Dark roast, warm milk and vanilla — a café in candle form. For slow mornings and even slower evenings.",
  },
  {
    id: "p-006",
    sku: "OMY-WTS-CND",
    slug: "white-tea-sage-three-wick-candle",
    name: "White Tea & Sage 3-Wick Candle",
    type: "3-Wick Candle",
    category: "candles",
    price: 32000,
    fragranceName: "White Tea & Sage",
    fragranceFamily: "Fresh",
    size: "411 g / 14.5 oz",
    images: [IMG.tea, IMG.wood, IMG.velvet],
    notes: {
      top: "White tea, sparkling bergamot",
      heart: "Fresh garden sage",
      base: "Clean musk",
    },
    description:
      "White tea, garden sage and sparkling bergamot. A clean, quiet scent for rooms that need a little air.",
  },
  {
    id: "p-007",
    sku: "OMY-CND-STN",
    slug: "candle-stand",
    name: "Candle Stand",
    brand: "Omyre Essentials",
    type: "Candle Stand",
    category: "candles",
    price: 28000,
    fragranceName: "Assorted",
    fragranceFamily: "Warm",
    size: "Table stand",
    images: [IMG.velvet, IMG.campaign, IMG.wood],
    description:
      "A sculptural stand for your three-wick. Elevate the candle — and the corner it lives in.",
  },
  {
    id: "p-008",
    sku: "OMY-RM-SPY",
    slug: "room-spray",
    name: "Room Spray",
    type: "Room Spray",
    category: "home-fragrance",
    price: 13000,
    fragranceName: "Assorted",
    fragranceFamily: "Fresh",
    size: "42.5 g",
    featured: true,
    bestSeller: true,
    images: [IMG.sprays, IMG.wood, IMG.campaign],
    description:
      "Your weekend mood, bottled. Sweet, fresh, warm or a little luxurious — a burst of fragrance for linens, corners and the air between.",
  },
  {
    id: "p-009",
    sku: "OMY-WL-RFL",
    slug: "wall-fragrance-refill",
    name: "Wall Fragrance Refill",
    type: "Wallflower Refill",
    category: "home-fragrance",
    price: 9000,
    fragranceFamily: "Fresh",
    size: "24 ml",
    images: [IMG.sprays, IMG.campaign, IMG.wood],
    description:
      "Keep the plug-in going. A wallflower refill so the house still smells like you when you walk back in.",
  },
  {
    id: "p-010",
    sku: "OMY-BLK-PLG",
    slug: "black-wall-plug",
    name: "Black Wall Plug",
    type: "Wall Plug",
    category: "home-fragrance",
    price: 20000,
    fragranceFamily: "Warm",
    size: "Plug-in unit",
    images: [IMG.sprays, IMG.wood, IMG.velvet],
    description:
      "A black wall plug for continuous home fragrance. Quiet luxury that works while you do.",
  },
  {
    id: "p-011",
    sku: "OMY-DSN-PLG",
    slug: "design-wall-plug-in",
    name: "Design Wall Plug-In",
    type: "Wall Plug",
    category: "home-fragrance",
    price: 28000,
    fragranceFamily: "Floral",
    size: "Decorative plug-in",
    newArrival: true,
    images: [IMG.campaign, IMG.sprays, IMG.velvet],
    description:
      "A design-led wall plug-in — fragrance that looks as considered as it smells.",
  },
  {
    id: "p-012",
    sku: "OMY-CAR-RFL",
    slug: "car-plug-refill",
    name: "Car Plug Refill",
    type: "Car Fragrance",
    category: "home-fragrance",
    price: 8000,
    fragranceFamily: "Fresh",
    size: "Refill",
    images: [IMG.sprays, IMG.campaign],
    description:
      "A refill for your car plug. The commute, but make it fragrant.",
  },
  {
    id: "p-013",
    sku: "OMY-SHM-CAR",
    slug: "shimmery-car-plug",
    name: "Shimmery Car Plug",
    type: "Car Fragrance",
    category: "home-fragrance",
    price: 22000,
    fragranceFamily: "Floral",
    size: "Car plug",
    images: [IMG.sprays, IMG.campaignAlt],
    description:
      "A shimmery car plug — a little sparkle for the dashboard, and a scent that travels with you.",
  },
  {
    id: "p-014",
    sku: "OMY-PLN-CLP",
    slug: "plain-car-clips",
    name: "Plain Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 18000,
    fragranceFamily: "Fresh",
    size: "Vent clip",
    images: [IMG.sprays, IMG.wood],
    description:
      "Simple vent clips for everyday fragrance on the road.",
  },
  {
    id: "p-015",
    sku: "OMY-LEAF-CLP",
    slug: "leaf-car-clips",
    name: "Leaf Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 22000,
    fragranceFamily: "Fresh",
    size: "Vent clip",
    images: [IMG.sprays, IMG.campaign],
    description:
      "Leaf-shaped car clips — a small botanical detail for the drive.",
  },
  {
    id: "p-016",
    sku: "OMY-LTH-CLP",
    slug: "leather-car-clips",
    name: "Leather Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 25000,
    fragranceFamily: "Woody",
    size: "Vent clip",
    images: [IMG.wood, IMG.sprays],
    description:
      "Leather car clips with a quieter, more tailored feel.",
  },
  {
    id: "p-017",
    sku: "OMY-BOW-CLP",
    slug: "bow-car-clips",
    name: "Bow Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 25000,
    fragranceFamily: "Floral",
    size: "Vent clip",
    images: [IMG.campaign, IMG.sprays],
    description:
      "Bow car clips — a little romance for the vent.",
  },
  {
    id: "p-018",
    sku: "OMY-RSE-CLP",
    slug: "rose-car-clips",
    name: "Rose Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 25000,
    fragranceFamily: "Floral",
    size: "Vent clip",
    images: [IMG.campaignAlt, IMG.sprays],
    description:
      "Rose car clips for a softer, floral finish on the road.",
  },
  {
    id: "p-019",
    sku: "OMY-MTL-CLP",
    slug: "metallic-car-clips",
    name: "Metallic Car Clips",
    brand: "Omyre Essentials",
    type: "Car Clips",
    category: "home-fragrance",
    price: 40000,
    fragranceFamily: "Warm",
    size: "Vent clip",
    newArrival: true,
    images: [IMG.velvet, IMG.sprays, IMG.campaign],
    description:
      "Metallic car clips — the most luxe way to scent the drive.",
  },
  {
    id: "p-020",
    sku: "OMY-WOM-CRM",
    slug: "womens-body-cream",
    name: "Women's Body Cream",
    type: "Body Cream",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Floral",
    size: "226 g",
    featured: true,
    bestSeller: true,
    images: [IMG.campaign, IMG.campaignAlt, IMG.velvet],
    description:
      "A rich body cream for after the shower. Soft skin, a lingering scent, and a ritual that feels like yours.",
  },
  {
    id: "p-021",
    sku: "OMY-WOM-WSH",
    slug: "womens-body-wash",
    name: "Women's Body Wash",
    type: "Body Wash",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Floral",
    size: "295 ml",
    bestSeller: true,
    images: [IMG.campaignAlt, IMG.campaign, IMG.sprays],
    description:
      "A daily body wash that turns the shower into the first nice thing that happens.",
  },
  {
    id: "p-022",
    sku: "OMY-BDY-BTR",
    slug: "body-butter",
    name: "Body Butter",
    type: "Body Butter",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Gourmand",
    size: "185 g",
    bestSeller: true,
    images: [IMG.campaign, IMG.wood, IMG.velvet],
    description:
      "A whipped body butter for skin that wants more. Slow, rich, and made for evening.",
  },
  {
    id: "p-023",
    sku: "OMY-BDY-SCR",
    slug: "body-scrub",
    name: "Body Scrub",
    type: "Body Scrub",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Fresh",
    size: "226 g",
    images: [IMG.wood, IMG.campaign, IMG.velvet],
    description:
      "A body scrub to polish the day off. Smooth skin, a little fragrance, a cleaner start.",
  },
  {
    id: "p-024",
    sku: "OMY-COC-CRM",
    slug: "cocoa-body-cream",
    name: "Cocoa Body Cream",
    type: "Body Cream",
    category: "body-care",
    price: 20000,
    fragranceName: "Cocoa",
    fragranceFamily: "Gourmand",
    size: "226 g",
    images: [IMG.wood, IMG.campaignAlt, IMG.velvet],
    notes: {
      top: "Cocoa butter",
      heart: "Warm vanilla",
      base: "Soft musk",
    },
    description:
      "Cocoa butter richness with a warm, gourmand finish. Comfort, bottled as a cream.",
  },
  {
    id: "p-025",
    sku: "OMY-HND-WSH",
    slug: "hand-wash",
    name: "Hand Wash",
    type: "Hand Wash",
    category: "body-care",
    price: 11500,
    fragranceFamily: "Fresh",
    size: "236 ml",
    images: [IMG.campaign, IMG.sprays],
    description:
      "A beautiful hand wash for the sink you actually use. Small ritual, every time.",
  },
  {
    id: "p-026",
    sku: "OMY-MSG-OIL",
    slug: "massage-oil",
    name: "Massage Oil",
    type: "Massage Oil",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Warm",
    size: "118 ml",
    images: [IMG.campaignAlt, IMG.wood],
    description:
      "A silky massage oil for slower evenings. Skin, scent, and a little time.",
  },
  {
    id: "p-027",
    sku: "OMY-CLN-BAR",
    slug: "cleansing-bar",
    name: "Cleansing Bar",
    type: "Cleansing Bar",
    category: "body-care",
    price: 9000,
    fragranceFamily: "Fresh",
    size: "Bar",
    images: [IMG.campaign, IMG.velvet],
    description:
      "A cleansing bar that still feels like a treat. Simple, fragrant, and easy to love.",
  },
  {
    id: "p-028",
    sku: "OMY-WOM-DEO",
    slug: "womens-deodorant",
    name: "Women's Deodorant",
    type: "Deodorant",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Floral",
    size: "73 g",
    images: [IMG.campaign, IMG.sprays],
    description:
      "Everyday deodorant with the same scent story as the rest of your ritual.",
  },
  {
    id: "p-029",
    sku: "OMY-TBE-WSH",
    slug: "tube-body-wash",
    name: "Tube Body Wash",
    type: "Body Wash",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Fresh",
    size: "Tube",
    images: [IMG.campaignAlt, IMG.sprays],
    description:
      "Body wash in a tube — travel-friendly, shower-ready, still a little luxurious.",
  },
  {
    id: "p-030",
    sku: "OMY-SHP-CND",
    slug: "shampoo-and-conditioner",
    name: "Shampoo and Conditioner",
    type: "Hair Care",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Fresh",
    size: "Pair",
    images: [IMG.sprays, IMG.campaign],
    description:
      "Shampoo and conditioner as a pair. Soft hair, a familiar scent, a finished ritual.",
  },
  {
    id: "p-031",
    sku: "OMY-MIN-TRV",
    slug: "mini-travel-size",
    name: "Mini Travel Size",
    type: "Travel Size",
    category: "body-care",
    price: 9500,
    fragranceFamily: "Floral",
    size: "Mini",
    newArrival: true,
    images: [IMG.campaign, IMG.sprays],
    description:
      "A mini for the bag, the weekend, the guest bath. The ritual, scaled down.",
  },
  {
    id: "p-032",
    sku: "OMY-SAN-HND",
    slug: "antibacterial-hand-sanitizer",
    name: "Antibacterial Hand Sanitizer",
    type: "Sanitizer",
    category: "body-care",
    price: 4000,
    fragranceFamily: "Fresh",
    size: "29 ml",
    images: [IMG.sprays, IMG.campaign],
    description:
      "A pocket sanitizer that still smells like something you'd choose.",
  },
  {
    id: "p-033",
    sku: "OMY-MEN-DEO",
    slug: "mens-deodorant",
    name: "Men's Deodorant",
    type: "Deodorant",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Woody",
    size: "73 g",
    images: [IMG.wood, IMG.sprays],
    description:
      "Men's deodorant from the same authentic line — clean, considered, everyday.",
  },
  {
    id: "p-034",
    sku: "OMY-MEN-WSH",
    slug: "mens-body-wash",
    name: "Men's Body Wash",
    type: "Body Wash",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Woody",
    size: "295 ml",
    images: [IMG.wood, IMG.velvet],
    description:
      "A men's body wash with presence. Warm, woody, and easy to live with.",
  },
  {
    id: "p-035",
    sku: "OMY-MEN-CRM",
    slug: "mens-body-cream",
    name: "Men's Body Cream",
    type: "Body Cream",
    category: "body-care",
    price: 20000,
    fragranceFamily: "Woody",
    size: "226 g",
    images: [IMG.wood, IMG.campaign],
    description:
      "Men's body cream for after the shower. Hydration without the fuss.",
  },
  {
    id: "p-036",
    sku: "OMY-MEN-SPY",
    slug: "mens-body-spray",
    name: "Men's Body Spray",
    type: "Body Spray",
    category: "fragrance",
    price: 20000,
    fragranceFamily: "Woody",
    size: "104 g",
    images: [IMG.sprays, IMG.wood],
    description:
      "A men's body spray for the finish. Light, lingering, ready for the day.",
  },
  {
    id: "p-037",
    sku: "OMY-WOM-MST",
    slug: "womens-body-mist",
    name: "Women's Body Mist",
    type: "Fine Fragrance Mist",
    category: "fragrance",
    price: 20000,
    fragranceFamily: "Floral",
    size: "236 ml",
    featured: true,
    bestSeller: true,
    images: [IMG.sprays, IMG.campaign, IMG.campaignAlt],
    description:
      "A signature mist for skin and the air around it. Light, lingering, made for everyday wear.",
  },
  {
    id: "p-038",
    sku: "OMY-PRF-MST",
    slug: "perfume-mist",
    name: "Perfume Mist",
    type: "Fine Fragrance Mist",
    category: "fragrance",
    price: 20000,
    fragranceFamily: "Floral",
    size: "236 ml",
    images: [IMG.campaignAlt, IMG.sprays, IMG.campaign],
    description:
      "A perfume mist with a little more presence. For the days you want to be remembered.",
  },
  {
    id: "p-039",
    sku: "OMY-SHM-MST",
    slug: "shimmery-mist",
    name: "Shimmery Mist",
    type: "Shimmer Mist",
    category: "fragrance",
    price: 19000,
    fragranceFamily: "Floral",
    size: "236 ml",
    newArrival: true,
    images: [IMG.campaign, IMG.velvet, IMG.sprays],
    description:
      "A shimmery mist — fragrance with a soft glow. Romanticise the light on your skin.",
  },
  {
    id: "p-040",
    sku: "OMY-ARO-MST",
    slug: "aromatherapy-body-mist",
    name: "Aromatherapy Body Mist",
    type: "Aromatherapy Mist",
    category: "fragrance",
    price: 20000,
    fragranceFamily: "Fresh",
    size: "156 ml",
    images: [IMG.sprays, IMG.wood],
    description:
      "An aromatherapy mist for when the room — and you — need a reset.",
  },
  {
    id: "p-041",
    sku: "OMY-VS-MST",
    slug: "victorias-secret-body-mist",
    name: "Victoria's Secret Body Mist",
    brand: "Victoria's Secret",
    type: "Fine Fragrance Mist",
    category: "fragrance",
    price: 25000,
    fragranceFamily: "Floral",
    size: "250 ml",
    images: [IMG.campaignAlt, IMG.sprays, IMG.campaign],
    description:
      "A Victoria's Secret body mist, sourced with the same care as the rest of the edit.",
  },
  {
    id: "p-042",
    sku: "OMY-GFT-SET",
    slug: "gift-set",
    name: "Gift Set",
    brand: "Omyre Essentials",
    type: "Gift Set",
    category: "gift-sets",
    price: 62000,
    fragranceFamily: "Floral",
    size: "Curated set",
    featured: true,
    newArrival: true,
    images: [IMG.velvet, IMG.campaign, IMG.wood],
    description:
      "A curated set of essentials — the easiest way to give a little luxury. Packaged with care, ready to romanticise someone else's everyday.",
  },
];

export const products: Product[] = drafts.map(item).map((product, _, all) => {
  const same = all.filter((x) => x.category === product.category && x.slug !== product.slug);
  const extra = all.filter(
    (x) => x.featured && x.slug !== product.slug && x.category !== product.category,
  );
  return {
    ...product,
    related: [...same.slice(0, 3), ...extra.slice(0, 1)].map((x) => x.slug).slice(0, 4),
  };
});

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product) {
  return product.related
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getBestSellers() {
  return products.filter((p) => p.bestSeller);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getNewArrivals() {
  return products.filter((p) => p.newArrival);
}

export const brands = [...new Set(products.map((p) => p.brand))];
export const types = [...new Set(products.map((p) => p.type))];
export const fragranceFamilies = [
  ...new Set(products.map((p) => p.fragranceFamily)),
];
export const fragranceNames = [
  ...new Set(products.map((p) => p.fragranceName)),
];
