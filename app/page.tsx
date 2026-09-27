"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import * as React from "react";

import CustomCursor from "@/components/archive/CustomCursor";
import Loader from "@/components/archive/Loader";
import Nav from "@/components/archive/Nav";
import MobileHome from "@/components/mobile/MobileHome";
import PanelHost from "@/components/panels/PanelHost";
import { PanelProvider } from "@/components/panels/PanelContext";

const DeskScene = dynamic(() => import("@/components/desk/DeskScene"), { ssr: false });

function DesktopExperience() {
  const trackEl = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackEl, offset: ["start start", "end end"] });
  // Bottom of the viewport, not the top — pinned near the laptop screen
  // was the "scroll to walk in" hint overlapping it. Fades out once
  // scrolling has clearly started instead of lingering the whole intro.
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
      <DeskScene trackEl={trackEl} />
      {/* scroll distance for the cinematic intro fly-through; the canvas
          itself is fixed and reads this element's position via
          ScrollTrigger inside CameraRig */}
      <div ref={trackEl} className="relative z-10 h-[220vh]">
        <motion.div
          style={{ opacity: hintOpacity }}
          className="sticky bottom-10 flex justify-center"
        >
          <p className="label-tech animate-pulse">scroll to walk in</p>
        </motion.div>
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
    <PanelProvider>
      <div className="grain" />
      <Loader />
      <CustomCursor />
      <Nav />
      <PanelHost />
      {isDesktop === null ? null : isDesktop ? <DesktopExperience /> : <MobileHome />}
    </PanelProvider>
  );
};

export default Home;
