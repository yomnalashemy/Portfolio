"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const LINKS = [
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "WORKBENCH", href: "/workbench" },
  { label: "LAB", href: "/lab" },
  { label: "RESUME", href: "/resume" },
  { label: "CONTACT", href: "/contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 font-mono text-xs transition-colors duration-500 md:px-10 ${
          scrolled || pathname !== "/" ? "bg-buttercream/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="font-display text-lg text-cherry">
          YOMNA
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              data-cursor="GO"
              className="tracking-[0.18em] transition-colors hover:text-raspberry"
              style={{ color: pathname === l.href ? "#B51F52" : "rgba(50,27,36,0.6)" }}
            >
              {l.label}
            </Link>
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
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={l.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-espresso">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
