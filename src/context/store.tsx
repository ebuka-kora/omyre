"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/lib/products";
import type { CartItem, Order, Product } from "@/lib/types";
import { generateOrderId, productPrice } from "@/lib/utils";

const CART_KEY = "omyre-cart";
const WISH_KEY = "omyre-wishlist";
const ORDERS_KEY = "omyre-orders";
const NEWS_KEY = "omyre-newsletter";

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addToCart: (slug: string, quantity?: number, opts?: { open?: boolean }) => void;
  buyNow: (slug: string, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status" | "items" | "subtotal">) => Order;
  subscribe: (email: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(readJson<CartItem[]>(CART_KEY, []));
    setWishlist(readJson<string[]>(WISH_KEY, []));
    setOrders(readJson<Order[]>(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.slug === item.slug);
        return product ? { item, product } : null;
      })
      .filter((entry): entry is { item: CartItem; product: Product } => Boolean(entry));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartProducts.reduce(
    (sum, { item, product }) => sum + productPrice(product) * item.quantity,
    0,
  );

  const addToCart = useCallback((slug: string, quantity = 1, opts?: { open?: boolean }) => {
    const product = products.find((p) => p.slug === slug);
    if (!product || product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.slug === slug ? { ...item, quantity: nextQty } : item,
        );
      }
      return [...prev, { slug, quantity: Math.min(quantity, product.stock) }];
    });
    if (opts?.open !== false) setCartOpen(true);
  }, []);

  const buyNow = useCallback((slug: string, quantity = 1) => {
    const product = products.find((p) => p.slug === slug);
    if (!product || product.stock <= 0) return;
    const next = [{ slug, quantity: Math.min(quantity, product.stock) }];
    setCart(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setCartOpen(false);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.slug !== slug);
      return prev.map((item) =>
        item.slug === slug
          ? { ...item, quantity: Math.min(quantity, product.stock) }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist],
  );

  const placeOrder: StoreContextValue["placeOrder"] = useCallback(
    (input) => {
      const items = cartProducts.map(({ item, product }) => ({
        slug: item.slug,
        quantity: item.quantity,
        name: product.name,
        price: productPrice(product),
        image: product.images[0],
      }));
      const order: Order = {
        ...input,
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        status: "Payment Pending",
        items,
        subtotal: cartSubtotal,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCartOpen(false);
      return order;
    },
    [cartProducts, cartSubtotal],
  );

  const subscribe = useCallback((email: string) => {
    const list = readJson<string[]>(NEWS_KEY, []);
    if (!list.includes(email)) {
      localStorage.setItem(NEWS_KEY, JSON.stringify([...list, email]));
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      orders,
      cartCount,
      cartSubtotal,
      cartOpen,
      searchOpen,
      setCartOpen,
      setSearchOpen,
      addToCart,
      buyNow,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      placeOrder,
      subscribe,
    }),
    [
      cart,
      wishlist,
      orders,
      cartCount,
      cartSubtotal,
      cartOpen,
      searchOpen,
      addToCart,
      buyNow,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      placeOrder,
      subscribe,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
