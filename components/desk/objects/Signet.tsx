"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

import DeskObject from "../DeskObject";
import { getMonogramTexture } from "../monogramTexture";

/** The desk's stand-in for "her." No photo or physical description exists
 * anywhere in this repo to build a human figure from honestly, so rather
 * than guess, this reuses the monogram seal already established and
 * approved in public/favicon.svg — a small standing plaque, not a face. */
export default function Signet({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  const faceMat = React.useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!faceMat.current) return;
    // a slow breathing glow — "present," not static, echoing the
    // footer's SYSTEM STATUS: ONLINE line
    faceMat.current.emissiveIntensity = 0.28 + Math.sin(state.clock.getElapsedTime() * 1.4) * 0.14;
  });

  return (
    <DeskObject position={position} label="YOMNA" cursorLabel="HI" onOpen={onOpen} hitSize={[0.24, 0.22, 0.16]}>
      <group rotation={[0, -0.3, 0]}>
        {/* gold backing — a thin frame around the face, same ratio as
            the favicon's stroked ring */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <roundedBoxGeometry args={[0.15, 0.15, 0.012, 3, 0.018]} />
          <meshStandardMaterial color="#D9B66F" metalness={0.5} roughness={0.3} envMapIntensity={1} />
        </mesh>
        {/* the monogram itself — cherry ground, gold ring, serif "Y",
            baked once onto a plane (predictable, always-upright UVs,
            same technique as the laptop's keyboard texture) */}
        <mesh position={[0, 0.08, 0.009]}>
          <planeGeometry args={[0.132, 0.132]} />
          <meshStandardMaterial
            ref={faceMat}
            map={getMonogramTexture()}
            roughness={0.35}
            metalness={0.05}
            envMapIntensity={0.9}
            emissive="#C72C48"
            emissiveIntensity={0.28}
          />
        </mesh>
        {/* a small easel strut so it stands on the desk rather than floats */}
        <mesh position={[0, 0.025, -0.045]} rotation={[0.6, 0, 0]}>
          <roundedBoxGeometry args={[0.018, 0.08, 0.008, 1, 0.003]} />
          <meshStandardMaterial color="#D9B66F" metalness={0.5} roughness={0.3} envMapIntensity={1} />
        </mesh>
      </group>
    </DeskObject>
  );
}
