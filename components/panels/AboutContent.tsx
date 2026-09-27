"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

const SKILLS: { category: string; items: string[] }[] = [
  { category: "LANGUAGES", items: ["Arabic (native)", "English (C1)", "Russian (A1)"] },
  { category: "SYSTEMS", items: ["Node / Express", "Next.js", "NestJS", "FastAPI / Python"] },
  { category: "INFRASTRUCTURE", items: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Render"] },
  { category: "TOOLS", items: ["Claude Code", "n8n", "SQL / Metabase", "Git"] },
  { category: "CURRENTLY EXPLORING", items: ["CEH / ethical hacking", "Three.js / WebGL"] },
];

const PAGES = [
  {
    tab: "BIO",
    content: (
      <div>
        <p className="text-[15px] leading-relaxed text-espresso/80">
          I&rsquo;m a FinCrime analyst at Ziina by day, and the engineer who built six of my own
          production systems on the side — a Cambridge revision platform, a lupus-screening app wired
          to a real SVM model, a banking dashboard, and more. I started in penetration testing and CTF
          challenges before moving into building the systems I used to try breaking.
        </p>
        <p className="script-note mt-4">still native Arabic, still C1 English, still terrible at Russian.</p>
      </div>
    ),
  },
  {
    tab: "NOW",
    content: (
      <dl className="grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="label-tech">CURRENTLY LEARNING</dt>
          <dd className="mt-1 text-sm text-espresso/80">CEH v13 — three modules in.</dd>
        </div>
        <div>
          <dt className="label-tech">CURRENTLY BUILDING</dt>
          <dd className="mt-1 text-sm text-espresso/80">
            The AI service behind Lupira&rsquo;s real diagnosis flow, properly deployed this time.
          </dd>
        </div>
        <div>
          <dt className="label-tech">CURRENTLY OBSESSED WITH</dt>
          <dd className="mt-1 text-sm text-espresso/80">
            Making KYB pipelines fail less. Was 303 failures, now 1.
          </dd>
        </div>
        <div>
          <dt className="label-tech">WHY SYSTEMS?</dt>
          <dd className="mt-1 text-sm text-espresso/80">
            Because breaking them first taught me what building them well actually requires.
          </dd>
        </div>
      </dl>
    ),
  },
  {
    tab: "SKILLS",
    content: (
      <div className="grid gap-5 sm:grid-cols-2">
        {SKILLS.map((s) => (
          <div key={s.category}>
            <p className="label-tech">{s.category}</p>
            <ul className="mt-2 flex flex-col gap-1">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-espresso/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
];

export default function AboutContent() {
  const [page, setPage] = React.useState(0);

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {PAGES.map((p, i) => (
          <button
            key={p.tab}
            type="button"
            onClick={() => setPage(i)}
            className="rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
            style={{
              borderColor: page === i ? "#B51F52" : "rgba(50,27,36,0.15)",
              color: page === i ? "#B51F52" : "rgba(50,27,36,0.55)",
              background: page === i ? "#FFD6E7" : "transparent",
            }}
          >
            {p.tab}
          </button>
        ))}
      </div>

      {/* a real notebook page: cream paper, a spiral-binding edge, paper
          shadow — not just a bare tab panel */}
      <div className="relative overflow-hidden rounded-r-xl rounded-l-sm border border-cherry/10 bg-pearl pl-9 shadow-[0_20px_45px_-26px_rgba(50,27,36,0.4)]">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 flex w-9 flex-col items-center justify-evenly border-r border-cherry/10 bg-powder-pink/40"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="size-2 rounded-full border border-cherry/20 bg-pearl" />
          ))}
        </div>

        <div className="relative min-h-[220px] p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 24, rotateY: -8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -24, rotateY: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 800 }}
            >
              {PAGES[page].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
