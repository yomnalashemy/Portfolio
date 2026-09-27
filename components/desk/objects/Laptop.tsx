"use client";

import { Html } from "@react-three/drei";

import DeskObject from "../DeskObject";

export default function Laptop({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject
      position={position}
      label="WORK"
      cursorLabel="INSPECT"
      onOpen={onOpen}
      hitSize={[1.25, 0.85, 1.05]}
    >
      {/* base / keyboard deck */}
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.15, 0.07, 0.78]} />
        <meshStandardMaterial color="#FF5FA2" roughness={0.25} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.075, -0.02]}>
        <boxGeometry args={[1.0, 0.005, 0.62]} />
        <meshStandardMaterial color="#321B24" roughness={0.6} />
      </mesh>

      {/* screen, tilted back */}
      <group position={[0, 0.07, -0.37]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.15, 0.78, 0.04]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.4, 0.023]}>
          <planeGeometry args={[1.02, 0.66]} />
          <meshStandardMaterial color="#321B24" emissive="#4a2836" emissiveIntensity={0.4} roughness={0.4} />
        </mesh>
        <Html transform position={[0, 0.4, 0.026]} distanceFactor={1.1} style={{ pointerEvents: "none" }}>
          {/* larger than feels necessary up close — the camera settles
              much farther back now, which shrinks transform-mode Html
              proportionally like any real object in the scene */}
          <div className="flex w-[260px] flex-col items-center gap-1.5 text-center">
            <p className="font-display text-[22px] leading-none text-powder-pink">YOMNA ALSHEMY</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-pearl/80">Live Systems</p>
            <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.2em] text-pearl/50">
              software · systems · infrastructure · curiosity
            </p>
          </div>
        </Html>
      </group>
    </DeskObject>
  );
}
