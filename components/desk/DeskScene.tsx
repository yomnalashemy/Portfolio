"use client";

import { Canvas, extend, type Object3DNode } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { scrollToId } from "@/lib/scrollToId";

import CameraRig from "./CameraRig";
import DustParticles from "./DustParticles";
import EnvironmentSetup from "./EnvironmentSetup";
import { CoffeeCup, DeskLamp, Flowers, Pen } from "./objects/Ambient";
import Envelope from "./objects/Envelope";
import Folder from "./objects/Folder";
import LabVessels from "./objects/LabVessels";
import Laptop from "./objects/Laptop";
import Notebook from "./objects/Notebook";
import ResumeNote from "./objects/ResumeNote";

// registers <roundedBoxGeometry> as a usable JSX intrinsic — sharp box
// corners on every desk object were a big part of the "cheap CG" read
extend({ RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedBoxGeometry: Object3DNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>;
    }
  }
}

function DeskSurface() {
  return (
    <>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#F3EEE7" roughness={0.6} envMapIntensity={0.6} />
      </mesh>
      {/* a desk mat, not just a bare surface — grounds the whole object
          cluster instead of everything floating loose on plain cream,
          and the thin gold reveal at the edge is the one recurring
          "luxury stationery" detail (matches the notebook's gold corner,
          the pen's gold tip, the lamp's gold arm) rather than a one-off */}
      <mesh position={[0, 0.0015, 0.05]} receiveShadow>
        <roundedBoxGeometry args={[1.78, 0.004, 1.38, 4, 0.07]} />
        <meshStandardMaterial color="#D9B66F" roughness={0.4} metalness={0.3} envMapIntensity={1} />
      </mesh>
      <mesh position={[0, 0.003, 0.05]} receiveShadow>
        <roundedBoxGeometry args={[1.7, 0.004, 1.3, 4, 0.06]} />
        <meshStandardMaterial color="#FFD6E7" roughness={0.65} envMapIntensity={0.4} />
      </mesh>
    </>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} color="#FFF4D8" />
      <directionalLight position={[2, 3, 2]} intensity={1.1} color="#FFD6E7" castShadow shadow-mapSize={[512, 512]} />
      <pointLight position={[-1.5, 1, -1]} intensity={0.35} color="#C9B6E4" />
      {/* a second, cooler fill so surfaces show two distinct highlights
          instead of one flat wash — cheap and reads as far less "flat CG" */}
      <pointLight position={[1.2, 0.8, 1.5]} intensity={0.25} color="#A9DDF5" />
    </>
  );
}

export default function DeskScene({
  trackEl,
  paused = false,
}: {
  trackEl: React.RefObject<HTMLDivElement>;
  /** stop the render loop once the hero has scrolled out of view —
      no point spending frames on a canvas nothing can see */
  paused?: boolean;
}) {
  const introDone = React.useRef(false);

  return (
    <div data-desk-canvas className="fixed inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        frameloop={paused ? "never" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#FFF4D8"]} />
        <fog attach="fog" args={["#FFF4D8", 4, 9]} />
        <CameraRig trackEl={trackEl} introDone={introDone} />
        <EnvironmentSetup />
        <Lighting />
        <DeskSurface />
        <DustParticles count={110} />

        {/* hero objects: cast + receive, worth the shadow cost. onOpen
            scrolls to the real page section below — these are a second
            way in, not the only way in. */}
        <Laptop position={[-0.05, 0, -0.15]} onOpen={() => scrollToId("work")} />
        <Notebook position={[0.42, 0, 0.12]} onOpen={() => scrollToId("about")} />
        <Folder position={[-0.42, 0, 0.18]} onOpen={() => scrollToId("work")} />
        <ResumeNote position={[0.02, 0, 0.42]} onOpen={() => scrollToId("resume")} />
        <Envelope position={[0.5, 0, -0.28]} onOpen={() => scrollToId("contact")} />
        <LabVessels position={[-0.5, 0, -0.32]} onOpen={() => scrollToId("about")} />

        {/* ambient-only: no shadow casting, kept cheap */}
        <CoffeeCup position={[0.28, 0, 0.38]} />
        <DeskLamp position={[-0.55, 0, 0.42]} />
        <Pen position={[0.1, 0, 0.28]} />
        <Flowers position={[0.55, 0, 0.1]} />
      </Canvas>
    </div>
  );
}
