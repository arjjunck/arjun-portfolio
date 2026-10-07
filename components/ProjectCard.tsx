import type { Project } from "@/content/portfolio";

function firstLink(p: Project) {
  const gh = p.links.github;
  if (p.links.live) return { href: p.links.live, label: "Live" };
  if (typeof gh === "string") return { href: gh, label: "GitHub" };
  if (Array.isArray(gh) && gh.length) return { href: gh[0], label: "GitHub" };
  return null;
}

export default function ProjectCard({ project, category, large = false }: { project: Project; category: "software" | "data"; large?: boolean }) {
  const link = firstLink(project);
  const extra = Array.isArray(project.links.github) ? project.links.github.slice(1) : [];
  const Title = (
    <>
      {project.title} {link && <span className="arrow" aria-hidden="true">→</span>}
    </>
  );

  return (
    <article className={`card flex h-full flex-col p-5 sm:p-6 ${large ? "sm:p-8" : ""}`} data-cat={category}>
      <p className="mono text-muted">{project.type}</p>
      <h3 className={`mt-2 font-display font-bold tracking-[-0.02em] ${large ? "text-3xl sm:text-4xl" : "text-[1.375rem]"} leading-tight`}>
        {link ? (
          <a href={link.href} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 focus-visible:outline-none">
            {Title}
            <span className="sr-only"> ({link.label}, opens in new tab)</span>
          </a>
        ) : (
          Title
        )}
      </h3>
      <p className="mt-3 text-muted">{project.summary}</p>
      {large && project.highlights.length > 0 && (
        <ul className="mt-4 space-y-2 text-[15px]">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-[0.6em] h-1 w-3 shrink-0 bg-[var(--c)]" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
        {project.stack.map((s, i) => (
          <li key={s} className="tag" style={{ transitionDelay: `${i * 30}ms` }}>
            {s}
          </li>
        ))}
      </ul>
      {project.links.live && (
        <p className="relative z-10 mt-5 flex flex-wrap gap-2">
          <a href={project.links.live} target="_blank" rel="noreferrer" className="btn px-3 py-2">
            Live demo <span aria-hidden="true">↗</span>
          </a>
          {typeof project.links.github === "string" && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="btn btn-outline px-3 py-2">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </p>
      )}
      {extra.length > 0 && (
        <p className="mono relative z-10 mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
          {extra.map((href) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="ulink text-ink">
              {href.split("/").pop()}
            </a>
          ))}
        </p>
      )}
      {!link && <p className="mono mt-4 text-[11px] text-muted">No public repo</p>}
    </article>
  );
}
