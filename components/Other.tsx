import { other } from "@/content/portfolio";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";

export default function Other({ id, number }: { id: string; number: string }) {
  return (
    <Section id={id} number={number} label="Other" title="Beyond the code">
      <p className="-mt-4 mb-10 max-w-2xl text-muted">{other.intro}</p>
      <Reveal as="ul" className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {other.items.map((it) => (
          <RevealItem as="li" key={it.title} className="group bg-paper p-6 transition-colors duration-200 hover:bg-paper-alt">
            <h3 className="font-display text-xl font-bold tracking-[-0.02em]">
              <span className="mr-2 inline-block h-2 w-2 bg-muted transition-colors duration-200 group-hover:bg-accent" aria-hidden="true" />
              {it.title}
            </h3>
            <p className="mt-2 text-[15px] text-muted">
              {it.detail}{" "}
              {"link" in it && it.link && (
                <a href={it.link} target="_blank" rel="noreferrer" className="ulink text-ink">
                  See repo
                </a>
              )}
            </p>
          </RevealItem>
        ))}
      </Reveal>

      <h3 className="mono mb-4 mt-14 text-ink">Certifications</h3>
      <Reveal as="ul" className="divide-y divide-rule border-y border-rule">
        {other.certifications.map((c) => (
          <RevealItem as="li" key={c.name} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="font-medium">
              {c.name} <span className="text-muted">· {c.issuer}</span>
            </span>
            <span className={`mono shrink-0 text-[11px] ${c.status === "completed" ? "text-muted" : "text-accent"}`}>{c.status}</span>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
