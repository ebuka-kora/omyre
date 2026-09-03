export type CategorySlug =
  | "body-care"
  | "fragrance"
  | "candles"
  | "home-fragrance"
  | "gift-sets";

export type FragranceFamily =
  | "Floral"
  | "Fresh"
  | "Gourmand"
  | "Woody"
  | "Fruity"
  | "Warm";

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  type: string;
  category: CategorySlug;
  fragranceFamily: FragranceFamily;
  fragranceName: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  description: string;
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
  details: {
    size: string;
    origin: string;
  };
  images: string[];
  related: string[];
  seoTitle: string;
  seoDescription: string;
};

export type CartItem = {
  slug: string;
  quantity: number;
};

export type DeliveryOption = "lagos" | "nationwide";

export type PaymentMethod = "bank-transfer" | "mobile" | "cash";

export type OrderStatus =
  | "Pending"
  | "Payment Pending"
  | "Paid"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export type Order = {
  id: string;
  createdAt: string;
  items: (CartItem & { name: string; price: number; image: string })[];
  subtotal: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    state: string;
    city: string;
    landmark: string;
  };
  delivery: DeliveryOption;
  payment: PaymentMethod;
  status: OrderStatus;
  notes?: string;
};

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-selling";
