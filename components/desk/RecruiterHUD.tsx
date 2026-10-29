"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Briefcase, Cpu, Fingerprint, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const MODES = [
  {
    id: "systems",
    label: "SYSTEMS",
    icon: Cpu,
    title: "I make complex systems legible.",
    body: "Operational tooling, automation, data workflows, and the details that turn a repeated task into a reliable system.",
    tags: ["TypeScript", "Automation", "Data workflows"],
    href: "/workbench",
    cta: "Explore the workbench",
  },
  {
    id: "product",
    label: "PRODUCT",
    icon: Sparkles,
    title: "Useful can still feel extraordinary.",
    body: "Product thinking and interface craft, connected to real user journeys—not decorative screens floating in a case study.",
    tags: ["UI engineering", "Interaction design", "Prototyping"],
    href: "/work",
    cta: "Enter the archive",
  },
  {
    id: "investigation",
    label: "INVESTIGATION",
    icon: Fingerprint,
    title: "Follow the evidence. Understand the system.",
    body: "A financial-crime investigator's instinct for patterns, edge cases, and the evidence behind a decision—brought into engineering.",
    tags: ["Risk thinking", "SQL", "Analytical problem-solving"],
    href: "/experience",
    cta: "See the timeline",
  },
] as const;

export default function RecruiterHUD() {
  const [mode, setMode] = React.useState<(typeof MODES)[number]["id"]>("systems");
  const [expanded, setExpanded] = React.useState(true);
  const active = MODES.find((item) => item.id === mode) ?? MODES[0];
  const ActiveIcon = active.icon;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 px-4 sm:bottom-7 sm:px-7 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-4">
        <motion.section
          layout
          aria-label="Interactive portfolio guide"
          className="pointer-events-auto w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/60 bg-[#fffaf1]/90 text-[#321b24] shadow-[0_24px_80px_-24px_rgba(50,27,36,0.42)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <div className="flex items-center justify-between border-b border-[#321b24]/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#c72c48] opacity-35" />
                <span className="relative inline-flex size-2 rounded-full bg-[#c72c48]" />
              </span>
              <span className="font-mono text-[9px] tracking-[0.19em] text-[#321b24]/60 sm:text-[10px]">
                RECRUITER INTERFACE <span className="text-[#c72c48]">/ 01</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="rounded-full px-2 py-1 font-mono text-[9px] tracking-widest text-[#321b24]/60 transition-colors hover:bg-[#c72c48]/10 hover:text-[#c72c48]"
            >
              {expanded ? "MINIMIZE −" : "EXPLORE +"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="recruiter-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div role="tablist" aria-label="Choose a portfolio focus" className="grid grid-cols-3 gap-1 px-3 pt-3 sm:px-4">
                  {MODES.map((item, index) => {
                    const Icon = item.icon;
                    const selected = item.id === mode;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                        role="tab"
                        aria-selected={selected}
                        aria-controls="recruiter-mode-panel"
                        className={`flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 font-mono text-[8px] tracking-[0.13em] transition-all sm:text-[9px] ${selected ? "bg-[#321b24] text-[#fffaf1] shadow-md" : "text-[#321b24]/55 hover:bg-[#c72c48]/[0.08] hover:text-[#c72c48]"}`}
                      >
                        <Icon className="size-3.5 shrink-0" aria-hidden />
                        <span>{item.label}</span>
                        <span className="hidden opacity-50 sm:inline">0{index + 1}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    id="recruiter-mode-panel"
                    key={active.id}
                    role="tabpanel"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-[#c72c48]/[0.15] bg-[#c72c48]/[0.08] text-[#c72c48]">
                        <ActiveIcon className="size-4" aria-hidden />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display text-lg leading-tight sm:text-xl">{active.title}</h2>
                        <p className="mt-2 max-w-[36ch] text-xs leading-relaxed text-[#321b24]/65 sm:text-[13px]">
                          {active.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {active.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#321b24]/10 px-2.5 py-1 font-mono text-[9px] text-[#321b24]/65">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[#321b24]/10 pt-3">
                      <span className="font-mono text-[9px] tracking-widest text-[#321b24]/40">CHOOSE A TRAIL</span>
                      <Link
                        href={active.href}
                        className="inline-flex items-center gap-2 rounded-full bg-[#c72c48] px-3.5 py-2 font-mono text-[10px] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#a91f3a] focus-visible:outline-offset-4"
                      >
                        {active.cta} <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="pointer-events-auto hidden shrink-0 flex-col items-end gap-2 md:flex"
        >
          <Link
            href="/resume"
            className="group inline-flex items-center gap-3 rounded-full border border-white/70 bg-[#fffaf1]/85 px-4 py-3 font-mono text-[10px] tracking-widest text-[#321b24] shadow-lg backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <BriefcaseBusiness className="size-4 text-[#c72c48]" aria-hidden />
            OPEN RÉSUMÉ
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-2 py-1 font-mono text-[9px] tracking-widest text-[#321b24]/65 transition-colors hover:text-[#c72c48]"
          >
            HAVE A ROLE IN MIND? <ArrowDownRight className="size-3.5" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
