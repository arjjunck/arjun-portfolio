import Image from "next/image";
import { contact, hero, identity } from "@/content/portfolio";
import CvMenu from "./CvMenu";
import CountUp from "./fx/CountUp";
import Parallax from "./fx/Parallax";
import PhotoReveal from "./fx/PhotoReveal";
import { Reveal, RevealGroup, RevealItem, RevealText } from "./fx/Reveal";

export default function Hero({ cv }: { cv: string }) {
  const photo = identity.photo.about; // side portrait, crops well into a wide panel
  const stats = [
    { value: "3+", label: "years of commercial software engineering" },
    { value: "200+", label: "hospital sites running clinical systems I built and supported" },
    { value: "20", label: "person Agile team I ran CI/CD for, releasing twice a week" },
  ];

  return (
    <section id="top" aria-label="Introduction" className="mx-auto max-w-[1240px] px-4 pb-10 pt-12 sm:px-6 sm:pt-16">
      <p className="code text-com" aria-hidden="true">
        <span className="k">public class</span> <span className="t">SoftwareEngineer</span> {"{ "}Console.<span className="t">WriteLine</span>(<span className="s">&quot;Hello, Ireland!&quot;</span>); {"}"}
      </p>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-end">
        <div>
          <h1 className="display text-[clamp(1.85rem,8.4vw,5.25rem)]" aria-label="Arjun Krishna Krishnakumar">
            <RevealText text="Arjun Krishna" onLoad className="block" />
            <span className="block whitespace-nowrap">
              <RevealText text="Krishnakumar" onLoad delay={0.15} />
            </span>
          </h1>
          <Reveal delay={0.35}>
          <p className="heading mt-5 text-[clamp(1.3rem,2.4vw,1.75rem)]">
            {identity.title}, <span className="tbox">C# / .NET</span>, Angular, PostgreSQL, Python
          </p>
          </Reveal>
        </div>
        <Reveal delay={0.5} className="relative z-20">
          <p className="text-[18px] leading-snug">{hero.subline}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CvMenu />
            <a href={contact.primary_cta.href} className="btn btn-outline">
              Email me
            </a>
          </div>
          <p className="mt-4 flex gap-5 text-[15px] font-semibold">
            <a href={identity.links.linkedin} target="_blank" rel="noreferrer" className="ulink">
              LinkedIn
            </a>
            <a href={identity.links.github} target="_blank" rel="noreferrer" className="ulink">
              GitHub
            </a>
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.25}>
      <div className="panel mt-10 grid grid-cols-[minmax(0,1fr)] overflow-hidden sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="flex flex-col justify-between gap-8 bg-panel-2 p-6 sm:p-10">
          <p className="float-card flex w-fit items-center gap-2 px-4 py-2.5 text-[14px] font-semibold">
            <span className="h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
            Open to roles in Ireland
          </p>
          <Reveal delay={0.9} className="float-card p-5 sm:p-7">
            <p className="label mb-3">SoftwareEngineer.cs</p>
            <p className="code text-[14px] sm:text-[15px]">
              <span className="k">public record</span> <span className="t">Arjun</span>({"\n"}
              {"    "}<span className="k">string</span> Location = <span className="s">&quot;Cork, Ireland&quot;</span>,{"\n"}
              {"    "}<span className="k">string</span> Visa = <span className="s">&quot;Stamp 1G&quot;</span>,{"\n"}
              {"    "}<span className="k">string</span> Permit = <span className="s">&quot;Critical Skills&quot;</span>,{"\n"}
              {"    "}<span className="k">int</span> YearsCommercial = <span className="n">3</span>,{"\n"}
              {"    "}<span className="k">string</span>[] Stack = [{"\n"}
              {hero.stack_rows.map((row, r) => (
                <span key={r}>
                  {"        "}
                  {row.map((t, i) => (
                    <span key={t}>
                      <span className="s">&quot;{t}&quot;</span>
                      {r < hero.stack_rows.length - 1 || i < row.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {"\n"}
                </span>
              ))}
              {"    "}]{"\n"}
              );
            </p>
          </Reveal>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] bg-[#dde1e6] sm:mx-0 sm:aspect-auto sm:h-full sm:min-h-[380px] sm:max-w-none">
          <PhotoReveal onLoad className="absolute inset-0 overflow-hidden">
            <Parallax distance={40}>
              <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 540px, 100vw" className="object-cover object-[50%_20%] grayscale" />
            </Parallax>
          </PhotoReveal>
        </div>
      </div>

      </Reveal>

      <RevealGroup as="ul" className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem as="li" key={s.value} className="panel lift p-6">
            <p className="display text-[56px] leading-none">
              <CountUp value={s.value} />
            </p>
            <p className="mt-3 text-[15px] text-muted">{s.label}</p>
          </RevealItem>
        ))}
        <RevealItem as="li" className="lift flex flex-col justify-between rounded-[24px] bg-ink p-6 text-white">
          <p className="label text-[#9aa3ad]">Work permit</p>
          <p className="heading mt-3 text-[22px]">{identity.work_authorization}</p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
