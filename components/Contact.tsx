"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { contact, identity } from "@/content/portfolio";
import { easeOut } from "@/lib/motion";
import Section from "./Section";

export default function Contact({ id, number, resume }: { id: string; number: string; resume: string | null }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = contact.primary_cta.href;
    }
  };

  return (
    <Section id={id} number={number} label="Contact" title={<>Let&apos;s build <span className="accent-serif">something.</span></>}>
      <p className="-mt-4 max-w-2xl text-xl">{contact.text}</p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a href={contact.primary_cta.href} className="display text-[clamp(1.75rem,5vw,3.25rem)] ulink">
          {identity.email}
        </a>
        <div className="relative">
          <button type="button" onClick={copy} className="btn btn-outline h-11 w-11 justify-center p-0" aria-label="Copy email address">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15, ease: easeOut }}
                aria-hidden="true"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                role="status"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="mono absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink px-2 py-1 text-[10px] text-paper"
              >
                Copied
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ul className="mt-10 flex flex-wrap gap-3">
        <li>
          <a href={identity.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={identity.links.github} target="_blank" rel="noreferrer" className="btn btn-outline">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </li>
        {resume && (
          <li>
            <a href={resume} download className="btn">
              Download resume <span aria-hidden="true">↓</span>
            </a>
          </li>
        )}
      </ul>
      <p className="mono mt-8 text-muted">
        {identity.location} · {identity.phone} · Stamp 1G
      </p>
    </Section>
  );
}

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="8" y="8" width="12" height="12" />
    <path d="M16 8V4H4v12h4" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12l5 5 9-10" />
  </svg>
);
