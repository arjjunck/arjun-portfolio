"use client";

import Image from "next/image";
import { useState } from "react";
import { education, identity, type Variant } from "@/content/portfolio";

const roles: Record<Variant["key"], string> = {
  fullstack: "Full Stack Developer",
  data_science: "Software Engineer · MSc Data Science",
};

// ID card. Flips on hover with a mouse, on tap for touch, and on Enter/Space for keyboard.
export default function IdCard({ variant }: { variant: Variant }) {
  const [flipped, setFlipped] = useState(false);
  const photo = identity.photo.id_card;
  const details: [string, string][] = [
    ["Name", identity.name],
    ["Role", roles[variant.key]],
    ["Based in", identity.location],
    ["Work rights", "Stamp 1G · full-time"],
    ["Experience", "3+ years, healthcare and logistics"],
    ["Education", `${education[0].degree}, ${education[0].result}`],
    ["Email", identity.email],
  ];

  return (
    <div className="mx-auto w-[82%] max-w-[300px] md:mx-0 md:w-full">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? "ID card, showing details. Flip to front." : "ID card. Flip to show details."}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        onClick={(e) => {
          // Mouse users flip by hovering; taps and keyboard toggle.
          const hoverCapable = window.matchMedia("(hover: hover)").matches;
          if (!hoverCapable || e.detail === 0) setFlipped((f) => !f);
        }}
        className="idcard block aspect-[5/7] w-full cursor-pointer text-left"
        data-flipped={flipped}
      >
        <span className="idcard-inner relative block h-full w-full">
          {/* Front */}
          <span className="idcard-face absolute inset-0 flex flex-col border border-ink bg-paper" aria-hidden={flipped}>
            <span className="flex items-center justify-between border-b border-ink bg-ink px-4 py-2.5 text-paper">
              <span className="display text-lg">
                AK<span className="text-accent">.</span>
              </span>
              <span className="mono text-[10px]">ID · 2026</span>
            </span>
            <span className="mx-4 mt-4 flex min-h-0 flex-1 justify-center">
              <span className="relative block aspect-[3/4] h-full overflow-hidden border border-ink bg-paper-alt">
                <Image src={photo.src} alt={photo.alt} fill sizes="200px" className="object-cover grayscale" />
              </span>
            </span>
            <span className="block px-4 pb-4 pt-3">
              <span className="display block text-2xl">{identity.display_name}</span>
              <span className="mono mt-1.5 block text-[10px] text-muted">{roles[variant.key]}</span>
              <span className="mt-3 flex items-end justify-between">
                <Barcode />
                <span className="mono text-[10px] text-accent">Flip ↻</span>
              </span>
            </span>
          </span>

          {/* Back */}
          <span className="idcard-face idcard-back absolute inset-0 flex flex-col border border-ink bg-paper-alt" aria-hidden={!flipped}>
            <span className="flex items-center justify-between border-b border-ink bg-accent px-4 py-2.5 text-paper">
              <span className="mono text-[10px]">Basic details</span>
              <span className="mono flex items-center gap-1.5 text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-paper" /> Open to work
              </span>
            </span>
            <span className="flex flex-1 flex-col justify-between px-4 py-3">
              {details.map(([k, v]) => (
                <span key={k} className="block border-b border-rule pb-1.5 last:border-0">
                  <span className="mono block text-[9px] text-muted">{k}</span>
                  <span className="block text-[13px] font-medium leading-snug">{v}</span>
                </span>
              ))}
            </span>
          </span>
        </span>
      </button>
      <p className="mono mt-4 text-center text-[11px] text-muted md:text-left">
        <span className="hidden [@media(hover:hover)]:inline">Hover the card</span>
        <span className="[@media(hover:hover)]:hidden">Tap the card</span> for details
      </p>
    </div>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2];
  return (
    <span className="flex h-6 items-stretch gap-[2px]" aria-hidden="true">
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w }} />
      ))}
    </span>
  );
}
