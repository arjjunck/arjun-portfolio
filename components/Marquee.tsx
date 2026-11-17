import { marquee } from "@/content/portfolio";

// Tech strip under the hero: loops right to left, pauses on hover, wraps into a static list under reduced motion.
export default function Marquee() {
  const row = (dup: boolean) => (
    <ul className={`flex shrink-0 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {marquee.map((m) => (
        <li key={m} className="px-5 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-ink transition-colors duration-150 hover:text-cta">
          {m}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-rule bg-paper/70 backdrop-blur-[2px]" aria-label="Tech stack">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
