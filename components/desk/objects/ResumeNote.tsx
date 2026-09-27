"use client";

import { DoubleSide } from "three";

import DeskObject from "../DeskObject";

export default function ResumeNote({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="RESUME" cursorLabel="OPEN" onOpen={onOpen}>
      <group rotation={[0, -0.08, 0]}>
        <mesh position={[0, 0.008, 0]} receiveShadow>
          <boxGeometry args={[0.32, 0.012, 0.42]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.85} />
        </mesh>
        {/* sticky note corner */}
        <mesh position={[0.09, 0.02, -0.14]} rotation={[-Math.PI / 2, 0, 0.35]}>
          <planeGeometry args={[0.1, 0.1]} />
          <meshStandardMaterial color="#FFD6E7" roughness={0.7} side={DoubleSide} />
        </mesh>
      </group>
    </DeskObject>
  );
}
