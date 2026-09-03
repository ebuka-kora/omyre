import { BRAND } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import { IconInstagram, IconWhatsApp } from "@/components/icons";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center md:px-8 md:py-24">
      <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Contact</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Contact Omyre Essentials</h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-plum/65">
        Message us on WhatsApp or Instagram. We&apos;re happy to help with scents, orders, and
        delivery.
      </p>

      <div className="mt-12 flex flex-col gap-4">
        <a
          href={whatsappUrl("Hello Omyre Essentials, I'd like to get in touch.")}
          className="flex items-center justify-center gap-3 bg-plum px-6 py-4 text-[11px] tracking-[0.22em] text-cream uppercase transition duration-200 hover:bg-[#3a1f33]"
        >
          <IconWhatsApp className="h-5 w-5" />
          WhatsApp · {BRAND.whatsappDisplay}
        </a>
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 border border-plum px-6 py-4 text-[11px] tracking-[0.22em] uppercase transition duration-200 hover:bg-plum hover:text-cream"
        >
          <IconInstagram className="h-5 w-5" />
          Instagram · {BRAND.instagramHandle}
        </a>
      </div>
    </div>
  );
}
