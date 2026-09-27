"use client";

import { motion } from "framer-motion";

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

export default function LabContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {NOTES.map((n, i) => (
        <motion.div
          key={n.tag}
          initial={{ opacity: 0, rotate: i % 2 === 0 ? -1.5 : 1.5, y: 10 }}
          animate={{ opacity: 1, rotate: i % 2 === 0 ? -1 : 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="relative rounded-sm border border-espresso/10 bg-powder-pink/40 p-5 shadow-sm"
        >
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
  );
}
