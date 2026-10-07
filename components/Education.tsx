import { education, formatMonth } from "@/content/portfolio";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";

export default function Education({ id, number }: { id: string; number: string }) {
  return (
    <Section id={id} number={number} label="Education" title="Education">
      <Reveal className="grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <RevealItem key={e.degree} as="article" className="border border-ink p-6 sm:p-8">
            <p className="mono text-muted">
              {formatMonth(e.start)} – {formatMonth(e.end)}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">{e.degree}</h3>
            <p className="mt-1 text-muted">{e.school}</p>
            <p className="display mt-6 text-3xl text-accent sm:text-4xl">{e.result}</p>
            {"modules" in e && e.modules && (
              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Modules">
                {e.modules.map((m) => (
                  <li key={m} className="tag">
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
