"use client";

import { motion } from "framer-motion";

import { gridItems } from "@/data";

/**
 * Replaces the six-box BentoGrid — a card shape so common it's a template
 * signature on its own. This reads as a field list instead: the same real
 * content (languages, toolbox, how I work), laid out as plain labeled rows
 * rather than a grid of unevenly-sized boxes competing for attention.
 */

const Grid = () => {
  return (
    <section id="about" className="py-24">
      <p className="eyebrow">01 / Profile</p>
      <h2 className="heading mt-3 mb-12">How I actually work.</h2>

      <div className="flex flex-col divide-y divide-console-line border-y border-console-line">
        {gridItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] items-baseline gap-4 py-6"
          >
            <span className="font-mono text-xs text-console-faint">
              {String(item.id).padStart(2, "0")}
            </span>
            <div>
              <p className="text-lg md:text-xl text-console-ink leading-snug max-w-3xl">
                {item.title}
              </p>
              {item.description && (
                <p className="mt-1.5 font-mono text-xs uppercase tracking-wide text-console-amber">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Grid;
