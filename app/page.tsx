import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import { meta } from "@/content/portfolio";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, images: ["/projects/mediclaim.jpg"] },
};

export default function Home() {
  return <PortfolioPage />;
}
