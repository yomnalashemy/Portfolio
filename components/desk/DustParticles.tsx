"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

/** Dust drifting through warm light, not generic space particles — slow
 * downward sway, gold/pink tint, one mutated buffer, no per-particle
 * React overhead. */
export default function DustParticles({ count = 180 }: { count?: number }) {
  const ref = React.useRef<THREE.Points>(null);
  const { positions, phases } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, [count]);

  useFrame((state) => {
    const geom = ref.current?.geometry;
    if (!geom) return;
    const attr = geom.attributes.position as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const y = attr.getY(i) - 0.0025;
      const wrapped = y < -3 ? 3 : y;
      const sway = Math.sin(t * 0.3 + phases[i]) * 0.002;
      attr.setXYZ(i, attr.getX(i) + sway, wrapped, attr.getZ(i));
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#D9B66F" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}
