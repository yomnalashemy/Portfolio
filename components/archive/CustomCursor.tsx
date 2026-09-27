"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import * as React from "react";

/**
 * Small pearl-like ring by default; expands and shows a label near
 * anything with data-cursor="LABEL" (INSPECT / OPEN / WRITE / GO...).
 * Desktop, fine-pointer, motion-safe only.
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

      // The 3D canvas has its own R3F pointer-event hover system (see
      // desk-hover below) — DOM data-cursor lookup would otherwise reset
      // the label to null on every move across the bare canvas element.
      if ((e.target as HTMLElement)?.closest("[data-desk-canvas]")) return;

      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setExpanded(true);
        setLabel(target.getAttribute("data-cursor") || null);
      } else {
        setExpanded(false);
        setLabel(null);
      }
    };
    const onDeskHover = (e: Event) => {
      const detail = (e as CustomEvent<string | null>).detail;
      setExpanded(!!detail);
      setLabel(detail ?? null);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("desk-hover", onDeskHover);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("desk-hover", onDeskHover);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border-2 border-raspberry/60 bg-pearl/70 shadow-[0_2px_10px_rgba(181,31,82,0.25)]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: expanded ? 68 : 11,
        height: expanded ? 68 : 11,
      }}
      transition={{ type: "spring", damping: 22, stiffness: 300 }}
    >
      {label && (
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-raspberry">{label}</span>
      )}
    </motion.div>
  );
}
