import Image from "next/image";
import { identity, type Project } from "@/content/portfolio";

// Cards are not clickable as a whole; navigation is only through the buttons at the bottom.
export default function ProjectCard({ project, category, large = false }: { project: Project; category: "software" | "data"; large?: boolean }) {
  const gh = project.links.github;
  const repos = typeof gh === "string" ? [gh] : Array.isArray(gh) ? gh : [];
  const hasLinks = repos.length > 0 || !!project.links.live;

  return (
    <article className={`card flex h-full flex-col p-5 sm:p-6 ${large ? "sm:p-8" : ""}`} data-cat={category}>
      <RepoThumb project={project} repos={repos} large={large} />
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

// GitHub language colours, so the strip reads like a repo's language bar. Unlisted tools fall back to grey.
const langColors: Record<string, string> = {
  React: "#61dafb",
  TypeScript: "#3178c6",
  "ASP.NET Core": "#178600",
  "C#": "#178600",
  PostgreSQL: "#336791",
  Docker: "#384d54",
  "CI/CD": "#2088ff",
  Python: "#3572a5",
  FastAPI: "#009688",
  MCP: "#e8341c",
  PyTorch: "#ee4c2c",
  "scikit-learn": "#f7931e",
  XGBoost: "#189fdd",
  Tableau: "#e97627",
  pandas: "#150458",
  Gradio: "#f97316",
  SQLite: "#0f80cc",
  LSTM: "#c9e04a",
  PCA: "#8250df",
};

// Decorative preview modelled on GitHub's repo social card; the real content is in the card body below.
function RepoThumb({ project, repos, large }: { project: Project; repos: string[]; large: boolean }) {
  const repo = repos[0]?.split("/").pop() ?? project.id;
  const extra = repos.length > 1 ? ` +${repos.length - 1}` : "";
  const { hero } = identity.photo;
  return (
    <div
      className={`thumb -mx-5 -mt-5 mb-5 px-5 pb-6 pt-5 sm:-mx-6 sm:-mt-6 sm:px-6 ${large ? "sm:-mx-8 sm:-mt-8 sm:mb-6 sm:px-8 sm:pb-9 sm:pt-8" : ""}`}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-4">
        <p className={`min-w-0 break-words leading-[1.05] tracking-[-0.03em] ${large ? "text-[1.75rem] sm:text-[2.5rem]" : "text-[1.4rem]"}`}>
          <span className="text-muted">arjjunck/</span>
          <span className="font-semibold">{repo.replace(/-/g, "-\u200b")}</span>
          {extra && <span className="text-muted">{extra}</span>}
        </p>
        <div className={`relative shrink-0 overflow-hidden rounded-[10px] ${large ? "h-14 w-14 sm:h-20 sm:w-20" : "h-11 w-11"}`}>
          <Image src={hero.src} alt="" fill sizes="80px" className="object-cover grayscale" />
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
        {project.stack.slice(0, large ? 4 : 3).map((s) => (
          <li key={s} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColors[s] ?? "var(--ink-muted)" }} />
            {s}
          </li>
        ))}
      </ul>
      <div className="thumb-bar">
        {project.stack.map((s) => (
          <span key={s} style={{ background: langColors[s] ?? "var(--rule)" }} />
        ))}
      </div>
    </div>
  );
}
