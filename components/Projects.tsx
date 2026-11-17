import Image from "next/image";
import { interest, moreProjects, projects, type Project } from "@/content/portfolio";
import { Reveal, RevealGroup, RevealItem } from "./fx/Reveal";
import Tilt from "./fx/Tilt";
import ProjectCard, { type CardProject } from "./ProjectCard";
import Section from "./Section";

// Order is deliberate (docs/portfolio-brief.md 5.3): flagship first, then the MSc and BTech work, then the rest.
export default function Projects({ id }: { id: string }) {
  const [flagship, ...featured] = projects;
  const groups: { group: string; items: CardProject[] }[] = [
    {
      group: "MSc and BTech projects",
      items: featured.map((p) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        summary: p.summary,
        detail: p.what,
        highlights: p.highlights,
        stack: p.stack,
        figure: p.figure,
        github: p.links.github,
        live: p.links.live,
      })),
    },
    ...moreProjects.map(({ group, items }) => ({
      group,
      items: items.map((p) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        summary: p.summary,
        detail: p.detail,
        highlights: [],
        stack: p.stack,
        github: p.links.github,
        more: p.links.more,
      })),
    })),
  ];

  return (
    <Section id={id} title="Projects" file="projects.tsx" intro="Every project links to its code or to a running app.">
      <Reveal>
        <Flagship project={flagship} />
      </Reveal>
      {groups.map(({ group, items }) => (
        <div key={group} className="mt-12">
          <Reveal>
            <h3 className="heading text-[clamp(1.5rem,2.6vw,2rem)]">{group}</h3>
          </Reveal>
          <RevealGroup as="ul" className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <RevealItem as="li" key={p.id} className="h-full">
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      ))}
      <p className="code mt-8 text-com">{`// ${interest}`}</p>
    </Section>
  );
}

function Flagship({ project }: { project: Project }) {
  const { live, github } = project.links;
  return (
    <article className="panel grid grid-cols-[minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="relative bg-panel-2 p-3 sm:p-4">
        {project.image && (
          <Tilt className="relative aspect-[16/10] overflow-hidden rounded-[18px] shadow-[0_20px_40px_-24px_rgb(18_20_23/0.4)]">
            <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover object-top" />
          </Tilt>
        )}
        <p className="float-card absolute bottom-7 left-7 flex items-center gap-2 px-4 py-2 text-[14px] font-semibold">
          <span className="h-2.5 w-2.5 rounded-full bg-live" aria-hidden="true" />
          Live on Azure
        </p>
      </div>
      <div className="flex flex-col p-6 sm:p-9">
        <p className="label">{project.type}</p>
        <h3 className="heading mt-2 text-[clamp(1.9rem,3.2vw,2.6rem)]">{project.title}</h3>
        <p className="mt-4 text-[18px] leading-snug">{project.summary}</p>
        <p className="mt-3 text-muted">{project.what}</p>
        <ul className="mt-5 space-y-2 text-[15px]">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <p className="code mt-5 rounded-xl bg-panel-2 p-3 text-[12.5px]">
          <span className="k">const</span> stack = [
          {project.stack.map((s, i) => (
            <span key={s}>
              <span className="s">&quot;{s}&quot;</span>
              {i < project.stack.length - 1 ? ", " : ""}
            </span>
          ))}
          ];
        </p>
        <p className="mt-auto flex flex-wrap gap-3 pt-7">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="btn">
              Open the live app
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="btn btn-outline">
              View code
              <span className="sr-only"> on GitHub (opens in new tab)</span>
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
