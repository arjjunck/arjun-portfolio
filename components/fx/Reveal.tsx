"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

// Enter: opacity + small rise + blur, once, when 15% of the block is visible.
const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children: wrap a list, give each child <RevealItem>.
export function RevealGroup({ children, className, as = "div", stagger = 0.08 }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol"; stagger?: number }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

// Words rise out of a mask one after another. `onLoad` plays immediately instead of on scroll.
export function RevealText({ text, className, onLoad = false, delay = 0 }: { text: string; className?: string; onLoad?: boolean; delay?: number }) {
  const words = text.split(" ");
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } };
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", filter: "blur(4px)" },
              show: { y: "0%", filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
