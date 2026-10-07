"use client";

import { animate, motion, useInView, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { identity, type Stat, type Variant } from "@/content/portfolio";
import { easeInOut, easeOut } from "@/lib/motion";
import { useScramble } from "@/lib/useScramble";
import { useIntroDone } from "./Providers";

export default function Hero({ variant }: { variant: Variant }) {
  const ready = useIntroDone();
  const eyebrow = useScramble(variant.hero.eyebrow);
  const { run } = eyebrow;

  useEffect(() => {
    if (ready) run();
  }, [ready, run]);

  const lines: ReactNode[] = [
    "Arjun",
    "Krishna",
    <span key="accent" className="accent-serif inline-block pr-2 text-[0.92em]">
      {variant.hero.accentWord}
    </span>,
  ];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.5, ease: easeOut, delay },
  });

  return (
    <section id="top" aria-label="Introduction" className="mx-auto max-w-[1120px] px-4 pb-14 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-14">
        <div>
          <p className="mono mb-5 text-muted" onMouseEnter={run} aria-label={variant.hero.eyebrow}>
            <span aria-hidden="true">{eyebrow.output}</span>
          </p>

          <h1 className="display text-[clamp(3.25rem,9vw,7rem)]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", skewX: i === 2 ? -4 : 0 }}
                  animate={ready ? { y: "0%", skewX: 0 } : undefined}
                  transition={{ duration: 0.75, ease: easeOut, delay: 0.07 * i + (i === 2 ? 0.08 : 0) }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-xl font-medium leading-snug sm:text-2xl">
            {variant.hero.headline}
          </motion.p>
          <motion.p {...fade(0.36)} className="mt-3 max-w-xl text-muted">
            {variant.hero.tagline}
          </motion.p>

          {variant.heroBadge && (
            <motion.p {...fade(0.4)} className="mono mt-5 inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {variant.heroBadge}
            </motion.p>
          )}

          <motion.div {...fade(0.44)} className="mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <a href={variant.key === "data_science" ? "#data-science" : "#software"} className="btn">
                See my work <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-outline">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <Portrait ready={ready} />
      </div>

      <Stats stats={variant.stats} ready={ready} />
    </section>
  );
}

function Portrait({ ready }: { ready: boolean }) {
  const { hero } = identity.photo;
  return (
    <div className="order-first w-[70%] max-w-[420px] md:order-none md:w-full md:justify-self-end">
      <div className="group relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[10px] group-hover:translate-y-[10px]"
        />
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
          transition={{ duration: 0.9, ease: easeInOut, delay: 0.2 }}
          className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-alt transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 768px) 420px, 70vw"
            className="object-cover grayscale transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>
      <p className="mono mt-4 text-muted">
        Cork, IE · <span className="text-accent" aria-hidden="true">●</span> Open to work
      </p>
    </div>
  );
}

function Stats({ stats, ready }: { stats: Stat[]; ready: boolean }) {
  return (
    <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-rule pt-8 sm:grid-cols-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.5 + i * 0.06 }}
          className="flex flex-col-reverse gap-2"
        >
          <dt className="mono text-muted">{s.label}</dt>
          <dd className="display text-[clamp(2.5rem,5vw,3.75rem)]">
            <CountUp value={s.value} start={ready} />
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}

function CountUp({ value, start }: { value: string; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match || !start || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const target = Number(match[1]);
    const c = animate(0, target, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setShown(`${Math.round(v)}${match[2]}`),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, inView, value]);

  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

// Drifts up to 6px toward the pointer; fine pointers only.
function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.span
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        x.set(dx * 6);
        y.set(dy * 6);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
