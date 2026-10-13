import type { Project } from "@/content/portfolio";

// Cards are not clickable as a whole; navigation is only through the buttons at the bottom.
export default function ProjectCard({ project, category, large = false }: { project: Project; category: "software" | "data"; large?: boolean }) {
  const gh = project.links.github;
  const repos = typeof gh === "string" ? [gh] : Array.isArray(gh) ? gh : [];
  const hasLinks = repos.length > 0 || !!project.links.live;

  return (
    <article className={`card flex h-full flex-col p-5 sm:p-6 ${large ? "sm:p-8" : ""}`} data-cat={category}>
      <p className="mono text-muted">{project.type}</p>
      <h3 className={`mt-2 font-display font-bold tracking-[-0.02em] ${large ? "text-3xl sm:text-4xl" : "text-[1.375rem]"} leading-tight`}>
        {project.title}
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
      <ul className="flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
        {project.stack.map((s, i) => (
          <li key={s} className="tag" style={{ transitionDelay: `${i * 30}ms` }}>
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        {hasLinks ? (
          <ul className="flex flex-wrap gap-2">
            {project.links.live && (
              <li>
                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn px-3 py-2">
                  Live demo <span aria-hidden="true">↗</span>
                  <span className="sr-only"> of {project.title} (opens in new tab)</span>
                </a>
              </li>
            )}
            {repos.map((href, i) => {
              const name = href.split("/").pop();
              return (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={name}
                    className={`btn px-3 py-2 ${project.links.live ? "btn-outline" : ""}`}
                  >
                    <GitHubIcon />
                    {repos.length > 1 ? `GitHub ${i + 1}` : "GitHub"} <span aria-hidden="true">↗</span>
                    <span className="sr-only">: {name} (opens in new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mono text-[11px] text-muted">No public repo</p>
        )}
      </div>
    </article>
  );
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);
