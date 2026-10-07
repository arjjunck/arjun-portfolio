import { projects, skills, variants, type Variant } from "@/content/portfolio";
import ProjectCard from "./ProjectCard";
import { Reveal, RevealItem } from "./Reveal";
import Section from "./Section";
import SkillGroups from "./SkillGroups";

export default function Software({ id, number, variant }: { id: string; number: string; variant: Variant }) {
  const list = projects.software_development;
  // Skills order is variant-specific only on the full stack page.
  const order = variant.key === "fullstack" ? variant.skillsOrder : variants.fullstack.skillsOrder;
  return (
    <Section id={id} number={number} label="Software development" title="Software development">
      <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {list.map((p) => (
          <RevealItem key={p.id} className="h-full">
            <ProjectCard project={p} category="software" large={p.featured} />
          </RevealItem>
        ))}
      </Reveal>
      <SkillGroups groups={skills.software_development} order={order} highlight={variants.fullstack.skillsHighlight} />
    </Section>
  );
}
