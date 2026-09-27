"use client";

import { motion } from "framer-motion";

const METADATA = [
  { label: "FOCUS", value: "FinCrime systems & full-stack engineering" },
  { label: "SYSTEMS", value: "6 shipped, all still running" },
  { label: "CURRENTLY LEARNING", value: "CEH v13 — 3 modules in" },
  { label: "LOCATION", value: "UAE · remote-friendly" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-bone py-28 text-obsidian md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="label-tech mb-14 text-steel">02 / PROFILE</p>

        <div className="grid gap-16 md:grid-cols-2 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="display-lg"
          >
            Half the day inside financial-crime systems.{" "}
            <span className="italic-phrase text-burgundy">The other half building them from scratch.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            <p className="max-w-md text-lg leading-relaxed text-obsidian/80">
              I&rsquo;m a FinCrime analyst at Ziina by day, and the engineer who built six of my own production
              systems on the side — a Cambridge revision platform, a lupus-screening app wired to a real
              SVM model, a banking dashboard, and more. Native Arabic, C1 English, A1 Russian. I started in
              penetration testing and CTF challenges before moving into building the systems I used to try
              breaking.
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-obsidian/15 pt-6">
              {METADATA.map((m) => (
                <div key={m.label} className="group">
                  <dt className="label-tech text-steel transition-colors group-hover:text-burgundy">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-obsidian/80">{m.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
