"use client";

import * as React from "react";

/** a raspberry glow behind the hero that eases toward the pointer */
export default function HeroGlow() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current?.parentElement;
    const glow = ref.current;
    if (!el || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let tx = 70;
    let ty = 30;
    let x = tx;
    let y = ty;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      glow.style.setProperty("--mx", `${x}%`);
      glow.style.setProperty("--my", `${y}%`);
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />;
}
