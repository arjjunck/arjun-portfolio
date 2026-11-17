import Image from "next/image";
import { feed } from "@/content/portfolio";
import Parallax from "./fx/Parallax";
import PhotoReveal from "./fx/PhotoReveal";
import { RevealGroup, RevealItem } from "./fx/Reveal";
import Tilt from "./fx/Tilt";
import Section from "./Section";

// Photos wipe in one after another, drift inside their frames on scroll, tilt toward the pointer and zoom on hover.
export default function Feed({ id }: { id: string }) {
  return (
    <Section id={id} title="Photos" file="~/Pictures/cork">
      <RevealGroup as="ul" className="grid max-w-[600px] grid-cols-2 gap-3 sm:gap-4" stagger={0.12}>
        {feed.map((p) => (
          <RevealItem as="li" key={p.src}>
            <Tilt className="group/photo relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#dde1e6] sm:rounded-[24px]">
              <PhotoReveal className="absolute inset-0 overflow-hidden">
                <Parallax distance={30}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 640px) 300px, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.06]"
                  />
                </Parallax>
              </PhotoReveal>
              <p className="float-card absolute bottom-2 left-2 hidden px-3 py-1 text-[13px] font-semibold sm:block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:-translate-y-1">
                {p.caption}
              </p>
            </Tilt>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
