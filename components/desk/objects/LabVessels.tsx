"use client";

import DeskObject from "../DeskObject";

const VESSELS: { x: number; z: number; h: number; liquid: string }[] = [
  { x: -0.14, z: 0, h: 0.16, liquid: "#FF5FA2" },
  { x: 0, z: 0.02, h: 0.22, liquid: "#B8D8A8" },
  { x: 0.14, z: 0, h: 0.14, liquid: "#A9DDF5" },
];

/** Skills, as a tiny bench of glass vessels rather than progress bars —
 * ambient/discoverable; opens the About notebook, which has a real
 * skills page for anyone not exploring the 3D scene. */
export default function LabVessels({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="EXPERIMENTS" cursorLabel="INSPECT" onOpen={onOpen}>
      {/* connecting tube */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.3, 8]} />
        <meshStandardMaterial color="#72747C" metalness={0.6} roughness={0.3} />
      </mesh>

      {VESSELS.map((v, i) => (
        <group key={i} position={[v.x, 0, v.z]}>
          <mesh position={[0, v.h / 2 + 0.02, 0]}>
            <cylinderGeometry args={[0.035, 0.035, v.h, 16]} />
            <meshPhysicalMaterial
              color="#FFFDF8"
              transparent
              opacity={0.35}
              roughness={0.05}
              transmission={0.9}
              thickness={0.05}
              ior={1.3}
            />
          </mesh>
          <mesh position={[0, v.h * 0.32 + 0.02, 0]}>
            <cylinderGeometry args={[0.032, 0.032, v.h * 0.5, 16]} />
            <meshStandardMaterial color={v.liquid} roughness={0.3} transparent opacity={0.85} />
          </mesh>
        </group>
      ))}
    </DeskObject>
  );
}
