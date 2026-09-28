"use client";

import { Html } from "@react-three/drei";

import DeskObject from "../DeskObject";
import { getKeyboardTexture } from "../keyboardTexture";

export default function Laptop({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject
      position={position}
      label="WORK"
      cursorLabel="INSPECT"
      onOpen={onOpen}
      hitSize={[1.25, 0.85, 1.05]}
    >
      {/* base — glossy plastic is low metalness, low roughness, and
          something to reflect (see EnvironmentSetup), not high
          metalness, which reads as brushed metal instead */}
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <roundedBoxGeometry args={[1.15, 0.07, 0.78, 4, 0.015]} />
        <meshStandardMaterial color="#FF5FA2" roughness={0.18} metalness={0.06} envMapIntensity={1.1} />
      </mesh>

      {/* keyboard — an actual grid of recessed keys baked into a
          texture, not a flat rectangle standing in for one */}
      <mesh position={[0, 0.0715, -0.08]}>
        <planeGeometry args={[0.86, 0.32]} />
        <meshStandardMaterial map={getKeyboardTexture()} roughness={0.75} envMapIntensity={0.3} />
      </mesh>

      {/* trackpad — glossy glass, distinct from the matte keys */}
      <mesh position={[0, 0.0715, 0.24]}>
        <roundedBoxGeometry args={[0.32, 0.001, 0.2, 3, 0.012]} />
        <meshStandardMaterial color="#3a2430" roughness={0.12} metalness={0.1} envMapIntensity={1.3} />
      </mesh>

      {/* hinge */}
      <mesh position={[0, 0.07, -0.375]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.0, 12]} />
        <meshStandardMaterial color="#B51F52" roughness={0.3} metalness={0.15} envMapIntensity={1} />
      </mesh>

      {/* screen, tilted back */}
      <group position={[0, 0.07, -0.37]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <roundedBoxGeometry args={[1.15, 0.78, 0.04, 4, 0.02]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.2} metalness={0.06} envMapIntensity={1.1} />
        </mesh>
        <mesh position={[0, 0.4, 0.023]}>
          <planeGeometry args={[1.02, 0.66]} />
          <meshStandardMaterial color="#321B24" emissive="#4a2836" emissiveIntensity={0.4} roughness={0.4} />
        </mesh>
        {/* the screen actually lights the desk in front of it, instead
            of just being an emissive plane nothing else responds to */}
        <pointLight position={[0, 0.4, 0.3]} color="#FFD6E7" intensity={0.4} distance={1.1} decay={2} />
        <Html transform position={[0, 0.4, 0.026]} distanceFactor={1.1} style={{ pointerEvents: "none" }}>
          {/* larger than feels necessary up close — the camera settles
              much farther back now, which shrinks transform-mode Html
              proportionally like any other object in the scene */}
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
