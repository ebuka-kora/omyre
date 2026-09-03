"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  IconBag,
  IconClose,
  IconInstagram,
  IconMenu,
  IconSearch,
  IconUser,
  IconWhatsApp,
} from "./icons";
import { CartDrawer } from "./cart-drawer";
import { SearchModal } from "./search-modal";
import { useStore } from "@/context/store";
import { useExperience } from "@/context/experience";
import { BRAND, CATEGORIES, FOOTER, MOBILE_NAV, NAV_LINKS } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="Omyre Essentials"
        width={180}
        height={270}
        priority
        className={`h-12 w-auto md:h-14 ${light ? "drop-shadow-[0_4px_14px_rgba(75,41,66,0.55)]" : ""}`}
      />
    </Link>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cartCount, setCartOpen, setSearchOpen } = useStore();
  const { bagPulse } = useExperience();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="bg-plum px-4 py-1.5 text-center text-[10px] tracking-[0.16em] text-cream">
        {BRAND.announcement}
      </div>
      <header className="relative sticky top-0 z-40 border-b border-beige/70 bg-cream/92 backdrop-blur-md">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-700"
          style={{ transform: `scaleX(${scrolled ? 1 : 0.12})` }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-3 md:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu className="h-6 w-6" />
            </button>
            <div className="hidden lg:block">
              <Logo className="justify-start" />
            </div>
          </div>
          <div className="flex justify-center lg:hidden">
            <Logo />
          </div>
          <nav className="hidden items-center justify-center gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <Link href="/shop" className="nav-link text-[12px] tracking-[0.22em] uppercase">
                Shop
              </Link>
              {shopOpen && (
                <div className="absolute top-full left-1/2 z-50 w-[520px] -translate-x-1/2 pt-4">
                  <div className="grid grid-cols-2 gap-6 border border-beige bg-ivory p-6 shadow-sm">
                    {CATEGORIES.map((cat) => (
                      <Link key={cat.slug} href={cat.href} className="group block rounded-sm p-1 -m-1 transition hover:bg-beige/50">
                        <p className="text-[12px] tracking-[0.18em] uppercase transition group-hover:text-gold">{cat.name}</p>
                        <p className="mt-1 text-sm text-plum/50 transition group-hover:text-plum">
                          {cat.description}
                        </p>
                      </Link>
                    ))}
                    <Link href="/shop?collection=new" className="nav-link text-[12px] tracking-[0.18em] uppercase">
                      New Arrivals
                    </Link>
                    <Link
                      href="/shop?collection=bestsellers"
                      className="nav-link text-[12px] tracking-[0.18em] uppercase"
                    >
                      Best Sellers
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {NAV_LINKS.filter((l) => l.label !== "Shop").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[12px] tracking-[0.22em] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-4 md:gap-5">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @omyre.essentials"
              className="hover-gold hidden md:block"
            >
              <IconInstagram className="h-7 w-7" />
            </a>
            <button
              type="button"
              className="hover-gold hidden md:block"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch className="h-7 w-7" />
            </button>
            <Link href="/track" aria-label="Track your order" className="hover-gold">
              <IconUser className="h-7 w-7" />
            </Link>
            <motion.button
              type="button"
              id="omyre-bag"
              className="hover-gold relative"
              aria-label="Open bag"
              onClick={() => setCartOpen(true)}
              animate={bagPulse ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <IconBag className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[9px] text-white">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-plum/30"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative h-full w-[86%] max-w-sm overflow-y-auto bg-ivory px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl">Menu</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              className="mt-6 flex w-full items-center gap-2 border border-beige px-3 py-3 text-left text-sm text-plum/55"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <IconSearch className="h-4 w-4" />
              Search
            </button>
            <nav className="mt-6 flex flex-col">
              {MOBILE_NAV.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="border-b border-beige/80 py-3.5 text-sm tracking-[0.14em] uppercase transition hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm"
            >
              <IconInstagram className="h-4 w-4" />
              @omyre.essentials
            </a>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <footer className="relative overflow-hidden border-t border-beige bg-ivory">
        <p className="pointer-events-none absolute inset-x-0 bottom-10 text-center font-serif text-[18vw] leading-none text-plum/[0.04]">
          omyre
        </p>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo className="justify-start" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-plum/60">
              Self-care, fragrance and home essentials to help you romanticise the everyday.
            </p>
          </div>
          <FooterCol title="Shop" links={FOOTER.shop} />
          <FooterCol title="Customer Care" links={FOOTER.care} />
          <FooterCol title="Omyre" links={FOOTER.omyre} />
          <div>
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Contact</p>
            <a
              href={whatsappUrl("Hello Omyre Essentials, I'd like to ask about an order.")}
              className="mt-4 flex items-center gap-2 text-sm transition hover:text-gold"
            >
              <IconWhatsApp className="h-4 w-4" />
              {BRAND.whatsappDisplay}
            </a>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center gap-2 text-sm transition hover:text-gold"
            >
              <IconInstagram className="h-4 w-4" />
              {BRAND.instagramHandle}
            </a>
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Legal</p>
              <ul className="mt-4 space-y-2">
                {FOOTER.legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-plum/70 transition hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-beige px-4 py-6 text-center text-xs text-plum/45">
          <p>© {new Date().getFullYear()} Omyre Essentials. Authentic products. Nationwide delivery.</p>
          <p className="mt-1.5">Created by Dipsix</p>
        </div>
      </footer>

      <a
        href={whatsappUrl("Hello Omyre Essentials, I'd like some help with shopping.")}
        className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-plum px-4 py-3 text-cream shadow-lg transition duration-200 hover:scale-105 hover:bg-[#3a1f33] md:right-6 md:bottom-6"
        aria-label="Chat with us on WhatsApp"
      >
        <IconWhatsApp className="h-5 w-5" />
        <span className="hidden text-[11px] tracking-[0.16em] uppercase sm:inline">
          Chat with us
        </span>
      </a>

      <CartDrawer />
      <SearchModal />
    </>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-plum/70 transition hover:text-gold">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-plum/70 transition hover:text-gold">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
