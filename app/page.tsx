"use client";

import { motion, MotionConfig, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import * as React from "react";

import CustomCursor from "@/components/archive/CustomCursor";
import Loader from "@/components/archive/Loader";
import Nav from "@/components/archive/Nav";
import MobileHome from "@/components/mobile/MobileHome";
import AboutContent from "@/components/panels/AboutContent";
import ContactContent from "@/components/panels/ContactContent";
import LabContent from "@/components/panels/LabContent";
import ResumeContent from "@/components/panels/ResumeContent";
import WorkContent from "@/components/panels/WorkContent";
import SectionShell from "@/components/sections/SectionShell";

const DeskScene = dynamic(() => import("@/components/desk/DeskScene"), { ssr: false });

function DesktopExperience() {
  const trackEl = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackEl, offset: ["start start", "end end"] });
  // Bottom of the viewport, not the top — pinned near the laptop screen
  // was the "scroll to walk in" hint overlapping it. Fades out once
  // scrolling has clearly started instead of lingering the whole intro.
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.82, 1], [1, 0]);

  const [heroPaused, setHeroPaused] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setHeroPaused(v >= 0.999));

  return (
    <>
      <motion.div style={{ opacity: heroOpacity }}>
        <DeskScene trackEl={trackEl} paused={heroPaused} />
      </motion.div>
      {/* scroll distance for the cinematic intro fly-through; the canvas
          itself is fixed and reads this element's position via
          ScrollTrigger inside CameraRig */}
      <div ref={trackEl} className="relative z-10 h-[220vh]" />
      {/* fixed, not sticky — sticky needs sibling flow content on either
          side to react against, which this lone hint doesn't have, and
          it wasn't reliably pinning to the viewport bottom as a result */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none fixed inset-x-0 bottom-10 z-10 flex justify-center"
      >
        <p className="label-tech animate-pulse">scroll to walk in</p>
      </motion.div>

      {/* real, always-scrollable sections — the desk's objects and the
          nav are a second way into these, not the only way in */}
      <div className="relative z-20 bg-buttercream">
        <SectionShell id="work" eyebrow="01 / THE ARCHIVE" title={<>Six systems. <span className="italic-phrase text-cherry">All of them running.</span></>} tone="buttercream">
          <WorkContent />
        </SectionShell>
        <SectionShell id="about" eyebrow="02 / THE NOTEBOOK" title={<>Not a bio. <span className="italic-phrase text-raspberry">A working notebook.</span></>} tone="pearl">
          <AboutContent />
        </SectionShell>
        <SectionShell id="lab" eyebrow="03 / THE LAB" title={<>Notes from the <span className="italic-phrase text-hot-fuchsia">margins.</span></>} tone="powder">
          <LabContent />
        </SectionShell>
        <SectionShell id="resume" eyebrow="04 / THE DOCUMENT" title={<>The résumé. <span className="italic-phrase text-cherry">Scented, allegedly.</span></>} tone="pearl">
          <ResumeContent />
        </SectionShell>
        <SectionShell id="contact" eyebrow="05 / THE ENVELOPE" title="Let's talk." tone="buttercream">
          <ContactContent />
        </SectionShell>

        <footer className="border-t border-cherry/10 bg-espresso px-6 py-10 text-center md:px-10">
          <p className="label-tech text-pearl/50">
            SYSTEM STATUS: <span className="text-pistachio">ONLINE</span>
          </p>
          <p className="script-note mt-3" style={{ color: "#FFD6E7" }}>
            Thanks for stopping by.
          </p>
        </footer>
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
    // "user" makes every Framer Motion animation site-wide respect the OS
    // prefers-reduced-motion setting automatically — the CSS override in
    // globals.css only catches plain CSS transitions/@keyframes, not the
    // Web Animations API calls Framer Motion uses under the hood.
    <MotionConfig reducedMotion="user">
      <div className="grain" />
      <Loader />
      <CustomCursor />
      <Nav />
      {isDesktop === null ? null : isDesktop ? <DesktopExperience /> : <MobileHome />}
    </MotionConfig>
  );
};

export default Home;
