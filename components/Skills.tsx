import { skills } from "@/content/portfolio";
import { Reveal } from "./fx/Reveal";
import Section from "./Section";

// Skills as the config file a .NET developer would recognise.
export default function Skills({ id }: { id: string }) {
  return (
    <Section id={id} title="Skills" file="appsettings.json">
      <Reveal className="panel overflow-hidden">
        <p className="label border-b border-rule px-6 py-3">appsettings.json</p>
        <pre className="code grid grid-cols-[minmax(0,1fr)] gap-x-10 p-6 text-[14px] sm:p-8 lg:grid-cols-2">
          {[0, 1].map((col) => (
            <code key={col} className="block">
              {col === 0 ? "{\n" : "\n"}
              {skills
                .filter((_, i) => (i < Math.ceil(skills.length / 2) ? 0 : 1) === col)
                .map(({ group, items }) => (
                  <span key={group} className="block">
                    {"  "}
                    <span className="t">&quot;{group}&quot;</span>: [{"\n"}
                    {items.map((s, i) => (
                      <span key={s}>
                        {"    "}
                        <span className="s">&quot;{s}&quot;</span>
                        {i < items.length - 1 ? ",\n" : "\n"}
                      </span>
                    ))}
                    {"  ],\n"}
                  </span>
                ))}
              {col === 1 ? "}" : ""}
            </code>
          ))}
        </pre>
      </Reveal>
    </Section>
  );
}
