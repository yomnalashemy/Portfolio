"use client";

import { motion } from "framer-motion";

const ENTRIES = [
  {
    stage: "STAGE 01",
    event: "Cyber Security Intern",
    built: "Penetration testing drills and CTF challenges, not production code.",
    learned: "How attackers actually think — the foundation for building things that resist them.",
  },
  {
    stage: "STAGE 02",
    event: "Mobile App Backend Developer",
    built: "The Express.js backend for a mobile app shipping on both iOS and Android.",
    learned: "Backend design that has to serve two client platforms without compromise.",
  },
  {
    stage: "STAGE 03",
    event: "Freelance App Developer",
    built: "A client's mobile app, concept to app-store deployment, solo.",
    learned: "Owning a project end-to-end — deployment, feedback, scope — not just the fun parts.",
  },
  {
    stage: "STAGE 04",
    event: "Lead Backend Developer — Lupira",
    built: "Backend features for an AI-powered lupus diagnosis assistant.",
    learned: "Wiring a real scikit-learn model into a production backend safely.",
  },
];

export default function Timeline() {
  return (
    <section className="relative bg-bone py-28 text-obsidian md:py-40">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <p className="label-tech mb-3 text-steel">05 / CHRONOLOGY</p>
        <h2 className="display-lg mb-16">
          Not a resume. <span className="italic-phrase text-burgundy">A record.</span>
        </h2>

        <div className="relative flex flex-col">
          <div
            aria-hidden
            className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-burgundy/40 via-obsidian/15 to-transparent"
          />
          {ENTRIES.map((e, i) => (
            <motion.div
              key={e.event}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-8 py-8"
            >
              <span
                aria-hidden
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ background: "#681F35", boxShadow: "0 0 0 4px rgba(104,31,53,0.12)" }}
              />
              <div>
                <p className="label-tech text-steel">{e.stage}</p>
                <h3 className="mt-1.5 font-display text-xl">{e.event}</h3>
                <dl className="mt-3 grid gap-2 text-sm text-obsidian/75 sm:grid-cols-2">
                  <div>
                    <dt className="label-tech text-steel">WHAT I BUILT</dt>
                    <dd className="mt-1">{e.built}</dd>
                  </div>
                  <div>
                    <dt className="label-tech text-steel">WHAT I LEARNED</dt>
                    <dd className="mt-1">{e.learned}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
