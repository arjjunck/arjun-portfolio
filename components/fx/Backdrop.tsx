"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";

// Robotics-bench backdrop: a PCB trace tile and a sparse blueprint layer (crosshairs, gear, hex nut,
// dashed linkages). The two layers scroll at different speeds for depth, and a soft spotlight
// darkens the circuit around the pointer. Fixed, behind content, never interactive.

const trace = (color: string, opacity: number) => {
  const s = `stroke='${color}' stroke-opacity='${opacity}' fill='none' stroke-width='1.2'`;
  const f = `fill='${color}' fill-opacity='${opacity}'`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'>
<g ${s} stroke-linecap='round' stroke-linejoin='round'>
<path d='M0 40H88L118 70H196'/><path d='M40 0V58L70 88V168'/><path d='M280 122H222L192 152V218'/>
<path d='M122 280V232L152 202H240'/><path d='M0 212H38L60 234V280'/><path d='M150 0V30L170 50H250L280 80'/>
<path d='M70 168H96'/><path d='M196 70V100'/><rect x='100' y='112' width='54' height='36' rx='3'/>
<path d='M108 112V104M118 112V104M128 112V104M138 112V104M146 112V104M108 148V156M118 148V156M128 148V156M138 148V156M146 148V156'/>
</g>
<g ${f}><circle cx='196' cy='70' r='3.5'/><circle cx='70' cy='168' r='3.5'/><circle cx='192' cy='218' r='3.5'/><circle cx='240' cy='202' r='3.5'/>
<circle cx='196' cy='100' r='2.5'/><circle cx='96' cy='168' r='2.5'/><circle cx='250' cy='50' r='2.5'/><circle cx='38' cy='212' r='2.5'/></g>
</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const blueprint = (color: string, opacity: number) => {
  const s = `stroke='${color}' stroke-opacity='${opacity}' fill='none' stroke-width='1.2'`;
  const gearTeeth = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const x1 = 470 + Math.cos(a) * 30, y1 = 150 + Math.sin(a) * 30;
    const x2 = 470 + Math.cos(a) * 38, y2 = 150 + Math.sin(a) * 38;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }).join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'>
<g ${s}>
<path d='M90 90h40M110 70v40'/><circle cx='110' cy='90' r='12'/>
<circle cx='470' cy='150' r='30'/><circle cx='470' cy='150' r='10'/><path d='${gearTeeth}'/>
<path d='M150 430l26-15 26 15v30l-26 15-26-15z'/><circle cx='176' cy='445' r='9'/>
<path d='M520 500h40M540 480v40'/><circle cx='540' cy='500' r='12'/>
<path d='M330 300l40 0l20 -34' stroke-dasharray='4 5'/><circle cx='390' cy='266' r='5'/>
<path d='M60 560h120' stroke-dasharray='2 6'/>
</g>
</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const INK = "#121417";

export default function Backdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const near = useTransform(scrollY, (v) => `${reduce ? 0 : -v * 0.18}px`);
  const far = useTransform(scrollY, (v) => `${reduce ? 0 : -v * 0.42}px`);
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const mask = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, #000 0%, transparent 70%)`;

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, mx, my]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* near layer: circuit traces */}
      <motion.div className="absolute inset-0" style={{ backgroundImage: trace(INK, 0.045), backgroundPositionY: near }} />
      {/* far layer: blueprint glyphs, moves faster for depth */}
      <motion.div className="absolute inset-0" style={{ backgroundImage: blueprint(INK, 0.06), backgroundPositionY: far }} />
      {/* pointer spotlight: the same circuit in green, revealed only around the cursor */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: trace(INK, 0.22), backgroundPositionY: near, maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  );
}
