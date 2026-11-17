"use client";

import { motion } from "motion/react";
import { useState } from "react";

const NAME = "Arjun Krishna.";

// Big name sign-off from the earlier version: letters lift and turn orange-red as the pointer passes.
// Sized in container units so the name always fills exactly one line of the footer.
export default function Footer() {
  const [hover, setHover] = useState<number | null>(null);
  const lift = (i: number) => {
    if (hover === null) return 0;
    const d = Math.abs(hover - i);
    return d === 0 ? -8 : d === 1 ? -4 : 0;
  };

  return (
    <footer className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6">
      <div className="@container border-t-2 border-ink pt-10">
        <p className="display select-none whitespace-nowrap text-[10.1cqw] leading-[0.9]" aria-label={NAME} onMouseLeave={() => setHover(null)}>
          {NAME.split(" ").map((word, w, words) => {
            // Letters animate one by one, but each word stays on one line.
            const offset = words.slice(0, w).reduce((n, x) => n + x.length + 1, 0);
            return (
              <span key={word} className="inline-block whitespace-nowrap">
                {word.split("").map((ch, j) => {
                  const i = offset + j;
                  return (
                    <motion.span
                      key={i}
                      aria-hidden="true"
                      className={`inline-block ${hover === i ? "text-[#e8341c]" : ""}`}
                      animate={{ y: lift(i) }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      onMouseEnter={() => setHover(i)}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
                {w < words.length - 1 && <span className="inline-block w-[0.3em]" aria-hidden="true" />}
              </span>
            );
          })}
        </p>
        <div className="mt-8 flex flex-wrap justify-between gap-3 text-[14px] text-muted">
          <span>© {new Date().getFullYear()} Arjun Krishna Krishnakumar, Cork, Ireland</span>
          <span>Built with Next.js, Tailwind and Motion</span>
        </div>
      </div>
    </footer>
  );
}
