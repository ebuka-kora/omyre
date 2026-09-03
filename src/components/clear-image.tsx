"use client";

import Image, { type ImageProps } from "next/image";
import { cx } from "@/lib/utils";

export function ClearImage({ className, alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      quality={95}
      {...props}
      className={cx("object-cover", className)}
    />
  );
}
