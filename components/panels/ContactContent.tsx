"use client";

import { ArrowUpRight } from "lucide-react";

import { socialMedia } from "@/data";

import MagneticLink from "../archive/MagneticLink";

export default function ContactContent() {
  return (
    <div className="flex flex-col items-center gap-8 py-4 text-center">
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
  );
}
