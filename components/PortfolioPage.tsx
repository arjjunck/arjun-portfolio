import fs from "node:fs";
import path from "node:path";
import { identity, sectionMeta, sectionOrder, type SectionKey } from "@/content/portfolio";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Feed from "./Feed";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import Projects from "./Projects";
import Skills from "./Skills";
import StatusBar from "./StatusBar";

export default function PortfolioPage() {
  // CVs are the main conversion; fail the build rather than ship a dead download link.
  for (const { file } of identity.cvs) {
    if (!fs.existsSync(path.join(process.cwd(), "public", file))) throw new Error(`CV not found at public${file}`);
  }
  const cv = identity.cv;

  const render = (s: SectionKey) => {
    const id = sectionMeta[s].id;
    switch (s) {
      case "projects":
        return <Projects key={s} id={id} />;
      case "experience":
        return <Experience key={s} id={id} />;
      case "skills":
        return <Skills key={s} id={id} />;
      case "about":
        return <About key={s} id={id} />;
      case "feed":
        return <Feed key={s} id={id} />;
      case "education":
        return <Education key={s} id={id} />;
      case "contact":
        return <Contact key={s} id={id} cv={cv} />;
    }
  };

  return (
    <>
      <Nav cv={cv} />
      <main>
        <Hero cv={cv} />
        {sectionOrder.map(render)}
      </main>
      <Footer />
      <StatusBar />
    </>
  );
}
