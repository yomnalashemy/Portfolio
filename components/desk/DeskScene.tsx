"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, extend, type Object3DNode } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import CameraRig from "./CameraRig";
import DustParticles from "./DustParticles";
import EnvironmentSetup from "./EnvironmentSetup";
import { CoffeeCup, DeskLamp, Flowers, Pen } from "./objects/Ambient";
import Envelope from "./objects/Envelope";
import Folder from "./objects/Folder";
import LabVessels from "./objects/LabVessels";
import Laptop from "./objects/Laptop";
import Notebook from "./objects/Notebook";
import PaperPlane from "./objects/PaperPlane";
import ResumeNote from "./objects/ResumeNote";
import Signet from "./objects/Signet";

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
      {/* was a 6x6 plane — its physical edge sat inside the camera's
          frustum and read as a hard horizontal "end of the world" line
          across the frame instead of fading into the background via
          fog. 60x60 puts that edge well past the fog's far=9 falloff,
          so only the fog gradient is ever visible, never the geometry. */}
      {/* was #F3EEE7 — a hair off the #FFF4D8 background color, so the
          floor had almost no value contrast against the sky and read as
          one undifferentiated blur instead of a distinct ground plane */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#CFC5B4" roughness={0.65} envMapIntensity={0.5} />
      </mesh>
      {/* a desk mat, not just a bare surface — grounds the whole object
          cluster instead of everything floating loose on plain cream,
          and the thin gold reveal at the edge is the one recurring
          "luxury stationery" detail (matches the notebook's gold corner,
          the pen's gold tip, the lamp's gold arm) rather than a one-off */}
      <mesh position={[0, 0.0015, 0.05]} receiveShadow>
        <roundedBoxGeometry args={[1.82, 0.004, 1.42, 4, 0.07]} />
        <meshStandardMaterial color="#D9B66F" roughness={0.3} metalness={0.55} envMapIntensity={1.3} />
      </mesh>
      <mesh position={[0, 0.003, 0.05]} receiveShadow>
        <roundedBoxGeometry args={[1.7, 0.004, 1.3, 4, 0.06]} />
        <meshStandardMaterial color="#FFD6E7" roughness={0.65} envMapIntensity={0.4} />
      </mesh>
    </>
  );
}

function Lighting() {
  // ambient light was nearly as strong as the key light (0.45 vs 1.1) —
  // ambient has no direction, so it washes a flat, equal amount of light
  // over every surface regardless of its normal, which is exactly what
  // erases the light/shadow gradient that makes an edge read as an edge.
  // Dropping it and letting the directional key dominate restores that
  // gradient; the two point lights are dialed back to match so they
  // still add color without flattening the new contrast back out.
  return (
    <>
      <ambientLight intensity={0.22} color="#FFF4D8" />
      <directionalLight position={[2, 3, 2]} intensity={1.6} color="#FFD6E7" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-1.5, 1, -1]} intensity={0.2} color="#C9B6E4" />
      {/* a second, cooler fill so surfaces show two distinct highlights
          instead of one flat wash — cheap and reads as far less "flat CG" */}
      <pointLight position={[1.2, 0.8, 1.5]} intensity={0.15} color="#A9DDF5" />
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
  const router = useRouter();

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
        {/* the directional light's own shadow map was there, but barely
            visible — every object read as floating with no contact
            point. A blurred contact-shadow catcher is the reliable fix:
            it doesn't depend on tuning a shadow camera frustum blind. */}
        <ContactShadows position={[0, 0.001, 0.05]} opacity={0.45} scale={2.4} blur={2.2} far={0.6} resolution={512} color="#321B24" />
        <DustParticles count={110} />

        {/* hero objects: cast + receive, worth the shadow cost. onOpen
            navigates to the real page — these are a second way in to
            each page, not the only way in. */}
        <Laptop position={[-0.05, 0, -0.15]} onOpen={() => router.push("/work")} />
        <Notebook position={[0.42, 0, 0.12]} onOpen={() => router.push("/about")} />
        <Folder position={[-0.42, 0, 0.18]} onOpen={() => router.push("/work")} />
        <ResumeNote position={[0.02, 0, 0.42]} onOpen={() => router.push("/resume")} />
        <Envelope position={[0.5, 0, -0.28]} onOpen={() => router.push("/contact")} />
        <LabVessels position={[-0.5, 0, -0.32]} onOpen={() => router.push("/about")} />
        <Signet position={[0.7, 0, -0.42]} onOpen={() => router.push("/about")} />

        {/* ambient-only: no shadow casting, kept cheap */}
        <CoffeeCup position={[0.28, 0, 0.38]} />
        <DeskLamp position={[-0.55, 0, 0.42]} />
        <Pen position={[0.1, 0, 0.28]} />
        <Flowers position={[0.55, 0, 0.1]} />
        {/* the one-time flying entrance — soars in once on load, then
            settles into a gentle hover; respects prefers-reduced-motion
            by skipping straight to its settled position */}
        <PaperPlane />
      </Canvas>
    </div>
  );
}
