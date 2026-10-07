import { marquee } from "@/content/portfolio";

export default function Marquee() {
  const row = (dup: boolean) => (
    <ul className={`flex shrink-0 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup || undefined}>
      {marquee.map((m) => (
        <li key={m} className="mono px-5 py-3 text-ink transition-colors duration-150 hover:text-accent">
          {m}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-rule" aria-label="Tech stack">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
