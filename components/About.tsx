import { about } from "@/content/portfolio";
import IdCard from "./IdCard";
import { Reveal } from "./fx/Reveal";
import Section from "./Section";

export default function About({ id }: { id: string }) {
  return (
    <Section id={id} title="About" file="README.md">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-[minmax(0,1fr)_340px]">
        <Reveal className="panel p-6 sm:p-10">
          <p className="code text-com"># About</p>
          <p className="mt-4 max-w-[40rem] text-[20px] leading-[1.55]">{about}</p>
        </Reveal>
        <Reveal delay={0.15} className="panel p-5">
          <IdCard />
        </Reveal>
      </div>
    </Section>
  );
}
