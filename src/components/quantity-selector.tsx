"use client";

import { IconMinus, IconPlus } from "./icons";
import { cx } from "@/lib/utils";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <div className="inline-flex items-center border border-beige">
      <button
        type="button"
        className={cx(btn, "grid place-items-center text-plum/70 transition hover:bg-beige hover:text-plum")}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <IconMinus className="h-4 w-4" />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className={cx(btn, "grid place-items-center text-plum/70 transition hover:bg-beige hover:text-plum")}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
