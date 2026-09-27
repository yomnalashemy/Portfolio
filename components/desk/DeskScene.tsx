"use client";

import { Canvas } from "@react-three/fiber";
import * as React from "react";

import { usePanels } from "@/components/panels/PanelContext";

import CameraRig from "./CameraRig";
import DustParticles from "./DustParticles";
import { CoffeeCup, DeskLamp, Flowers, Pen } from "./objects/Ambient";
import Envelope from "./objects/Envelope";
import Folder from "./objects/Folder";
import LabVessels from "./objects/LabVessels";
import Laptop from "./objects/Laptop";
import Notebook from "./objects/Notebook";
import ResumeNote from "./objects/ResumeNote";

function DeskSurface() {
  return (
    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[6, 6]} />
      <meshStandardMaterial color="#F3EEE7" roughness={0.75} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} color="#FFF4D8" />
      <directionalLight position={[2, 3, 2]} intensity={0.9} color="#FFD6E7" castShadow shadow-mapSize={[512, 512]} />
      <pointLight position={[-1.5, 1, -1]} intensity={0.3} color="#C9B6E4" />
    </>
  );
}

export default function DeskScene({ trackEl }: { trackEl: React.RefObject<HTMLDivElement> }) {
  const { open } = usePanels();
  const introDone = React.useRef(false);

  return (
    <div data-desk-canvas className="fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#FFF4D8"]} />
        <fog attach="fog" args={["#FFF4D8", 4, 9]} />
        <CameraRig trackEl={trackEl} introDone={introDone} />
        <Lighting />
        <DeskSurface />
        <DustParticles count={110} />

        {/* hero objects: cast + receive, worth the shadow cost */}
        <Laptop position={[-0.05, 0, -0.15]} onOpen={() => open("work")} />
        <Notebook position={[0.42, 0, 0.12]} onOpen={() => open("about")} />
        <Folder position={[-0.42, 0, 0.18]} onOpen={() => open("work")} />
        <ResumeNote position={[0.02, 0, 0.42]} onOpen={() => open("resume")} />
        <Envelope position={[0.5, 0, -0.28]} onOpen={() => open("contact")} />
        <LabVessels position={[-0.5, 0, -0.32]} onOpen={() => open("about")} />

        {/* ambient-only: no shadow casting, kept cheap */}
        <CoffeeCup position={[0.28, 0, 0.38]} />
        <DeskLamp position={[-0.55, 0, 0.42]} />
        <Pen position={[0.1, 0, 0.28]} />
        <Flowers position={[0.55, 0, 0.1]} />
      </Canvas>
    </div>
  );
}
