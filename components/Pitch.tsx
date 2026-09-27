"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Download } from "lucide-react";

/**
 * The central hook — deliberately breaks the page's left-aligned rhythm
 * (centered, oversized type, generous whitespace) so it reads as a
 * distinct moment rather than another section. Built to work on two
 * different readers at once: someone hiring full-time, and someone with
 * a project who needs it built. Same three words, two concrete CTAs.
 */

const WORDS = ["Broken.", "Built.", "Shipped."];

const Pitch = () => {
  return (
    <section className="py-24 flex flex-col items-center text-center">
      <p className="eyebrow">The pitch, in one line</p>

      <h2 className="mt-4 font-mono font-semibold text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl tracking-tight">
        {WORDS.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.35 }}
            className={i === WORDS.length - 1 ? "text-console-amber" : "text-console-ink"}
          >
            {w}
            {i < WORDS.length - 1 && <span className="text-console-faint">&nbsp;</span>}
          </motion.span>
        ))}
      </h2>

      <p className="mt-6 max-w-xl text-console-muted text-base md:text-lg leading-relaxed">
        Fraud rings traced end-to-end. A KYB pipeline taken from 303 failures to 1. Six production
        systems, built solo, still running above. That&rsquo;s the track record — not a pitch deck.
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="group rounded-lg border border-console-line bg-console-surface p-6 text-left hover:border-console-amber transition-colors"
        >
          <Briefcase className="size-5 text-console-amber" />
          <h3 className="mt-4 font-mono text-lg text-console-ink">Hiring?</h3>
          <p className="mt-1.5 text-sm text-console-muted">
            Full résumé, real numbers, no fluff.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-console-amber">
            Get the résumé
            <Download className="size-3.5 transition-transform group-hover:translate-y-0.5" />
          </span>
        </motion.a>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="group rounded-lg border border-console-line bg-console-surface p-6 text-left hover:border-console-amber transition-colors"
        >
          <ArrowUpRight className="size-5 text-console-amber" />
          <h3 className="mt-4 font-mono text-lg text-console-ink">Have a project?</h3>
          <p className="mt-1.5 text-sm text-console-muted">
            Tell me what&rsquo;s broken. I&rsquo;ll tell you what it takes to fix it.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-console-amber">
            Let&rsquo;s talk
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Pitch;
