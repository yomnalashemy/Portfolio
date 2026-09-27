"use client";

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
  return (
    <>
      <DeskScene trackEl={trackEl} />
      {/* scroll distance for the cinematic intro fly-through; the canvas
          itself is fixed and reads this element's position via
          ScrollTrigger inside CameraRig */}
      <div ref={trackEl} className="relative z-10 h-[220vh]">
        <div className="sticky top-8 flex justify-center pt-6">
          <p className="label-tech animate-pulse">scroll to walk in</p>
        </div>
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
