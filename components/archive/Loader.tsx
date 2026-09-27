"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

const STEPS = ["INITIALIZING ARCHIVE...", "LOADING PARTICLES...", "SYSTEM READY"];
const STEP_MS = 420; // 3 steps ≈ 1.26s, under the ~1.5s budget

export default function Loader() {
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), i * STEP_MS));
    const finish = setTimeout(() => setDone(true), STEPS.length * STEP_MS + 250);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
        >
          <p className="label-tech text-bone">{STEPS[step]}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
