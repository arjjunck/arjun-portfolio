import fs from "node:fs";
import path from "node:path";
import { sectionMeta, variants, type SectionKey, type VariantKey } from "@/content/portfolio";
import About from "./About";
import BackToTop from "./BackToTop";
import Contact from "./Contact";
import DataScience from "./DataScience";
import Education from "./Education";
import Experience from "./Experience";
import Footer from "./Footer";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Nav from "./Nav";
import Other from "./Other";
import ScrollProgress from "./ScrollProgress";
import Software from "./Software";

export default function PortfolioPage({ variantKey }: { variantKey: VariantKey }) {
  const v = variants[variantKey];
  // Hide resume links until the PDF actually exists in /public.
  const resume = fs.existsSync(path.join(process.cwd(), "public", v.resumePdf)) ? v.resumePdf : null;
  const sections = v.sectionOrder.filter((s): s is Exclude<SectionKey, "hero"> => s !== "hero");
  const num = (s: Exclude<SectionKey, "hero">) => String(sections.indexOf(s) + 1).padStart(2, "0");

  const render = (s: Exclude<SectionKey, "hero">) => {
    const props = { id: sectionMeta[s].id, number: num(s) };
    switch (s) {
      case "about":
        return <About key={s} {...props} variant={v} />;
      case "software_development":
        return <Software key={s} {...props} variant={v} />;
      case "data_science":
        return <DataScience key={s} {...props} variant={v} />;
      case "experience":
        return <Experience key={s} {...props} title={v.experienceTitle} />;
      case "other":
        return <Other key={s} {...props} />;
      case "education":
        return <Education key={s} {...props} />;
      case "contact":
        return <Contact key={s} {...props} resume={resume} />;
    }
  };

  return (
    <div data-variant={v.key} className="min-h-screen">
      <ScrollProgress />
      <Nav variant={v} resume={resume} />
      <main>
        <Hero variant={v} />
        <Marquee />
        {sections.map(render)}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
