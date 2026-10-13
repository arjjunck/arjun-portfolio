import type { Variant } from "@/content/portfolio";
import IdCard from "./IdCard";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";

export type ResumeLink = { href: string; label: string };

export default function About({ id, number, variant, resumes }: { id: string; number: string; variant: Variant; resumes: ResumeLink[] }) {
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
          <IdCard variant={variant} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
