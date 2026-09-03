"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import type { Order, OrderStatus } from "@/lib/types";
import { formatNaira, stockLabel } from "@/lib/utils";

const STATUSES: OrderStatus[] = [
  "Pending",
  "Payment Pending",
  "Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"overview" | "products" | "orders" | "customers">("overview");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("omyre-orders");
    setOrders(raw ? (JSON.parse(raw) as Order[]) : []);
  }, []);

  function persist(next: Order[]) {
    setOrders(next);
    localStorage.setItem("omyre-orders", JSON.stringify(next));
  }

  const revenue = orders
    .filter((o) => !["Cancelled", "Returned"].includes(o.status))
    .reduce((s, o) => s + o.subtotal, 0);
  const pending = orders.filter((o) =>
    ["Pending", "Payment Pending", "Paid", "Processing"].includes(o.status),
  );
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold);
  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; total: number; orders: number }>();
    orders.forEach((o) => {
      const key = o.customer.email || o.customer.phone;
      const prev = map.get(key);
      if (prev) {
        prev.total += o.subtotal;
        prev.orders += 1;
      } else {
        map.set(key, {
          name: o.customer.fullName,
          email: o.customer.email,
          phone: o.customer.phone,
          total: o.subtotal,
          orders: 1,
        });
      }
    });
    return [...map.values()].filter((c) =>
      `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [orders, query]);

  return (
    <div className="min-h-screen bg-ivory text-plum">
      <header className="flex items-center justify-between border-b border-beige px-6 py-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-gold uppercase">Omyre Essentials</p>
          <h1 className="font-serif text-2xl">Admin</h1>
        </div>
        <Link href="/" className="text-xs tracking-wide underline-offset-4 hover:underline">
          View storefront
        </Link>
      </header>
      <p className="bg-beige/50 px-6 py-2 text-xs text-plum/60">
        Demo admin — orders are stored on this browser. Add authentication before production.
      </p>
      <nav className="flex gap-4 overflow-x-auto border-b border-beige px-6 py-3 text-xs tracking-[0.16em] uppercase">
        {(["overview", "products", "orders", "customers"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={tab === t ? "text-plum" : "text-plum/40"}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="px-6 py-8">
        {tab === "overview" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Stat label="Revenue" value={formatNaira(revenue)} />
            <Stat label="Orders" value={String(orders.length)} />
            <Stat label="Customers" value={String(customers.length)} />
            <Stat label="Products" value={String(products.length)} />
            <Stat label="Low stock" value={String(lowStock.length)} />
            <Stat label="Pending orders" value={String(pending.length)} />
          </div>
        )}

        {tab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-[11px] tracking-[0.16em] text-gold uppercase">
                <tr>
                  <th className="py-3">Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-beige">
                    <td className="py-3">
                      <p>{p.name}</p>
                      <p className="text-xs text-plum/45">{p.category}</p>
                    </td>
                    <td>{p.sku}</td>
                    <td>{formatNaira(p.salePrice ?? p.price)}</td>
                    <td>{p.stock}</td>
                    <td>{stockLabel(p)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "orders" && (
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <p className="text-sm text-plum/55">No orders yet. Place one from the storefront.</p>
            ) : (
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="text-[11px] tracking-[0.16em] text-gold uppercase">
                  <tr>
                    <th className="py-3">Order #</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-beige">
                      <td className="py-3">{o.id}</td>
                      <td>
                        {o.customer.fullName}
                        <p className="text-xs text-plum/45">{o.customer.phone}</p>
                      </td>
                      <td>{o.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}</td>
                      <td>{formatNaira(o.subtotal)}</td>
                      <td>{o.payment}</td>
                      <td>{o.delivery}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            persist(
                              orders.map((x) =>
                                x.id === o.id
                                  ? { ...x, status: e.target.value as OrderStatus }
                                  : x,
                              ),
                            )
                          }
                          className="border border-beige bg-transparent px-2 py-1"
                        >
                          {STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>{new Date(o.createdAt).toLocaleDateString("en-NG")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "customers" && (
          <div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers"
              className="mb-6 w-full max-w-sm border border-beige bg-transparent px-3 py-2 text-sm outline-none"
            />
            {customers.length === 0 ? (
              <p className="text-sm text-plum/55">No customers yet.</p>
            ) : (
              <ul className="divide-y divide-beige border-y border-beige">
                {customers.map((c) => (
                  <li key={c.email + c.phone} className="py-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-plum/55">
                      {c.email} · {c.phone}
                    </p>
                    <p className="mt-1 text-xs text-plum/45">
                      {c.orders} order{c.orders === 1 ? "" : "s"} · {formatNaira(c.total)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-beige bg-cream px-5 py-6">
      <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
    </div>
  );
}
