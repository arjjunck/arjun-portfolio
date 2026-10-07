import type { SkillGroups as Groups } from "@/content/portfolio";
import { Reveal, RevealItem } from "./Reveal";

export default function SkillGroups({ groups, order, highlight }: { groups: Groups; order: string[]; highlight: string[] }) {
  const keys = [...order.filter((k) => groups[k]), ...Object.keys(groups).filter((k) => !order.includes(k))];
  return (
    <Reveal className="mt-16 grid gap-x-10 gap-y-8 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-3">
      {keys.map((k) => (
        <RevealItem key={k}>
          <h3 className="mono mb-3 text-ink">{k}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {groups[k].map((s) => (
              <li key={s} className={`tag transition-colors duration-150 hover:bg-accent-soft ${highlight.includes(s) ? "border-ink" : ""}`}>
                {s}
              </li>
            ))}
          </ul>
        </RevealItem>
      ))}
    </Reveal>
  );
}
