"use client";

import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as React from "react";
import * as THREE from "three";

// a folded-paper-airplane silhouette: two triangular "wings" sharing a
// spine, each tilted outward from it (a dihedral V, like an open book)
// rather than one flat triangle — flat geometry lit from one side reads
// as a blank card mid-flight, the V gives it two distinct lit/shadowed
// faces so it reads as a folded object even while tumbling.
function wingShape(mirror: 1 | -1) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(mirror * 0.22, -0.3);
  s.lineTo(0, -0.42);
  s.closePath();
  return s;
}

const START = { x: -3.3, y: 2.7, z: 2.3, rx: 0.5, ry: -0.7, rz: 0.9 };
const SETTLE = { x: 0.55, y: 0.66, z: 0.32, rx: -0.12, ry: 0.5, rz: -0.15 };

/**
 * The hero's one flying entrance flourish — folded from the same
 * "paper" the resume note and envelope are, soaring in once on load
 * and settling into a gentle hover above the desk. Ties to the
 * existing stationery motif rather than inventing an unrelated object,
 * and gives the opening moment real motion instead of everything
 * simply being in-place when the canvas first renders.
 */
export default function PaperPlane() {
  const group = React.useRef<THREE.Group>(null);
  const state = React.useRef({ ...START });
  const settled = React.useRef(false);

  React.useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      state.current = { ...SETTLE };
      settled.current = true;
      return;
    }

    const tl = gsap.timeline({ delay: 0.4, onComplete: () => (settled.current = true) });
    tl.to(state.current, { x: 1.1, y: 1.4, z: 1.1, rx: 0.3, ry: -0.1, rz: 0.4, duration: 1.1, ease: "power2.in" })
      .to(state.current, { ...SETTLE, duration: 1.3, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, []);

  useFrame((frame) => {
    const g = group.current;
    if (!g) return;
    const t = frame.clock.getElapsedTime();
    const bob = settled.current ? Math.sin(t * 0.8) * 0.02 : 0;
    const sway = settled.current ? Math.sin(t * 0.5) * 0.04 : 0;
    g.position.set(state.current.x + sway, state.current.y + bob, state.current.z);
    g.rotation.set(state.current.rx, state.current.ry + sway * 0.3, state.current.rz);
  });

  return (
    <group ref={group} position={[START.x, START.y, START.z]} scale={0.85}>
      {/* both wings share the nose-to-tail edge (x=0) as a hinge —
          rotating each around the local Y axis folds them apart into a
          V without the shared edge ever separating */}
      <mesh rotation={[0, 0.35, 0]} castShadow>
        <shapeGeometry args={[wingShape(-1)]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.65} metalness={0} side={THREE.DoubleSide} envMapIntensity={0.4} />
      </mesh>
      <mesh rotation={[0, -0.35, 0]} castShadow>
        <shapeGeometry args={[wingShape(1)]} />
        <meshStandardMaterial color="#F3EEE7" roughness={0.65} metalness={0} side={THREE.DoubleSide} envMapIntensity={0.4} />
      </mesh>
      {/* the gold crease down the spine, the one recurring luxury-mark
          detail, same as everything else on the desk */}
      <mesh position={[0, -0.21, 0.001]}>
        <planeGeometry args={[0.012, 0.42]} />
        <meshStandardMaterial color="#D9B66F" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}
