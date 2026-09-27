"use client";

import DeskObject from "../DeskObject";

export default function Envelope({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="CONTACT" cursorLabel="WRITE" onOpen={onOpen}>
      <group rotation={[0, 0.22, 0]}>
        <mesh position={[0, 0.006, 0]} receiveShadow>
          <boxGeometry args={[0.34, 0.012, 0.24]} />
          <meshStandardMaterial color="#FFD6E7" roughness={0.6} />
        </mesh>
        {/* flap triangle */}
        <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.12, 4]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.55} />
        </mesh>
      </group>
    </DeskObject>
  );
}
