"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Counts a leading number up once when it scrolls into view ("200+" -> 0..200 then "+").
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const target = Number(match[1]);
    const c = animate(0, target, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(`${Math.round(v)}${match[2]}`) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
