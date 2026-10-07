"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navSections, sectionMeta, variants, type Variant, type VariantKey } from "@/content/portfolio";
import { spring } from "@/lib/motion";
import { useWipe } from "./Wipe";

const switchColors: Record<VariantKey, string> = { fullstack: "var(--orange)", data_science: "var(--teal)" };

export default function Nav({ variant, resume }: { variant: Variant; resume: string | null }) {
  const go = useWipe();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Nav follows this variant's section order.
  const links = variant.sectionOrder.filter((s): s is (typeof navSections)[number] => (navSections as string[]).includes(s));

  // Track which section is in the middle band of the viewport; the last one wins at page bottom.
  useEffect(() => {
    const ids = links.map((s) => sectionMeta[s].id);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(ids[ids.length - 1]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant.key]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled ? "border-rule bg-paper/80 backdrop-blur-md" : "border-transparent bg-paper"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={variant.route} className="display text-xl" aria-label="Arjun Krishna, home">
          AK<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((s) => {
            const { id, nav } = sectionMeta[s];
            return (
              <li key={id} className="relative">
                <a href={`#${id}`} className="mono relative block px-3 py-2 text-ink">
                  <span className="roll">
                    <span>{nav}</span>
                    <span aria-hidden="true">{nav}</span>
                  </span>
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={spring}
                      className="absolute inset-x-3 -bottom-px h-[2px] bg-accent"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div role="group" aria-label="Site version" className="flex border border-ink bg-paper">
            {(Object.keys(variants) as VariantKey[]).map((k) => {
              const on = k === variant.key;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => !on && go(variants[k].route, switchColors[k])}
                  className={`mono relative px-2.5 py-1.5 text-[11px] sm:px-3 ${on ? "text-paper" : "bg-paper text-ink hover:bg-accent-soft"}`}
                >
                  {on && (
                    <motion.span layoutId="variant-pill" transition={spring} className="absolute inset-0 bg-ink" />
                  )}
                  <span className="relative">{variants[k].label}</span>
                </button>
              );
            })}
          </div>
          {resume && (
            <a href={resume} download className="btn btn-outline hidden px-3 py-2 sm:inline-flex">
              Resume
            </a>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
