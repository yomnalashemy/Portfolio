"use client";

import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";

import Loader from "@/components/archive/Loader";
import MobileHome from "@/components/mobile/MobileHome";
import RecruiterHUD from "@/components/desk/RecruiterHUD";
import SiteFooter from "@/components/sections/SiteFooter";

const DeskScene = dynamic(() => import("@/components/desk/DeskScene"), { ssr: false });

const HUB = [
  { href: "/work", eyebrow: "01", label: "THE ARCHIVE", title: "Work", desc: "Six systems, all still running.", accent: "#C72C48" },
  { href: "/about", eyebrow: "02", label: "THE NOTEBOOK", title: "About", desc: "Not a bio. A working notebook.", accent: "#B51F52" },
  { href: "/experience", eyebrow: "03", label: "THE TIMELINE", title: "Experience", desc: "A real timeline, not a résumé line.", accent: "#C9B6E4" },
  { href: "/workbench", eyebrow: "04", label: "THE WORKBENCH", title: "Workbench", desc: "Not a percentage bar.", accent: "#A9DDF5" },
  { href: "/lab", eyebrow: "05", label: "THE LAB", title: "Lab", desc: "Notes from the margins.", accent: "#E91E63" },
  { href: "/resume", eyebrow: "06", label: "THE DOCUMENT", title: "Résumé", desc: "Scented, allegedly.", accent: "#B8D8A8" },
  { href: "/contact", eyebrow: "07", label: "THE ENVELOPE", title: "Contact", desc: "Let's talk.", accent: "#FF5FA2" },
] as const;

function HomeHub() {
  return (
    <section id="main-content" tabIndex={-1} className="relative bg-buttercream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="label-tech flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-champagne-gold" />
          WHERE TO
        </p>
        <h2 className="display-lg mt-3 text-espresso">
          Seven real places. <span className="italic-phrase text-cherry">Pick one.</span>
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB.map((h) => (
            <Link
              key={h.href}
              href={h.href}
              data-cursor="GO"
              className="group relative overflow-hidden rounded-xl border border-cherry/10 bg-pearl p-6 shadow-[0_14px_30px_-20px_rgba(50,27,36,0.3)] transition-transform hover:-translate-y-1"
              style={{ borderTopColor: h.accent, borderTopWidth: 3 }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: h.accent, opacity: 0.18 }}
              />
              <p className="label-tech" style={{ color: h.accent }}>
                {h.eyebrow} / {h.label}
              </p>
              <h3 className="mt-2 flex items-center gap-1.5 font-display text-2xl text-espresso">
                {h.title}
                <ArrowUpRight className="size-4 text-espresso/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="mt-2 text-sm text-espresso/70">{h.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopExperience() {
  return (
    <>
      <section aria-labelledby="home-title" className="relative z-10 flex min-h-[100svh] flex-col">
        <DeskScene />
        <div className="pointer-events-none absolute left-6 right-6 top-24 z-10 flex flex-col items-start text-left md:left-[7vw] md:right-auto md:top-[22vh] md:max-w-[43vw]">
          <h1 id="home-title" className="font-display text-[clamp(2.4rem,5.6vw,5.7rem)] leading-[0.88] tracking-[-0.06em] text-espresso">YOMNA ALSHEMY</h1>
          <p className="label-tech mt-3">LIVE SYSTEMS</p>
          <p className="label-tech mt-2 max-w-[28rem] text-left text-espresso/55">software · systems · infrastructure · curiosity</p>
        </div>
        <RecruiterHUD />
      </section>
      <div className="relative z-20 bg-buttercream">
        <HomeHub />
        <SiteFooter />
      </div>
    </>
  );
}

const Home = () => {
  const [isDesktop, setIsDesktop] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <Loader />
      {isDesktop === null ? null : isDesktop ? <DesktopExperience /> : <MobileHome />}
    </>
  );
};

export default Home;
