"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  tone?: "buttercream" | "pearl" | "powder";
  children: React.ReactNode;
}

const TONES: Record<NonNullable<Props["tone"]>, string> = {
  buttercream: "bg-buttercream",
  pearl: "bg-pearl",
  powder: "bg-powder-pink/25",
};

/**
 * One consistent shell for every real page section — a gold hairline
 * rule, a small pearl-dot bullet next to the eyebrow (a tiny recurring
 * "stationery" motif rather than a bare label), and alternating tone
 * backgrounds so scrolling through five sections reads as a rhythm, not
 * one flat undifferentiated page.
 */
export default function SectionShell({ id, eyebrow, title, tone = "buttercream", children }: Props) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 md:py-32 ${TONES[tone]}`}>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent"
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
            <span aria-hidden className="size-1.5 rounded-full bg-champagne-gold" />
            {eyebrow}
          </p>
          <h2 className="display-lg mt-3 text-espresso">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
