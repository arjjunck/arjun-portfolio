"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeInOut, easeOut } from "@/lib/motion";

// Hero illustration: a pixel dino walks through the career story, mechanical engineering → software → data, cloud and RAG.
const scenes = [
  { key: "loading", label: "01 / Loading arjun", ms: 2600 },
  { key: "mech", label: "02 / Mechanical engineering · 2017–21", ms: 3400 },
  { key: "code", label: "03 / Software · 2021–25", ms: 3400 },
  { key: "data", label: "04 / Data · cloud · RAG · 2025–26", ms: 4800 },
] as const;

const U = 5; // pixel size in SVG units
const GROUND = 300;

// Pixel T-rex in the style of the offline-page dino. # = body, o = eye. Two leg frames for walking.
const BODY = [
  ".........#########..",
  "........###########.",
  "........#oo########.",
  "........#oo########.",
  "........###########.",
  "........###########.",
  "........######......",
  "........#########...",
  "#......######.......",
  "#.....#######.......",
  "##...##########.....",
  "###.#########.#.....",
  "############..#.....",
  "############........",
  ".###########........",
  "..##########........",
  "...########.........",
  "....#######.........",
];
const LEGS = [
  [".....###.##.........", ".....##...#.........", ".....#....#.........", ".....##...##........"],
  [".....###.##.........", ".....##..##.........", ".....#..............", ".....##............."],
  [".....###.##.........", ".....#...##.........", "..........#.........", "..........##........"],
];

// One path per colour so adjacent pixels render as a single solid shape, with no hairline seams between squares.
function pixelPath(rows: string[], ch: string, top: number) {
  let d = "";
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      if (row[c] !== ch) {
        c++;
        continue;
      }
      const start = c;
      while (row[c] === ch) c++;
      d += `M${start * U} ${top + r * U}h${(c - start) * U}v${U}h${-(c - start) * U}z`;
    }
  });
  return d;
}

function Dino({ x, walking, hat }: { x: number; walking: boolean; hat: boolean }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!walking) return;
    const id = setInterval(() => setFrame((f) => (f === 1 ? 2 : 1)), 150);
    return () => clearInterval(id);
  }, [walking]);

  const rows = [...BODY, ...LEGS[walking ? frame : 0]];
  const top = GROUND - rows.length * U;
  return (
    <motion.g animate={{ x }} transition={{ duration: 0.9, ease: easeInOut }}>
      <motion.g
        animate={walking ? { y: [0, -2, 0] } : { y: 0 }}
        transition={walking ? { duration: 0.3, repeat: Infinity } : undefined}
      >
        <path d={pixelPath(rows, "#", top)} fill="var(--ink)" shapeRendering="crispEdges" />
        <path d={pixelPath(rows, "o", top)} fill="var(--paper-alt)" shapeRendering="crispEdges" />
        <AnimatePresence>
          {hat && (
            <motion.g
              key="hat"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <rect x={10 * U} y={top - 3 * U} width={8 * U} height={3 * U} fill="var(--accent)" shapeRendering="crispEdges" />
              <rect x={8 * U} y={top - U} width={12 * U} height={U} fill="var(--accent)" shapeRendering="crispEdges" />
            </motion.g>
          )}
        </AnimatePresence>
      </motion.g>
    </motion.g>
  );
}

function gearPath(teeth: number, outer: number, inner: number) {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    for (const [da, r] of [
      [0, inner],
      [step * 0.15, outer],
      [step * 0.45, outer],
      [step * 0.6, inner],
    ] as const) {
      pts.push(`${(Math.cos(a + da) * r).toFixed(2)},${(Math.sin(a + da) * r).toFixed(2)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}

function Gear({ cx, cy, r, teeth, dir = 1, fill = "var(--ink)", speed = 6 }: { cx: number; cy: number; r: number; teeth: number; dir?: 1 | -1; fill?: string; speed?: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <motion.g animate={{ rotate: 360 * dir }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}>
        <path d={gearPath(teeth, r, r * 0.78)} fill={fill} />
        <circle r={r * 0.28} fill="var(--paper-alt)" />
      </motion.g>
    </g>
  );
}

const codeLines = [
  { x: 0, w: 60, accent: true },
  { x: 12, w: 84 },
  { x: 12, w: 50 },
  { x: 24, w: 70, accent: true },
  { x: 12, w: 40 },
  { x: 0, w: 20 },
];

function Laptop({ x, y, typing }: { x: number; y: number; typing: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={130} height={86} rx={6} fill="var(--ink)" />
      <rect x={6} y={6} width={118} height={74} rx={2} fill="var(--paper-alt)" />
      {codeLines.map((l, i) => (
        <motion.rect
          key={i}
          x={14 + l.x}
          y={14 + i * 11}
          height={5}
          rx={2.5}
          fill={l.accent ? "var(--accent)" : "var(--ink)"}
          initial={{ width: typing ? 0 : l.w }}
          animate={{ width: l.w }}
          transition={{ duration: 0.35, delay: typing ? 0.4 + i * 0.32 : 0, ease: "linear" }}
        />
      ))}
      <rect x={-10} y={86} width={150} height={6} rx={3} fill="var(--ink)" />
    </g>
  );
}

// Analytics bars and source documents feed a cloud, which answers in a chat bubble: analytics + cloud + RAG.
const bars = [26, 44, 34, 60];

function DataCloud() {
  const flow = (d: string, delay: number) => (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--accent)"
      strokeWidth={2}
      strokeDasharray="4 6"
      initial={{ opacity: 0, strokeDashoffset: 0 }}
      animate={{ opacity: 1, strokeDashoffset: -40 }}
      transition={{ opacity: { delay, duration: 0.3 }, strokeDashoffset: { delay, duration: 1, repeat: Infinity, ease: "linear" } }}
    />
  );
  return (
    <g>
      {bars.map((h, k) => (
        <motion.rect
          key={k}
          x={128 + k * 14}
          width={10}
          rx={2}
          fill={k === bars.length - 1 ? "var(--accent)" : "var(--ink)"}
          initial={{ y: GROUND, height: 0 }}
          animate={{ y: GROUND - h, height: h }}
          transition={{ duration: 0.6, delay: 0.15 + k * 0.1, ease: easeOut }}
        />
      ))}

      {[0, 1].map((k) => (
        <motion.g
          key={k}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 + k * 0.15, ease: easeOut }}
        >
          <g transform={`translate(${246 + k * 12} ${244 - k * 8})`}>
            <rect width={40} height={52} rx={3} fill="var(--paper-alt)" stroke="var(--ink)" strokeWidth={2} />
            {[10, 18, 26, 34].map((y, l) => (
              <rect key={y} x={7} y={y} width={l === 3 ? 14 : 26} height={3} rx={1.5} fill="var(--ink)" />
            ))}
          </g>
        </motion.g>
      ))}

      {flow("M176 236 C 176 200, 214 190, 214 152", 0.9)}
      {flow("M272 234 C 272 200, 252 190, 252 152", 1)}

      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.06, 1], opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
        style={{ originX: "232px", originY: "126px" }}
      >
        <circle cx={206} cy={128} r={20} fill="var(--ink)" />
        <circle cx={234} cy={112} r={28} fill="var(--ink)" />
        <circle cx={262} cy={128} r={20} fill="var(--ink)" />
        <rect x={206} y={128} width={56} height={22} fill="var(--ink)" />
        <text x={234} y={136} textAnchor="middle" fontFamily="var(--font-jetbrains), monospace" fontSize={14} fill="var(--paper-alt)">
          RAG
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, x: 16, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.4, delay: 1.7, ease: easeOut }}
      >
        <rect x={118} y={62} width={72} height={34} rx={10} fill="var(--accent)" />
        <path d="M176 96 L188 108 L170 96 Z" fill="var(--accent)" />
        <motion.g initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2.8, duration: 0.2 }}>
          {[0, 1, 2].map((k) => (
            <motion.circle
              key={k}
              cx={140 + k * 14}
              cy={79}
              r={3.5}
              fill="var(--paper-alt)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, delay: k * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.g>
        {[{ y: 71, w: 50 }, { y: 82, w: 34 }].map((l, k) => (
          <motion.rect
            key={l.y}
            x={128}
            y={l.y}
            height={4}
            rx={2}
            fill="var(--paper-alt)"
            initial={{ width: 0 }}
            animate={{ width: l.w }}
            transition={{ duration: 0.35, delay: 3 + k * 0.25, ease: "linear" }}
          />
        ))}
      </motion.g>
    </g>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: easeOut },
};

export default function JourneyScene({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  const playing = ready && inView && !reduce;
  const idx = reduce ? scenes.length - 1 : i;
  const scene = scenes[idx].key;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setI((n) => (n + 1) % scenes.length), scenes[i].ms);
    return () => clearTimeout(id);
  }, [i, playing]);

  const dinoX = { loading: 112, mech: 24, code: 16, data: 8 }[scene];

  return (
    <div ref={ref} className="mx-auto w-full max-w-[420px] md:mx-0 md:justify-self-end">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 0.9, ease: easeInOut, delay: 0.2 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-rule bg-paper-alt"
      >
        <svg
          viewBox="0 0 320 400"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Animated story: a pixel dinosaur studies mechanical engineering, moves into software, then works with analytics, cloud and retrieval-augmented AI."
        >
          <line x1={0} x2={320} y1={GROUND} y2={GROUND} stroke="var(--ink)" strokeWidth={2} />
          <motion.g
            animate={scene === "loading" && playing ? { x: [0, -40] } : { x: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 12 }, (_, k) => (
              <rect key={k} x={k * 40 + 6} y={GROUND + 10 + (k % 3) * 6} width={k % 2 ? 4 : 10} height={2} fill="var(--rule)" />
            ))}
          </motion.g>

          <AnimatePresence mode="wait">
            {scene === "loading" && (
              <motion.g key="loading" {...fadeIn}>
                <rect x={60} y={150} width={200} height={10} rx={5} fill="var(--rule)" />
                <motion.rect
                  x={60}
                  y={150}
                  height={10}
                  rx={5}
                  fill="var(--accent)"
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ duration: 2.1, ease: easeInOut }}
                />
              </motion.g>
            )}

            {scene === "mech" && (
              <motion.g key="mech" {...fadeIn}>
                <Gear cx={215} cy={190} r={42} teeth={12} />
                <Gear cx={272} cy={246} r={28} teeth={8} dir={-1} fill="var(--accent)" speed={4} />
                <Gear cx={180} cy={262} r={20} teeth={7} dir={-1} speed={3} />
              </motion.g>
            )}

            {scene === "code" && (
              <motion.g key="code" {...fadeIn}>
                <Laptop x={160} y={200} typing />
                <text x={198} y={170} fontFamily="var(--font-jetbrains), monospace" fontSize={28} fill="var(--ink)">
                  {"</>"}
                </text>
              </motion.g>
            )}

            {scene === "data" && (
              <motion.g key="data" {...fadeIn}>
                <DataCloud />
              </motion.g>
            )}
          </AnimatePresence>

          <Dino x={dinoX} walking={playing && scene === "loading"} hat={scene === "mech"} />
        </svg>

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={scene}
              className="mono text-[11px] text-ink"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
            >
              {scenes[idx].label}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4">
          {scenes.map((s, k) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show scene ${k + 1}: ${s.label.split("/ ")[1]}`}
              aria-current={k === idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${k === idx ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-muted"}`}
            />
          ))}
        </div>
      </motion.div>
      <p className="mono mt-4 text-muted">
        Cork, IE · <span className="text-accent" aria-hidden="true">●</span> Open to work
      </p>
    </div>
  );
}
