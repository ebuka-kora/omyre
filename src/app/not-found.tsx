import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">404</p>
      <h1 className="mt-3 font-serif text-4xl">This page has wandered off</h1>
      <p className="mt-3 text-sm text-plum/60">
        The little luxury you&apos;re looking for isn&apos;t here.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-plum px-6 py-3 text-[11px] tracking-[0.2em] text-cream uppercase"
      >
        Shop Collection
      </Link>
    </div>
  );
}
