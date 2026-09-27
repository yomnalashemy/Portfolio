"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

const ExploreScene = dynamic(() => import("@/components/three/ExploreScene"), { ssr: false });

/**
 * Replaces the passive Stack ticker. Instead of watching tools scroll by,
 * a visitor picks a project and the stack behind it "unlocks" — a real
 * per-project reveal instead of one flat list of fourteen things.
 *
 * Colors are each project's own real accent, pulled from that project's
 * actual demo/site (Console's ITQAN gold, CuraCare's teal, Lupira's rose,
 * Horizon Banking's copper, Sentinel's brick, Sushi's coral) — not new
 * decoration, the same identity each project already has elsewhere.
 */

interface Stack {
  tag: string;
  color: string;
  tools: string[];
  fact: string;
}

const STACKS: Stack[] = [
  {
    tag: "ITQAN",
    color: "#dcc68f",
    tools: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    fact: "147 API routes, 1,025 automated tests — the biggest of the six.",
  },
  {
    tag: "CuraCare",
    color: "#3fbf93",
    tools: ["Next.js", "TypeScript", "TailwindCSS", "Appwrite", "Twilio"],
    fact: "Admin/provider dashboards with SQL-based access controls and audit trails.",
  },
  {
    tag: "Lupira",
    color: "#e2749a",
    tools: ["Flutter", "Python", "Scikit-learn", "MongoDB", "Express.js"],
    fact: "An SVM model mapped to real EULAR/ACR diagnostic criteria.",
  },
  {
    tag: "Horizon Banking",
    color: "#e08a42",
    tools: ["Next.js", "TypeScript", "Appwrite", "Sentry"],
    fact: "Cross-account transfers, spending analysis on anonymized transaction data.",
  },
  {
    tag: "SushiMania",
    color: "#e0605a",
    tools: ["HTML", "CSS", "JavaScript", "GSAP"],
    fact: "No framework at all — just a genuinely smooth interactive cart.",
  },
  {
    tag: "Sentinel",
    color: "#d97a5f",
    tools: ["PostgreSQL / SQL", "n8n", "TypeScript"],
    fact: "A 42-CTE search spanning 13 warehouse/staging tables, generalized for this demo.",
  },
];

const Explore = () => {
  const [active, setActive] = React.useState<string | null>(null);
  const [found, setFound] = React.useState<Set<string>>(new Set());

  const select = (tag: string) => {
    setActive((cur) => (cur === tag ? null : tag));
    setFound((prev) => new Set(prev).add(tag));
  };

  const activeStack = STACKS.find((s) => s.tag === active) ?? null;
  const allFound = found.size === STACKS.length;

  return (
    <section className="py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Explore the stack</p>
          <h2 className="heading mt-3">Six stacks. Go find them.</h2>
        </div>
        <span className="font-mono text-xs text-console-faint tabular-nums">
          {found.size} / {STACKS.length} explored
        </span>
      </div>

      <div className="relative mt-8 h-[380px] rounded-xl border border-console-line bg-console-surface/60 overflow-hidden">
        <ExploreScene stacks={STACKS} found={found} active={active} onSelect={select} />
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[11px] text-console-faint">
          drag to spin the system map · click a node to unlock it
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {STACKS.map((s) => {
          const isFound = found.has(s.tag);
          const isActive = active === s.tag;
          return (
            <button
              key={s.tag}
              type="button"
              onClick={() => select(s.tag)}
              className="flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm transition-colors"
              style={{
                borderColor: isFound ? s.color : "#26261f",
                color: isFound ? s.color : "#8f8d80",
                background: isActive ? `${s.color}1a` : "transparent",
              }}
            >
              {isFound && <Check className="size-3.5" />}
              {s.tag}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeStack && (
          <motion.div
            key={activeStack.tag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-xl border p-6"
            style={{
              borderColor: `${activeStack.color}40`,
              background: `radial-gradient(120% 140% at 0% 0%, ${activeStack.color}22, #131311 55%)`,
            }}
          >
            <div className="flex flex-wrap gap-2.5">
              {activeStack.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="rounded-md border px-3 py-1.5 font-mono text-sm"
                  style={{ borderColor: `${activeStack.color}55`, color: activeStack.color }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: activeStack.tools.length * 0.06 + 0.1 }}
              className="mt-4 text-sm text-console-muted"
            >
              {activeStack.fact}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {allFound && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 font-mono text-sm text-console-amber"
          >
            All six found. You clearly read documentation — I like that. Try{" "}
            <span className="text-console-ink">ping</span> in the console above.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Explore;
