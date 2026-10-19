"use client";

import { motion } from "framer-motion";

type Accent = "cherry" | "raspberry" | "lavender" | "baby-blue" | "hot-fuchsia" | "pistachio" | "bubblegum";

interface Props {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  tone?: "buttercream" | "pearl" | "powder";
  /** each section gets its own identity color (dot + background glow)
   * instead of every section sharing the same gold dot — seven
   * sections in a row with one repeated accent was most of what read
   * as "plain" */
  accent?: Accent;
  children: React.ReactNode;
}

const TONES: Record<NonNullable<Props["tone"]>, string> = {
  buttercream: "bg-gradient-to-b from-buttercream to-[#FFEFC4]",
  pearl: "bg-gradient-to-b from-pearl to-[#FFF8EC]",
  powder: "bg-gradient-to-b from-powder-pink/30 to-powder-pink/10",
};

const ACCENTS: Record<Accent, string> = {
  cherry: "#C72C48",
  raspberry: "#B51F52",
  lavender: "#C9B6E4",
  "baby-blue": "#A9DDF5",
  "hot-fuchsia": "#E91E63",
  pistachio: "#B8D8A8",
  bubblegum: "#FF5FA2",
};

/**
 * One consistent shell for every real page section — a gold hairline
 * rule, a small dot bullet next to the eyebrow in that section's own
 * accent color, a soft background glow in the same color, and
 * gradient (not flat) tone backgrounds — so scrolling through seven
 * sections reads as a rhythm with real variety, not one repeated
 * palette note stamped seven times.
 */
export default function SectionShell({ id, eyebrow, title, tone = "buttercream", accent = "cherry", children }: Props) {
  const accentHex = ACCENTS[accent];
  return (
    <section id={id} className={`relative scroll-mt-24 overflow-hidden py-24 md:py-32 ${TONES[tone]}`}>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent"
      />
      {/* a soft glow in the section's own accent color, not a flat wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full blur-3xl"
        style={{ background: accentHex, opacity: 0.1 }}
      />
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="label-tech flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full" style={{ background: accentHex }} />
            {eyebrow}
          </p>
          <h2 className="display-lg mt-3 text-espresso">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
