import { about } from "@/content/portfolio";
import IdCard from "./IdCard";
import JourneyScene from "./JourneyScene";
import { Reveal } from "./fx/Reveal";
import Section from "./Section";

export default function About({ id }: { id: string }) {
  return (
    <Section id={id} title="About" file="README.md">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)_minmax(0,300px)]">
        <Reveal className="panel p-6 sm:p-10 md:col-span-2 lg:col-span-1">
          <p className="code text-com"># About</p>
          <p className="mt-4 max-w-[40rem] text-[19px] leading-[1.6]">{about}</p>
        </Reveal>
        <Reveal delay={0.1} className="panel p-5">
          <JourneyScene ready />
        </Reveal>
        <Reveal delay={0.2} className="panel p-5">
          <IdCard />
        </Reveal>
      </div>
    </Section>
  );
}
