"use client";

import { motion } from "framer-motion";

import { projects } from "@/data";

/**
 * Replaces the testimonials carousel + client-logo row. A stack of quotes
 * reads as generic on any portfolio; this reads as this one, because it's
 * counting the actual things on this actual page rather than asking a
 * visitor to take someone else's word for it.
 */

const STATS = [
  { value: String(projects.length), label: "systems live on this page, right now" },
  { value: "3", label: "languages — Arabic native, English C1, Russian A1" },
  { value: "10 yrs", label: "of Cambridge past papers filed in ITQAN alone" },
  { value: "0", label: "screenshots used to show any of it" },
];

const StatusStrip = () => {
  return (
    <section className="py-16 border-y border-console-line">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="font-mono text-3xl md:text-4xl font-semibold text-console-ink tabular-nums">
              {s.value}
            </div>
            <p className="mt-1.5 text-sm text-console-muted leading-snug">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatusStrip;
