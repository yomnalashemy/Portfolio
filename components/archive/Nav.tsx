"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

const LINKS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "LAB", href: "#lab" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 font-mono text-xs transition-colors duration-500 md:px-10 ${
          scrolled ? "bg-obsidian/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a
          href="#"
          data-cursor="TOP"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-display text-lg text-bone"
        >
          YA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="GO"
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="tracking-[0.18em] text-steel transition-colors hover:text-dusty-rose"
            >
              {l.label}
            </a>
          ))}
          <span className="flex items-center gap-1.5 tracking-[0.18em] text-steel">
            <span className="size-1.5 rounded-full bg-dusty-rose" style={{ boxShadow: "0 0 8px #D98B9A" }} />
            SYSTEM / ONLINE
          </span>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-obsidian md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="font-display text-3xl text-bone"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
