"use client";

import type { ReactNode } from "react";
import { useWipe } from "./Wipe";

export default function WipeLink({ href, color, className, children }: { href: string; color: string; className?: string; children: ReactNode }) {
  const go = useWipe();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        go(href, color);
      }}
    >
      {children}
    </a>
  );
}
