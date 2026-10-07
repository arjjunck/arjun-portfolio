"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import IntroLoader from "./IntroLoader";
import { WipeProvider } from "./Wipe";

const IntroContext = createContext(false);
export const useIntroDone = () => useContext(IntroContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const done = useCallback(() => setIntroDone(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <WipeProvider>
          <IntroLoader onDone={done} />
          {children}
        </WipeProvider>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
