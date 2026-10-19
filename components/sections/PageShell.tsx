"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Accent = "cherry" | "raspberry" | "lavender" | "baby-blue" | "hot-fuchsia" | "pistachio" | "bubblegum";

const ACCENTS: Record<Accent, string> = {
  cherry: "#C72C48",
  raspberry: "#B51F52",
  lavender: "#C9B6E4",
  "baby-blue": "#A9DDF5",
  "hot-fuchsia": "#E91E63",
  pistachio: "#B8D8A8",
  bubblegum: "#FF5FA2",
};

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  accent: Accent;
  children: React.ReactNode;
}

/**
 * The standalone-page equivalent of SectionShell — same gold hairline,
 * same accent-colored dot + background glow, same reveal animation —
 * but a real page (back-to-home link, full viewport height, no
 * alternating tone since it's the only section on the page) instead of
 * one block in a long stack.
 */
export default function PageShell({ eyebrow, title, accent, children }: Props) {
  const accentHex = ACCENTS[accent];
  return (
    <main className="relative min-h-screen overflow-hidden bg-buttercream pb-24 pt-28 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full blur-3xl"
        style={{ background: accentHex, opacity: 0.12 }}
      />
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Link
          href="/"
          className="label-tech inline-flex items-center gap-1.5 text-espresso/60 hover:text-raspberry"
        >
          <ArrowLeft className="size-3.5" /> back home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 mt-8"
        >
          <p className="label-tech flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full" style={{ background: accentHex }} />
            {eyebrow}
          </p>
          <h1 className="display-lg mt-3 text-espresso">{title}</h1>
        </motion.div>

        {children}
      </div>
    </main>
  );
}
