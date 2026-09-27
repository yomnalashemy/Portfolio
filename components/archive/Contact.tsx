"use client";

import { ArrowUpRight } from "lucide-react";

import { socialMedia } from "@/data";

import MagneticLink from "./MagneticLink";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(233,79,135,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="label-tech mb-8 text-steel">07 / CONTACT</p>
        <h2 className="display-xl text-bone">
          LET&rsquo;S MAKE SOMETHING
          <br />
          <span className="text-electric-pink">WORTH INVESTIGATING.</span>
        </h2>

        <div className="mt-14 flex flex-col items-center gap-6">
          <MagneticLink
            href="mailto:yomnaalshemy11@gmail.com"
            cursorLabel="EMAIL"
            className="inline-flex items-center gap-2 rounded-full border border-dusty-rose px-7 py-3.5 font-mono text-sm text-bone transition-colors hover:bg-dusty-rose/10"
          >
            yomnaalshemy11@gmail.com
            <ArrowUpRight className="size-4" />
          </MagneticLink>

          <div className="flex items-center gap-4">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="label-tech text-steel hover:text-bone">
              RESUME
            </a>
            {socialMedia
              .filter((s) => s.link)
              .map((s) => (
                <a
                  key={s.id}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-tech text-steel hover:text-bone"
                >
                  GITHUB
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
