import type { ReactNode } from "react";
import { Reveal, RevealText } from "./fx/Reveal";

// Heading on the left, the "file" the section is written as on the right.
export default function Section({ id, title, file, intro, children }: { id: string; title: string; file: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:items-end">
        <h2 id={`${id}-title`} className="display text-[clamp(2.6rem,6.5vw,5.25rem)]">
          <RevealText text={title} />
        </h2>
        <Reveal className="md:justify-self-end md:text-right" delay={0.2}>
          <p className="label inline-block rounded-full bg-panel px-3 py-1 text-ink">{file}</p>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </Reveal>
      </div>
      {children}
    </section>
  );
}
