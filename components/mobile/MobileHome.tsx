"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import SiteFooter from "@/components/sections/SiteFooter";

const HUB = [
  { href: "/work", eyebrow: "01 / THE ARCHIVE", title: "Work", desc: "Six systems, all still running.", accent: "#C72C48" },
  { href: "/about", eyebrow: "02 / THE NOTEBOOK", title: "About", desc: "Not a bio. A working notebook.", accent: "#B51F52" },
  { href: "/experience", eyebrow: "03 / THE TIMELINE", title: "Experience", desc: "A real timeline, not a résumé line.", accent: "#C9B6E4" },
  { href: "/workbench", eyebrow: "04 / THE WORKBENCH", title: "Workbench", desc: "Not a percentage bar.", accent: "#A9DDF5" },
  { href: "/lab", eyebrow: "05 / THE LAB", title: "Lab", desc: "Notes from the margins.", accent: "#E91E63" },
  { href: "/resume", eyebrow: "06 / THE DOCUMENT", title: "Résumé", desc: "Scented, allegedly.", accent: "#B8D8A8" },
  { href: "/contact", eyebrow: "07 / THE ENVELOPE", title: "Contact", desc: "Let's talk.", accent: "#FF5FA2" },
] as const;

/**
 * The brief is explicit: don't shrink the desktop 3D scene onto mobile,
 * build a mobile-native composition instead. Same real destinations as
 * desktop's hub, same real pages behind them — a tap list instead of a
 * card grid, since that's what fits a phone width without the content
 * density desktop's layout assumes.
 */
export default function MobileHome() {
  return (
    <>
      <main className="min-h-screen bg-buttercream px-5 pb-16 pt-28">
        <p className="script-note text-3xl">Yomna Alshemy</p>
        <h1 className="display-lg mt-2 text-espresso">
          Live systems, <span className="italic-phrase text-cherry">on a real desk.</span>
        </h1>
        <p className="mt-4 text-sm text-espresso/70">
          Software · systems · infrastructure · curiosity. The full interactive desk lives on desktop —
          here&rsquo;s everywhere it leads.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {HUB.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              className="relative overflow-hidden rounded-xl border border-cherry/10 bg-pearl px-5 py-4 shadow-[0_14px_30px_-20px_rgba(50,27,36,0.3)]"
              style={{ borderLeftColor: h.accent, borderLeftWidth: 3 }}
            >
              <p className="label-tech" style={{ color: h.accent }}>
                {h.eyebrow}
              </p>
              <h2 className="mt-1 flex items-center gap-1.5 font-display text-xl text-espresso">
                {h.title}
                <ArrowUpRight className="size-3.5 text-espresso/40" />
              </h2>
              <p className="mt-1 text-sm text-espresso/70">{h.desc}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
