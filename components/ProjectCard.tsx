import Image from "next/image";
import { identity } from "@/content/portfolio";

export type CardProject = {
  id: string;
  title: string;
  type: string;
  summary: string;
  detail: string;
  highlights: string[];
  stack: string[];
  figure?: { value: string; label: string };
  github?: string;
  live?: string;
  more?: string[];
};

// GitHub language colours, so the strip reads like a repo's language bar. Unlisted tools fall back to grey.
const langColors: Record<string, string> = {
  React: "#61dafb",
  TypeScript: "#3178c6",
  "ASP.NET Core": "#178600",
  "C#": "#178600",
  PostgreSQL: "#336791",
  Docker: "#384d54",
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
  Autoencoders: "#a371f7",
  dbt: "#ff694b",
  "Apache Airflow": "#017cee",
  "Apache Kafka": "#231f20",
  "Creo Parametric": "#6cb33f",
  Ansys: "#ffb71b",
  Minitab: "#2e8540",
};

// Cards are not clickable as a whole; navigation is only through the buttons at the bottom.
export default function ProjectCard({ project }: { project: CardProject }) {
  const { github, live, more = [] } = project;
  return (
    <article className="panel lift group/card flex h-full flex-col overflow-hidden">
      <Thumb project={project} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label">{project.type}</p>
        <h4 className="heading mt-1.5 text-[22px]">{project.title}</h4>
        {project.figure && (
          <p className="mt-3">
            <span className="display text-[40px] leading-none">{project.figure.value}</span>
            <span className="label block">{project.figure.label}</span>
          </p>
        )}
        <p className="mt-3 text-[16px] leading-snug">{project.summary}</p>
        <p className="mt-2 text-[15px] text-muted">{project.detail}</p>
        {project.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-[15px]">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full bg-panel-2 px-2.5 py-0.5 font-mono text-[11.5px]">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="btn px-4 py-2 text-[14px]">
              Live demo
              <span className="sr-only"> of {project.title} (opens in new tab)</span>
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className={`btn px-4 py-2 text-[14px] ${live ? "btn-outline" : ""}`}>
              <GitHubIcon />
              GitHub
              <span className="sr-only">: {project.title} (opens in new tab)</span>
            </a>
          )}
          {!live && !github && <span className="text-[14px] text-muted">Report available on request</span>}
          {more.map((href) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="ulink text-[13px]">
              {href.split("/").pop()}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// Decorative preview modelled on GitHub's repo social card; the real content is in the card body.
function Thumb({ project }: { project: CardProject }) {
  const repo = project.github?.split("/").pop();
  const { hero } = identity.photo;
  return (
    <div className="relative bg-panel-2 px-5 pb-6 pt-5 sm:px-6" aria-hidden="true">
      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 break-words text-[1.3rem] leading-[1.1] tracking-[-0.02em]">
          {repo ? (
            <>
              <span className="text-muted">arjjunck/</span>
              <span className="font-semibold">{repo.replace(/-/g, "-​")}</span>
            </>
          ) : (
            <span className="font-semibold">{project.title}</span>
          )}
        </p>
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:rotate-[-4deg] group-hover/card:scale-110">
          <Image src={hero.src} alt="" fill sizes="44px" className="object-cover grayscale" />
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
        {project.stack.slice(0, 3).map((s) => (
          <li key={s} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColors[s] ?? "var(--ink-muted)" }} />
            {s}
          </li>
        ))}
      </ul>
      <div className="absolute inset-x-0 bottom-0 flex h-1.5 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-y-[2.2]">
        {project.stack.map((s) => (
          <span key={s} className="flex-1" style={{ background: langColors[s] ?? "var(--rule)" }} />
        ))}
      </div>
    </div>
  );
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);
