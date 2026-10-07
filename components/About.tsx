import Image from "next/image";
import { identity, type Variant } from "@/content/portfolio";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";

export type ResumeLink = { href: string; label: string };

export default function About({ id, number, variant, resumes }: { id: string; number: string; variant: Variant; resumes: ResumeLink[] }) {
  const photo = identity.photo.about;
  return (
    <Section id={id} number={number} label="About" title="About me">
      <Reveal className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-16">
        <RevealItem>
          <p className="max-w-2xl text-xl leading-relaxed sm:text-[1.375rem]">{variant.about}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Core skills">
            {variant.skillsHighlight.map((s) => (
              <li key={s} className="tag border-ink bg-accent-soft">
                {s}
              </li>
            ))}
          </ul>
          <dl className="mono mt-10 grid gap-x-8 gap-y-3 text-muted sm:grid-cols-2">
            <div>
              <dt className="text-ink">Based in</dt>
              <dd>{identity.location}</dd>
            </div>
            <div>
              <dt className="text-ink">Work rights</dt>
              <dd>Stamp 1G · full-time</dd>
            </div>
          </dl>
          {resumes.length > 0 && (
            <div className="mt-10 border-t border-rule pt-8">
              <h3 className="mono text-ink">Resume</h3>
              <p className="mt-2 text-muted">
                {resumes.length > 1 ? "Two versions as PDF. Pick the one that fits the role." : "Download as PDF."}
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {resumes.map((r, i) => (
                  <li key={r.href}>
                    <a href={r.href} download className={`btn ${i === 0 ? "" : "btn-outline"}`}>
                      {r.label} resume <span aria-hidden="true">↓</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </RevealItem>
        <RevealItem>
          <figure className="group w-[70%] max-w-[300px] md:w-full">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[8px] group-hover:translate-y-[8px]"
              />
              <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-alt transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 300px, 70vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
            </div>
            <figcaption className="mono mt-3 text-muted">{photo.caption}</figcaption>
          </figure>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
