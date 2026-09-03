import type { Metadata } from "next";
import { AboutView } from "@/components/about-view";

export const metadata: Metadata = {
  title: "About",
  description:
    "Omyre Essentials helps you romanticise the everyday through beautiful self-care, fragrance and lifestyle essentials.",
};

export default function AboutPage() {
  return <AboutView />;
}
