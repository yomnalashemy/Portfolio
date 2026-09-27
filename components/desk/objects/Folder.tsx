"use client";

import DeskObject from "../DeskObject";

export default function Folder({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  return (
    <DeskObject position={position} label="PROJECTS" cursorLabel="INSPECT" onOpen={onOpen} hitSize={[0.58, 0.12, 0.46]}>
      <group rotation={[0, 0.12, 0]}>
        <mesh position={[0, 0.012, 0]} receiveShadow>
          <roundedBoxGeometry args={[0.5, 0.02, 0.38, 2, 0.008]} />
          <meshStandardMaterial color="#FF5FA2" roughness={0.45} metalness={0.03} envMapIntensity={0.8} />
        </mesh>
        {/* tab */}
        <mesh position={[-0.14, 0.024, -0.17]}>
          <roundedBoxGeometry args={[0.18, 0.006, 0.05, 1, 0.003]} />
          <meshStandardMaterial color="#E91E63" roughness={0.45} envMapIntensity={0.8} />
        </mesh>
      </group>
    </DeskObject>
  );
}
