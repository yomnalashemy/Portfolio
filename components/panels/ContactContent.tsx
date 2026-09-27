"use client";

import { ArrowUpRight } from "lucide-react";

import { socialMedia } from "@/data";

import MagneticLink from "../archive/MagneticLink";

export default function ContactContent() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-cherry/10 bg-pearl px-6 py-14 text-center shadow-[0_24px_55px_-30px_rgba(50,27,36,0.45)] md:px-14">
      {/* a gold-sealed envelope flap, as the frame for the whole section
          rather than a separate object off to the side */}
      <svg
        aria-hidden
        viewBox="0 0 400 140"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-[90px] w-full text-powder-pink/70"
      >
        <path d="M0 0 L200 110 L400 0 Z" fill="currentColor" />
      </svg>
      <span
        aria-hidden
        className="absolute left-1/2 top-[68px] grid size-9 -translate-x-1/2 place-items-center rounded-full border-2 border-champagne-gold bg-pearl font-display text-sm text-champagne-gold shadow-[0_2px_6px_rgba(50,27,36,0.3)]"
      >
        Y
      </span>

      <div className="relative flex flex-col items-center gap-8 pt-6">
        <p className="display-lg text-espresso">
          LET&rsquo;S BUILD SOMETHING <span className="italic-phrase text-cherry">beautiful.</span>
        </p>

        <MagneticLink
          href="mailto:yomnaalshemy11@gmail.com"
          cursorLabel="WRITE"
          className="inline-flex items-center gap-2 rounded-full border border-raspberry px-6 py-3 font-mono text-sm text-raspberry transition-colors hover:bg-powder-pink"
        >
          yomnaalshemy11@gmail.com
          <ArrowUpRight className="size-4" />
        </MagneticLink>

        <div className="flex items-center gap-5">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="label-tech hover:text-espresso">
            RESUME
          </a>
          {socialMedia
            .filter((s) => s.link)
            .map((s) => (
              <a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className="label-tech hover:text-espresso">
                GITHUB
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
