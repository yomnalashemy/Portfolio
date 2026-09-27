"use client";

import DeskObject from "../DeskObject";

export default function Notebook({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="ABOUT" cursorLabel="OPEN" onOpen={onOpen} hitSize={[0.68, 0.16, 0.52]}>
      <group rotation={[0, -0.18, 0]}>
        {/* pages */}
        <mesh position={[0.005, 0.028, 0.005]}>
          <boxGeometry args={[0.56, 0.05, 0.42]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.9} />
        </mesh>
        {/* cover */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.03, 0.44]} />
          <meshStandardMaterial color="#B51F52" roughness={0.5} metalness={0.05} />
        </mesh>
        {/* gold corner detail */}
        <mesh position={[0.26, 0.076, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.032, 3]} />
          <meshStandardMaterial color="#D9B66F" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </DeskObject>
  );
}
