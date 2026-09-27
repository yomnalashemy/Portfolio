"use client";

import DeskObject from "../DeskObject";

export default function Folder({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="PROJECTS" cursorLabel="INSPECT" onOpen={onOpen}>
      <group rotation={[0, 0.12, 0]}>
        <mesh position={[0, 0.012, 0]} receiveShadow>
          <boxGeometry args={[0.5, 0.02, 0.38]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.55} />
        </mesh>
        {/* tab */}
        <mesh position={[-0.14, 0.024, -0.17]}>
          <boxGeometry args={[0.18, 0.006, 0.05]} />
          <meshStandardMaterial color="#E91E63" roughness={0.55} />
        </mesh>
      </group>
    </DeskObject>
  );
}
