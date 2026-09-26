"use client";

import { motion } from "framer-motion";

import { workExperience } from "@/data";

/**
 * Was a grid of gradient "moving border" cards — flashy, but the border
 * animation had nothing to do with the content. A simple timeline reads
 * faster and fits the console concept: entries appearing in sequence, like
 * a log.
 */

const Experience = () => {
  return (
    <section className="py-24">
      <p className="eyebrow">03 / Experience</p>
      <h2 className="heading mt-3 mb-12">Where this was actually built.</h2>

      <div className="flex flex-col">
        {workExperience.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4 py-6 border-b border-console-line last:border-b-0"
          >
            <span className="font-mono text-xs text-console-faint pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-mono text-lg text-console-ink">{card.title}</h3>
              <p className="mt-2 text-console-muted leading-relaxed max-w-2xl">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
