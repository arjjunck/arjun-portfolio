"use client";

import { motion } from "motion/react";
import { useState } from "react";

const NAME = "Arjun Krishna.";

export default function Footer() {
  const [hover, setHover] = useState<number | null>(null);
  const lift = (i: number) => {
    if (hover === null) return 0;
    const d = Math.abs(hover - i);
    return d === 0 ? -6 : d === 1 ? -3 : 0;
  };

  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-[1120px] px-4 pb-24 pt-14 sm:px-6 sm:pb-10">
        <p className="display select-none text-[clamp(3rem,13vw,10rem)] leading-[0.9]" aria-label={NAME} onMouseLeave={() => setHover(null)}>
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={`inline-block ${hover === i ? "text-accent" : ""}`}
              animate={{ y: lift(i) }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onMouseEnter={() => setHover(i)}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </p>
        <div className="mono mt-8 flex flex-wrap justify-between gap-3 text-muted sm:pr-16">
          <span>© {new Date().getFullYear()} Arjun Krishna Krishnakumar</span>
          <span>Built with Next.js, Tailwind and Motion</span>
        </div>
      </div>
    </footer>
  );
}
