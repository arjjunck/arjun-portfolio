import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import { variants } from "@/content/portfolio";

const v = variants.fullstack;

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  openGraph: { title: v.meta.title, description: v.meta.description, images: ["/arjun-portrait.webp"] },
};

export default function Home() {
  return <PortfolioPage variantKey="fullstack" />;
}
