"use client";

import { useEffect, useState } from "react";
import { navSections, sectionMeta } from "@/content/portfolio";
import CvMenu from "./CvMenu";

// Black rounded bar: section links left, name centred, CV download right.
export default function Nav({ cv }: { cv: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = navSections.map((s) => sectionMeta[s].id);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-3 z-50 mx-auto max-w-[1240px] px-4 sm:px-6">
      <nav aria-label="Main" className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl bg-ink px-5 text-[14px] text-[#d8dde3]">
        <ul className="hidden items-center gap-6 lg:flex">
          {navSections.map((s) => {
            const { id, nav } = sectionMeta[s];
            return (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`hover:text-white ${active === id ? "text-white underline decoration-2 underline-offset-[6px]" : ""}`}>
                  {nav}
                </a>
              </li>
            );
          })}
        </ul>
        <button type="button" className="justify-self-start lg:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
        <a href="#top" className="heading whitespace-nowrap text-[17px] text-white sm:text-[19px]">
          Arjun Krishna
        </a>
        <div className="justify-self-end">
          <CvMenu align="right" label="CV" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 font-semibold text-ink hover:bg-[#9fd3b5]" />
        </div>
      </nav>
      {open && (
        <ul id="mobile-nav" className="mt-2 grid gap-1 rounded-2xl bg-ink px-5 py-3 text-[15px] text-white lg:hidden">
          {navSections.map((s) => (
            <li key={s}>
              <a href={`#${sectionMeta[s].id}`} onClick={() => setOpen(false)} className="block py-1.5">
                {sectionMeta[s].nav}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
