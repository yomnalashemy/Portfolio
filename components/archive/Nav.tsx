"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { usePanels, type PanelId } from "@/components/panels/PanelContext";

const LINKS: { label: string; id: PanelId }[] = [
  { label: "WORK", id: "work" },
  { label: "ABOUT", id: "about" },
  { label: "LAB", id: "lab" },
  { label: "RESUME", id: "resume" },
  { label: "CONTACT", id: "contact" },
];

export default function Nav() {
  const { open } = usePanels();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: PanelId) => {
    setMenuOpen(false);
    open(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 font-mono text-xs transition-colors duration-500 md:px-10 ${
          scrolled ? "bg-buttercream/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <span className="font-display text-lg text-cherry">YOMNA</span>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.label}
              type="button"
              data-cursor="GO"
              onClick={() => go(l.id)}
              className="tracking-[0.18em] text-espresso/60 transition-colors hover:text-raspberry"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-espresso transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-espresso transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-buttercream md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.label}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(l.id)}
                className="font-display text-3xl text-espresso"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
