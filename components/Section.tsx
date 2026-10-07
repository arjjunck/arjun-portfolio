import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

export default function Section({
  id,
  number,
  label,
  title,
  children,
  className = "",
}: {
  id: string;
  number: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-rule ${className}`}>
      <div className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading number={number} label={label}>
          <span id={`${id}-title`}>{title}</span>
        </SectionHeading>
        {children}
      </div>
    </section>
  );
}
