"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeOut } from "./Reveal";

// Wipes a photo in from the bottom the first time it is seen, then lets the image settle from a slight zoom.
// The in-view trigger sits on an unclipped wrapper: a fully clipped element never counts as visible.
export default function PhotoReveal({ children, className = "", onLoad = false }: { children: ReactNode; className?: string; onLoad?: boolean }) {
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.2 } };
  return (
    <motion.div className={className} initial="hidden" {...trigger}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: easeOut } } }}
      >
        <motion.div className="absolute inset-0" variants={{ hidden: { scale: 1.12 }, show: { scale: 1, transition: { duration: 1.4, ease: easeOut } } }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
