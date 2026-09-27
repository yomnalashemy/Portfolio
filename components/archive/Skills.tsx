"use client";

import { motion } from "framer-motion";
import * as React from "react";

interface SkillNode {
  label: string;
  x: number; // 0-100, % of container
  y: number;
}
interface Category {
  label: string;
  cx: number;
  cy: number;
  color: string;
  nodes: SkillNode[];
}

const CATEGORIES: Category[] = [
  {
    label: "LANGUAGES",
    cx: 16,
    cy: 22,
    color: "#D98B9A",
    nodes: [
      { label: "Arabic (native)", x: 8, y: 8 },
      { label: "English (C1)", x: 26, y: 12 },
      { label: "Russian (A1)", x: 12, y: 38 },
    ],
  },
  {
    label: "SYSTEMS",
    cx: 78,
    cy: 16,
    color: "#D8C7A5",
    nodes: [
      { label: "Node / Express", x: 68, y: 6 },
      { label: "Next.js", x: 88, y: 8 },
      { label: "NestJS", x: 92, y: 26 },
      { label: "FastAPI / Python", x: 72, y: 30 },
    ],
  },
  {
    label: "INFRASTRUCTURE",
    cx: 20,
    cy: 68,
    color: "#681F35",
    nodes: [
      { label: "PostgreSQL", x: 6, y: 60 },
      { label: "MongoDB", x: 8, y: 84 },
      { label: "Redis", x: 26, y: 88 },
      { label: "Docker / Render", x: 30, y: 62 },
    ],
  },
  {
    label: "TOOLS",
    cx: 80,
    cy: 62,
    color: "#72747C",
    nodes: [
      { label: "Claude Code", x: 92, y: 54 },
      { label: "n8n", x: 90, y: 76 },
      { label: "SQL / Metabase", x: 70, y: 82 },
      { label: "Git", x: 68, y: 58 },
    ],
  },
  {
    label: "CURRENTLY EXPLORING",
    cx: 50,
    cy: 92,
    color: "#E94F87",
    nodes: [
      { label: "CEH / ethical hacking", x: 38, y: 96 },
      { label: "Three.js / WebGL", x: 60, y: 96 },
    ],
  },
];

export default function Skills() {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <section className="relative bg-obsidian py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="label-tech mb-3 text-steel">04 / CONSTELLATION</p>
        <h2 className="display-lg text-bone">
          A map, not a <span className="italic-phrase text-champagne">progress bar.</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-16 aspect-[16/11] w-full max-w-5xl px-6 md:px-10">
        <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {CATEGORIES.map((cat) =>
            cat.nodes.map((n) => {
              const dim = hovered !== null && hovered !== cat.label;
              return (
                <line
                  key={`${cat.label}-${n.label}`}
                  x1={`${cat.cx}%`}
                  y1={`${cat.cy}%`}
                  x2={`${n.x}%`}
                  y2={`${n.y}%`}
                  stroke={cat.color}
                  strokeWidth={1}
                  opacity={dim ? 0.06 : 0.35}
                  style={{ transition: "opacity 0.35s ease" }}
                />
              );
            })
          )}
        </svg>

        {CATEGORIES.map((cat) => {
          const dim = hovered !== null && hovered !== cat.label;
          return (
            <div key={cat.label} onMouseEnter={() => setHovered(cat.label)} onMouseLeave={() => setHovered(null)}>
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5"
                style={{
                  left: `${cat.cx}%`,
                  top: `${cat.cy}%`,
                  borderColor: cat.color,
                  opacity: dim ? 0.35 : 1,
                  transition: "opacity 0.35s ease",
                }}
              >
                <span className="label-tech whitespace-nowrap" style={{ color: cat.color }}>
                  {cat.label}
                </span>
              </motion.div>

              {cat.nodes.map((n) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: dim ? 0.3 : 1, scale: 1 }}
                  viewport={{ once: true }}
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transition: "opacity 0.35s ease",
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-steel/25 bg-obsidian px-2.5 py-1 font-mono text-[10px] text-bone"
                >
                  {n.label}
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
