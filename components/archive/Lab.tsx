"use client";

import { motion } from "framer-motion";

const NOTES = [
  {
    tag: "CURRENT HYPOTHESIS",
    body: "Financial-crime patterns are anomaly-detection problems wearing a compliance costume.",
    color: "#E94F87",
  },
  {
    tag: "CURRENT EXPERIMENT",
    body: "Wiring a scikit-learn SVM into a Node/Python pipeline for early lupus-risk screening.",
    color: "#D98B9A",
  },
  {
    tag: "CURRENT OBSESSION",
    body: "CEH v13 — three modules in, going for the full certification.",
    color: "#D8C7A5",
  },
  {
    tag: "THINGS I'M BREAKING",
    body: "Whatever's slowest in a KYB pipeline, until it isn't.",
    color: "#681F35",
  },
];

export default function Lab() {
  return (
    <section id="lab" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="label-tech mb-3 text-steel">06 / THE LAB</p>
        <h2 className="display-lg text-bone">
          Notes from the <span className="italic-phrase text-electric-pink">margins.</span>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {NOTES.map((n, i) => (
            <motion.div
              key={n.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-sm border border-steel/20 bg-obsidian/40 p-6"
              style={{ borderTopColor: n.color, borderTopWidth: 2 }}
            >
              <p className="label-tech" style={{ color: n.color }}>
                {n.tag}
              </p>
              <p className="mt-3 font-display text-lg leading-snug text-bone">{n.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
