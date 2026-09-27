"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

function Steam({ position }: { position: [number, number, number] }) {
  const ref = React.useRef<THREE.Points>(null);
  const count = 24;
  const { positions, phases } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.03;
      positions[i * 3 + 1] = Math.random() * 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  useFrame((state) => {
    const geom = ref.current?.geometry;
    if (!geom) return;
    const attr = geom.attributes.position as THREE.BufferAttribute;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + 0.0018;
      if (y > 0.24) y = 0;
      const x = Math.sin(t * 1.2 + phases[i]) * 0.012;
      attr.setXYZ(i, x, y, attr.getZ(i));
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.014} color="#FFFDF8" transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

export function CoffeeCup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.045, 0.038, 0.07, 20]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.065, 0]}>
        <cylinderGeometry args={[0.037, 0.037, 0.004, 20]} />
        <meshStandardMaterial color="#321B24" roughness={0.7} />
      </mesh>
      <mesh position={[0.05, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.018, 0.006, 8, 16]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.35} />
      </mesh>
      <Steam position={[0, 0.07, 0]} />
    </group>
  );
}

export function DeskLamp({ position }: { position: [number, number, number] }) {
  const lightRef = React.useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!lightRef.current) return;
    // barely-there flicker — a suggestion of warmth, not a strobe
    lightRef.current.intensity = 0.55 + Math.sin(state.clock.getElapsedTime() * 6) * 0.015;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#D9B66F" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.26, 8]} />
        <meshStandardMaterial color="#D9B66F" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.05, 0.27, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.06, 0.09, 20, 1, true]} />
        <meshStandardMaterial color="#FF5FA2" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <pointLight ref={lightRef} position={[0.07, 0.24, 0]} color="#FFD6E7" intensity={0.55} distance={1.4} />
    </group>
  );
}

export function Pen({ position }: { position: [number, number, number] }) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.02 - 0.15;
  });
  return (
    <group ref={ref} position={position} rotation={[0, 0, -0.15]}>
      <mesh position={[0, 0.006, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.32, 12]} />
        <meshStandardMaterial color="#321B24" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0.15, 0.006, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.006, 0.02, 12]} />
        <meshStandardMaterial color="#D9B66F" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function Flowers({ position }: { position: [number, number, number] }) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
  });
  const petals = ["#FF5FA2", "#C9B6E4", "#FFD6E7"];
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.12, 12]} />
        <meshStandardMaterial color="#A9DDF5" transparent opacity={0.45} roughness={0.15} />
      </mesh>
      {petals.map((c, i) => (
        <mesh key={i} position={[Math.cos(i * 2.1) * 0.02, 0.13 + i * 0.015, Math.sin(i * 2.1) * 0.02]}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshStandardMaterial color={c} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
