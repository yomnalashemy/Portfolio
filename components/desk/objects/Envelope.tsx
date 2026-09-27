"use client";

import DeskObject from "../DeskObject";

export default function Envelope({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="CONTACT" cursorLabel="WRITE" onOpen={onOpen} hitSize={[0.42, 0.16, 0.32]}>
      <group rotation={[0, 0.22, 0]}>
        <mesh position={[0, 0.006, 0]} receiveShadow>
          <roundedBoxGeometry args={[0.34, 0.012, 0.24, 2, 0.006]} />
          <meshStandardMaterial color="#FFD6E7" roughness={0.5} metalness={0.03} envMapIntensity={0.7} />
        </mesh>
        {/* flap — a nearly-flat pyramid lying against the envelope reads
            as a folded paper triangle; the earlier tall cone read as a
            random spike from most angles */}
        <mesh position={[0, 0.013, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.165, 0.02, 4]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.45} envMapIntensity={0.7} />
        </mesh>
      </group>
    </DeskObject>
  );
}
