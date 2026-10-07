"use client";

import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { easeInOut } from "@/lib/motion";

// Only visible when the inline head script set html[data-intro] (first visit
// this session, motion allowed). Otherwise it calls onDone immediately.
export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    delete document.documentElement.dataset.intro;
    try {
      sessionStorage.setItem("ak-intro", "1");
    } catch {}
  };

  useEffect(() => {
    if (!document.documentElement.dataset.intro) {
      onDone();
      return;
    }
    const counter = animate(0, 100, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        onDone();
        setLeaving(true);
      },
    });
    // Never let the loader block the page, whatever happens to the animation.
    const safety = setTimeout(() => {
      onDone();
      finish();
    }, 3000);
    return () => {
      counter.stop();
      clearTimeout(safety);
    };
  }, [onDone]);

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ y: leaving ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: easeInOut }}
      onAnimationComplete={() => leaving && finish()}
      className="intro fixed inset-0 z-[70] items-end justify-between bg-paper p-6 sm:p-10"
    >
      <span className="display text-4xl sm:text-6xl">
        AK<span className="text-accent">.</span>
      </span>
      <span className="mono text-muted tabular-nums">{String(count).padStart(3, "0")} / 100</span>
    </motion.div>
  );
}
