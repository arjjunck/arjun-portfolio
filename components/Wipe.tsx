"use client";

import { motion, useAnimationControls } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { easeInOut } from "@/lib/motion";

type Go = (href: string, color: string) => void;
const WipeContext = createContext<Go>(() => {});
export const useWipe = () => useContext(WipeContext);

// Colour panel that sweeps across when switching between site variants.
export function WipeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimationControls();
  const [color, setColor] = useState("var(--orange)");
  const covering = useRef(false);

  const go = useCallback<Go>(
    async (href, nextColor) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      setColor(nextColor);
      covering.current = true;
      controls.set({ clipPath: "inset(0 100% 0 0)", visibility: "visible" });
      await controls.start({ clipPath: "inset(0 0% 0 0)", transition: { duration: 0.35, ease: easeInOut } });
      router.push(href);
    },
    [controls, router]
  );

  useEffect(() => {
    if (!covering.current) return;
    covering.current = false;
    controls
      .start({ clipPath: "inset(0 0 0 100%)", transition: { duration: 0.35, ease: easeInOut, delay: 0.05 } })
      .then(() => controls.set({ visibility: "hidden" }));
  }, [pathname, controls]);

  return (
    <WipeContext.Provider value={go}>
      {children}
      <motion.div
        aria-hidden="true"
        animate={controls}
        initial={{ visibility: "hidden" }}
        className="pointer-events-none fixed inset-0 z-[65]"
        style={{ background: color }}
      />
    </WipeContext.Provider>
  );
}
