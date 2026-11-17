import { experience, formatMonth } from "@/content/portfolio";
import { Reveal, RevealGroup, RevealItem } from "./fx/Reveal";
import Section from "./Section";

// The query that returns the result rows below; newest first, as the brief asks.
export default function Experience({ id }: { id: string }) {
  return (
    <Section id={id} title="Experience" file="experience.sql">
      <Reveal>
      <p className="code rounded-2xl bg-ink px-5 py-4 text-[14px] text-[#d8dde3]">
        <span className="text-[#cc7832]">SELECT</span> role, company, period, highlights{"\n"}
        <span className="text-[#cc7832]">FROM</span> experience{"\n"}
        <span className="text-[#cc7832]">ORDER BY</span> start_date <span className="text-[#cc7832]">DESC</span>;{"  "}
        <span className="italic text-[#7f848e]">{`-- ${experience.length} rows`}</span>
      </p>
      </Reveal>
      <RevealGroup as="ol" className="mt-4 space-y-4" stagger={0.12}>
        {experience.map((r) => (
          <RevealItem as="li" key={r.company} className="panel lift grid grid-cols-[minmax(0,1fr)] gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
            <div>
              <p className="label">
                {formatMonth(r.start)} to {formatMonth(r.end)}
              </p>
              <h3 className="heading mt-2 text-[26px]">{r.company}</h3>
              <p className="mt-1 text-muted">
                {r.location}, {r.domain.toLowerCase()}
              </p>
            </div>
            <div>
              <p className="heading text-[20px]">{r.role}</p>
              <ul className="mt-3 space-y-2 text-[16px]">
                {r.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                {r.stack.map((s) => (
                  <li key={s} className="rounded-full bg-panel-2 px-3 py-1 font-mono text-[12px]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
