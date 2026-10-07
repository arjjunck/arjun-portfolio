"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { easeOut } from "@/lib/motion";
import { useScramble } from "@/lib/useScramble";

export default function SectionHeading({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const text = `${number} / ${label.toUpperCase()}`;
  const { output, run } = useScramble(text);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);

  return (
    <div ref={ref} className="mb-10 sm:mb-14">
      <p className="mono mb-4 text-muted" onMouseEnter={run} aria-hidden="true">
        {output}
      </p>
      <h2 className="display overflow-hidden pb-[0.08em] text-[clamp(2.25rem,5vw,4rem)]">
        <motion.span
          className="inline-block"
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : undefined}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {children}
        </motion.span>
      </h2>
      <motion.div
        aria-hidden="true"
        className="mt-5 h-px origin-left bg-ink"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
      />
    </div>
  );
}
