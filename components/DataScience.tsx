import { projects, skills, variants, type Variant } from "@/content/portfolio";
import ProjectCard from "./ProjectCard";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";
import SkillGroups from "./SkillGroups";
import WipeLink from "./WipeLink";

export default function DataScience({ id, number, variant }: { id: string; number: string; variant: Variant }) {
  const all = projects.data_science;
  const condensed = variant.dataScienceMode === "condensed";
  const list = condensed ? all.slice(0, 3) : all;
  const ds = variants.data_science;

  return (
    <Section id={id} number={number} label="Data science" title={<>Data science <span className="accent-serif" style={{ color: "var(--teal)" }}>projects</span></>}>
      <p className="-mt-4 mb-10 max-w-2xl text-muted">
        Academic and personal work from my MSc in Data Science and Analytics at MTU (First Class Honours). My professional
        experience is in software engineering.
      </p>
      <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <RevealItem key={p.id} className={`h-full ${!condensed && i === 0 ? "sm:col-span-2" : ""}`}>
            <ProjectCard project={p} category="data" large={!condensed && i === 0} />
          </RevealItem>
        ))}
      </Reveal>
      {condensed ? (
        <p className="mt-10">
          <WipeLink href={ds.route} color="var(--teal)" className="btn btn-outline">
            See all {all.length} data science projects <span aria-hidden="true">→</span>
          </WipeLink>
        </p>
      ) : (
        <SkillGroups groups={skills.data_science} order={ds.skillsOrder} highlight={ds.skillsHighlight} />
      )}
    </Section>
  );
}
