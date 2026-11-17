import Image from "next/image";
import { certifications, education, formatMonth, identity } from "@/content/portfolio";
import Parallax from "./fx/Parallax";
import PhotoReveal from "./fx/PhotoReveal";
import { Reveal } from "./fx/Reveal";
import Section from "./Section";

export default function Education({ id }: { id: string }) {
  const [msc, btech] = education;
  const photo = identity.photo.graduation;
  return (
    <Section id={id} title="Education" file="education.py">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[20rem] self-start overflow-hidden rounded-[24px] bg-[#dde1e6]">
          <PhotoReveal className="absolute inset-0 overflow-hidden">
            <Parallax distance={36}>
              <Image src={photo.src} alt={photo.alt} fill sizes="320px" className="object-cover object-top" />
            </Parallax>
          </PhotoReveal>
          <p className="float-card absolute bottom-3 left-3 px-3 py-1.5 text-[13px] font-semibold">Conferred 2 October 2026</p>
        </div>

        <Reveal delay={0.15} className="grid content-start gap-4">
          <div className="panel p-6 sm:p-8">
            <p className="label">
              {formatMonth(msc.start)} to {formatMonth(msc.end)}
            </p>
            <h3 className="heading mt-2 text-[clamp(1.5rem,2.6vw,2rem)]">{msc.degree}</h3>
            <p className="mt-1 text-muted">{msc.school}</p>
            <p className="mt-4 inline-block rounded-full bg-ink px-4 py-1.5 text-[15px] font-semibold text-white">{msc.result}</p>
            {"modules" in msc && msc.modules && (
              <>
                <h4 className="label mt-6">Modules</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {msc.modules.map((m) => (
                    <li key={m} className="rounded-full bg-panel-2 px-3 py-1 text-[14px]">
                      {m}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            <div className="panel p-6">
              <p className="label">
                {formatMonth(btech.start)} to {formatMonth(btech.end)}
              </p>
              <h3 className="heading mt-2 text-[20px]">{btech.degree}</h3>
              <p className="mt-1 text-[15px] text-muted">{btech.school}</p>
              <p className="mt-3 text-[15px] font-semibold">{btech.result}</p>
            </div>
            <div className="panel p-6">
              <h3 className="label">Certifications</h3>
              <ul className="mt-3 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="text-[15px] leading-snug">
                    <span className="font-semibold">{c.name}</span>
                    <span className="block text-muted">
                      {c.issuer}
                      {c.status !== "completed" ? `, ${c.status}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
