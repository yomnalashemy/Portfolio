"use client";

import { motion } from "framer-motion";

/**
 * A live-feeling progress readout for the CEH track currently in progress —
 * sits beside the boot sequence so the hero shows two things actually true
 * right now: six systems already live, and one more skill being built.
 *
 * MODULE COUNT IS AN ASSUMPTION: EC-Council's CEH v13 curriculum runs 20
 * modules. Update TOTAL_MODULES if the actual course differs.
 */

const CURRENT_MODULE = 3;
const TOTAL_MODULES = 20;
const PERCENT = Math.round((CURRENT_MODULE / TOTAL_MODULES) * 100);

const StudyTrack = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-8 inline-flex w-full max-w-sm flex-col gap-2.5 rounded-lg border border-console-line bg-console-surface px-4 py-3.5"
    >
      <div className="flex items-center justify-between font-mono text-[11px]">
        <span className="text-console-faint uppercase tracking-wide">In progress · CEH</span>
        <span className="text-console-amber tabular-nums">
          {String(CURRENT_MODULE).padStart(2, "0")} / {TOTAL_MODULES}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-console-line">
        <motion.div
          className="h-full rounded-full bg-console-amber"
          initial={{ width: 0 }}
          whileInView={{ width: `${PERCENT}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        />
      </div>
      <p className="font-mono text-[11px] text-console-faint">
        Certified Ethical Hacker — module {CURRENT_MODULE} underway
      </p>
    </motion.div>
  );
};

export default StudyTrack;
