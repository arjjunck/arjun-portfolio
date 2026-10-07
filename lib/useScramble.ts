"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";

// Scrambles text through random characters, settling left to right in ~400ms.
export function useScramble(text: string) {
  const [output, setOutput] = useState(text);
  const frame = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 400;
    const tick = (now: number) => {
      const settled = Math.floor(((now - start) / duration) * text.length);
      setOutput(
        text
          .split("")
          .map((ch, i) => (i < settled || ch === " " || ch === "·" ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
      if (settled < text.length) frame.current = requestAnimationFrame(tick);
      else setOutput(text);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  return { output, run };
}
