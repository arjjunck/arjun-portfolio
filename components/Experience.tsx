"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experience, formatMonth, type Role } from "@/content/portfolio";
import { easeOut } from "@/lib/motion";
import Section from "./Section";

export default function Experience({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <Section id={id} number={number} label="Experience" title={title}>
      <ol className="relative">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-ink"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        {experience.map((r) => (
          <RoleItem key={r.company} role={r} />
        ))}
      </ol>
    </Section>
  );
}

function RoleItem({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const first = role.highlights.slice(0, 2);
  const rest = role.highlights.slice(2);
  const listId = `more-${role.company.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="relative grid gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border border-ink bg-accent"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />
      <div className="mono text-muted">
        <p className="text-ink">
          {formatMonth(role.start)} – {formatMonth(role.end)}
        </p>
        <p className="mt-1">{role.location}</p>
        <p className="mt-1">{role.domain}</p>
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
          {role.role} <span className="text-muted">· {role.company}</span>
        </h3>
        <ul className="mt-4 space-y-2.5">
          {first.map((h) => (
            <Bullet key={h} text={h} />
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              id={listId}
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="space-y-2.5 overflow-hidden"
            >
              {rest.map((h, i) => (
                <Bullet key={h} text={h} first={i === 0} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        {rest.length > 0 && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((o) => !o)}
            className="mono mt-4 inline-flex items-center gap-2 bg-paper text-ink"
          >
            <motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="inline-block text-base leading-none">
              +
            </motion.span>
            <span className="ulink">{open ? "Less" : `More (${rest.length})`}</span>
          </button>
        )}
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {role.stack.map((s) => (
            <li key={s} className="tag transition-colors duration-150 hover:bg-accent-soft">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

function Bullet({ text, first }: { text: string; first?: boolean }) {
  return (
    <li className={`flex gap-3 ${first ? "pt-2.5" : ""}`}>
      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
      <span>{text}</span>
    </li>
  );
}
