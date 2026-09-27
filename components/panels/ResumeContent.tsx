"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import * as React from "react";

export default function ResumeContent() {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* the document itself, as an object — not just a download button */}
      <div className="w-full max-w-sm rotate-1 rounded-sm border border-cherry/10 bg-pearl px-6 py-7 text-left shadow-[0_24px_50px_-28px_rgba(50,27,36,0.45)]">
        <div className="flex items-center justify-between border-b border-champagne-gold/40 pb-3">
          <span className="font-display text-lg text-espresso">Yomna Alshemy</span>
          <span className="label-tech">PDF</span>
        </div>
        <div className="mt-4 flex flex-col gap-1.5" aria-hidden>
          <span className="h-1.5 w-3/4 rounded-full bg-espresso/10" />
          <span className="h-1.5 w-full rounded-full bg-espresso/10" />
          <span className="h-1.5 w-5/6 rounded-full bg-espresso/10" />
          <span className="mt-2 h-1.5 w-2/3 rounded-full bg-raspberry/20" />
          <span className="h-1.5 w-full rounded-full bg-espresso/10" />
          <span className="h-1.5 w-4/5 rounded-full bg-espresso/10" />
        </div>
      </div>

      <p className="max-w-sm text-sm text-espresso/70">
        Everything above, plus the parts that only fit on one page.
      </p>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="OPEN"
        className="inline-flex items-center gap-2 rounded-full border border-cherry bg-cherry px-7 py-3.5 font-mono text-sm text-pearl transition-opacity hover:opacity-90"
      >
        View / download résumé <Download className="size-4" />
      </a>

      {/* the sticky note easter egg */}
      <div
        className="relative mt-4 inline-flex -rotate-2 cursor-default items-center gap-2 rounded-sm bg-powder-pink px-4 py-2.5 shadow-sm"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="script-note">...and it&rsquo;s scented.</span>

        <AnimatePresence>
          {hovered && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={{ opacity: 0, y: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.7, 0], y: -22, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.3 }}
                  className="pointer-events-none absolute -top-1 text-raspberry"
                  style={{ left: `${30 + i * 20}%` }}
                >
                  ~
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-raspberry"
              >
                *sniff sniff*
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
