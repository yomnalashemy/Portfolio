"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

const NOTES = [
  {
    tag: "CURRENT HYPOTHESIS",
    body: "Financial-crime patterns are anomaly-detection problems wearing a compliance costume.",
    stamp: "IN PROGRESS",
  },
  {
    tag: "CURRENT EXPERIMENT",
    body: "Wiring a scikit-learn SVM into a Node/Python pipeline for early lupus-risk screening.",
    stamp: "CURRENT",
  },
  {
    tag: "CURRENT OBSESSION",
    body: "CEH v13 — three modules in, going for the full certification.",
    stamp: "CURRENT",
  },
  {
    tag: "THINGS I'M BREAKING",
    body: "Whatever's slowest in a KYB pipeline, until it isn't.",
    stamp: "ARCHIVED",
  },
];

const STAMP_COLOR: Record<string, string> = {
  ARCHIVED: "#72747C",
  "IN PROGRESS": "#D9B66F",
  CURRENT: "#B51F52",
};

const TERMINAL_LINE = "tail -f ./currently-breaking.log";

function LabTerminal() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = React.useState(reduced ? TERMINAL_LINE : "");

  React.useEffect(() => {
    if (reduced) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(TERMINAL_LINE.slice(0, i));
      if (i >= TERMINAL_LINE.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-espresso/15 bg-espresso shadow-[0_20px_45px_-26px_rgba(50,27,36,0.5)]">
      <div className="flex items-center gap-1.5 border-b border-pearl/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-cherry" />
        <span className="size-2.5 rounded-full bg-champagne-gold" />
        <span className="size-2.5 rounded-full bg-pistachio" />
      </div>
      <p className="px-4 py-3 font-mono text-[13px] text-pearl/90">
        <span className="text-bubblegum">yomna@lab</span>
        <span className="text-pearl/40"> % </span>
        {typed}
        <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-pearl/70 align-middle" />
      </p>
    </div>
  );
}

export default function LabContent() {
  return (
    <div>
      <LabTerminal />
      <div className="grid gap-4 sm:grid-cols-2">
        {NOTES.map((n, i) => (
          <motion.div
            key={n.tag}
            initial={{ opacity: 0, rotate: i % 2 === 0 ? -1.5 : 1.5, y: 10 }}
            animate={{ opacity: 1, rotate: i % 2 === 0 ? -1 : 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative rounded-sm border border-espresso/10 bg-powder-pink/40 p-5 shadow-[0_14px_30px_-18px_rgba(50,27,36,0.4)]"
          >
            {/* a little gold pin, like the note is tacked to a board */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne-gold bg-champagne-gold shadow-[0_1px_3px_rgba(50,27,36,0.4)]"
            />
            <span
              className="absolute right-3 top-3 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide"
              style={{ borderColor: STAMP_COLOR[n.stamp], color: STAMP_COLOR[n.stamp] }}
            >
              {n.stamp}
            </span>
            <p className="label-tech pr-16">{n.tag}</p>
            <p className="mt-2 font-display text-base leading-snug text-espresso">{n.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
