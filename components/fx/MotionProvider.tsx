"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Honour the OS reduced-motion setting for every Motion animation on the page.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
