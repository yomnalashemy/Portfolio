"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Cluster = { id: string; label: string; skills: string[] };

// sourced from resume.pdf's Technical Skills list, grouped by category.
const CLUSTERS: Cluster[] = [
  { id: "languages", label: "LANGUAGES", skills: ["Arabic (native)", "English (C1)", "Russian (A1)"] },
  { id: "systems", label: "SYSTEMS", skills: ["Node / Express", "Next.js", "NestJS", "FastAPI / Python"] },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Render"],
  },
  { id: "tools", label: "TOOLS", skills: ["Claude Code", "n8n", "SQL / Metabase", "Git"] },
  { id: "design", label: "DESIGN & A11Y", skills: ["UI/UX design", "Design systems", "Accessibility (WCAG AA)"] },
  { id: "exploring", label: "CURRENTLY EXPLORING", skills: ["CEH Master (312-50v13)", "Three.js / WebGL"] },
];

export default function SkillsWorkbench() {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(CLUSTERS[0].id);
  const activeCluster = CLUSTERS.find((c) => c.id === active)!;

  return (
    <div>
      <p className="text-sm text-espresso/70">
        Click a node. Everything wired to it lights up below — a real connection, not a percentage
        bar guessing how &ldquo;good&rdquo; I am at something.
      </p>

      {/* the rail: a circuit trace running behind the category nodes */}
      <div className="relative mt-10">
        <div
          aria-hidden
          className="absolute inset-x-4 top-1/2 hidden h-px -translate-y-1/2 bg-champagne-gold/50 sm:block"
        />
        <div
          className="relative flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Skill categories"
        >
          {CLUSTERS.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.id)}
                data-cursor="GO"
                className="relative flex items-center gap-2 rounded-full border bg-pearl px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors"
                style={{
                  borderColor: isActive ? "#B51F52" : "rgba(50,27,36,0.15)",
                  color: isActive ? "#B51F52" : "rgba(50,27,36,0.6)",
                  background: isActive ? "#FFD6E7" : "#FFFDF8",
                }}
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full transition-colors"
                  style={{ background: isActive ? "#B51F52" : "#D9B66F" }}
                />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* the drop line from the rail into the board */}
        <div aria-hidden className="mx-auto h-6 w-px bg-champagne-gold/50" />
      </div>

      {/* the board: active cluster's skills, each its own wired component */}
      <div className="relative overflow-hidden rounded-xl border border-dashed border-champagne-gold/50 bg-pearl/60 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            role="tabpanel"
            className="flex flex-wrap gap-2.5"
          >
            {activeCluster.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-md border border-raspberry/20 bg-white px-3 py-1.5 text-[12.5px] text-espresso/80 shadow-sm"
              >
                <span aria-hidden className="h-px w-2.5 bg-raspberry/40" />
                {skill}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
