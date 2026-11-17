"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { identity } from "@/content/portfolio";

// "Download CV" opens a short list: pick the role, get the CV written for it.
// The menu grows from the button's corner; Escape or an outside click closes it.
export default function CvMenu({ className = "btn", label = "Download CV", align = "left" }: { className?: string; label?: string; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className={className}>
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
            className={`absolute z-50 mt-2 w-64 rounded-2xl bg-panel p-2 text-left text-ink shadow-[0_24px_50px_-20px_rgb(18_20_23/0.45)] ring-1 ring-black/5 ${align === "right" ? "right-0" : "left-0"}`}
          >
            <li className="label px-3 pb-1 pt-1.5">Pick the role you are hiring for</li>
            {identity.cvs.map((cv) => (
              <li key={cv.file}>
                <a
                  href={cv.file}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold hover:bg-panel-2"
                >
                  {cv.label}
                  <span className="label">PDF</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
