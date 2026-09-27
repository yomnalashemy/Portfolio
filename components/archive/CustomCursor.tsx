"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import * as React from "react";

/**
 * Desktop-only ring cursor. Any element with data-cursor="label" expands
 * the ring and shows that label (e.g. "INSPECT", "OPEN FILE") instead of
 * needing a bespoke hover handler per interactive element.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.4 });

  React.useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);

      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setExpanded(true);
        setLabel(target.getAttribute("data-cursor") || null);
      } else {
        setExpanded(false);
        setLabel(null);
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border border-bone/70 mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: expanded ? 72 : 14,
        height: expanded ? 72 : 14,
      }}
      transition={{ type: "spring", damping: 22, stiffness: 300 }}
    >
      {label && (
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-bone">{label}</span>
      )}
    </motion.div>
  );
}
