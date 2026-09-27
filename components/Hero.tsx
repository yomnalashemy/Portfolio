"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import * as React from "react";

import { projects } from "@/data";

/**
 * The hero used to be a purple/teal Spotlight gradient behind a
 * TextGenerateEffect headline — the exact combination that shows up on
 * hundreds of Aceternity-template portfolios. This one leads with the thing
 * nobody else can copy: every project below is real, running software, not a
 * screenshot of it. The boot sequence says so literally, using the real
 * project list rather than invented copy.
 */

const BOOT_LINES = projects.map((p) => p.title.split(/[–|-]/)[0]!.trim());

const Hero = () => {
  const [line, setLine] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (line >= BOOT_LINES.length) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLine((n) => n + 1), 260);
    return () => clearTimeout(t);
  }, [line]);

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center py-20">
      {/* Faint scanline texture — a nod to the console concept, kept subtle
          enough to never fight with the actual text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(232,163,61,0.08), transparent)" }}
      />

      <div className="relative z-10 max-w-3xl">
        <div className="font-mono text-[13px] text-console-muted mb-8 leading-relaxed">
          <p className="text-console-faint">yomna@systems ~ %</p>
          <p className="mt-1">
            <span className="text-console-ink">./boot</span>
            <span className="text-console-faint"> --list-live-systems</span>
          </p>
          <div className="mt-3 flex flex-col gap-0.5">
            {BOOT_LINES.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < line ? 1 : 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <span className="text-console-faint">[{String(i + 1).padStart(2, "0")}]</span>
                <span className="text-console-ink">{name}</span>
                <span className="flex-1 border-b border-dotted border-console-line translate-y-[-3px]" />
                <span className="text-console-good">online</span>
              </motion.div>
            ))}
          </div>
          {!done && (
            <span className="inline-block w-2 h-3.5 bg-console-amber mt-2 animate-cursor-blink" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[44px] md:text-6xl font-mono font-semibold leading-[1.05] tracking-tight text-console-ink">
            Six systems.
            <br />
            <span className="text-console-amber">All of them running.</span>
          </h1>
          <p className="mt-6 max-w-xl text-console-muted text-base md:text-lg leading-relaxed">
            I&rsquo;m Yomna — a FinCrime analyst who builds the tools she wishes she had, and a
            full-stack engineer who&rsquo;d rather ship a working thing than a pretty picture of
            one. Everything below is live. Try it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#systems"
              className="inline-flex items-center gap-2 font-mono text-sm text-console-ink border border-console-line hover:border-console-amber hover:text-console-amber transition-colors rounded-md px-5 py-3"
            >
              View the systems
              <ArrowDown className="size-3.5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-console-amber border border-console-amber-dim bg-console-amber/10 hover:bg-console-amber/20 transition-colors rounded-md px-5 py-3"
            >
              Résumé
              <Download className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
