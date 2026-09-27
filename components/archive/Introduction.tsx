"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

const WORDS = [
  { text: "I", speed: 10 },
  { text: "like", speed: 40 },
  { text: "understanding", speed: -30 },
  { text: "what", speed: 15 },
  { text: "happens", speed: -50 },
  { text: "underneath.", speed: 25 },
];

const ANNOTATIONS = [
  { n: "01", label: "CURIOSITY" },
  { n: "02", label: "SYSTEMS" },
  { n: "03", label: "BUILDING" },
];

export default function Introduction() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
          {WORDS.map((w, i) => (
            <Word key={i} progress={scrollYProgress} speed={w.speed}>
              {w.text}
            </Word>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-steel/20 pt-8 md:grid-cols-3">
          {ANNOTATIONS.map((a, i) => (
            <motion.div
              key={a.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="label-tech"
            >
              {a.n} / {a.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  speed,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  speed: number;
}) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.span style={{ y }} className="display-lg text-bone">
      {children}
    </motion.span>
  );
}
