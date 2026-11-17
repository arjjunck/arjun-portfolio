"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

// Moves its child vertically as the block scrolls through the viewport. Images are over-scaled
// so the drift never exposes an edge. Off under reduced motion.
export default function Parallax({ children, distance = 60, className = "" }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
