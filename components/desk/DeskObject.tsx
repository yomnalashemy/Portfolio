"use client";

import { Html } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

interface Props {
  position: [number, number, number];
  label: string;
  cursorLabel?: string;
  onOpen?: () => void;
  interactive?: boolean;
  /** size of the invisible hit region, centered on its own vertical
   * midpoint — bigger than the visible geometry usually looks/feels
   * better than exact-fit. */
  hitSize?: [number, number, number];
  children: React.ReactNode;
}

/** Every clickable desk item: hover-lift, gentle idle bob, a floating
 * label, and a real click handler — wraps whatever primitive geometry
 * is passed as children so each object file only defines its shape.
 *
 * All pointer handling lives on ONE invisible hitbox mesh rather than on
 * the group (which would otherwise catch bubbled events from whichever
 * of the several visible sub-meshes the ray happens to be hitting). With
 * handlers on the group, hover state flickered every time the raycaster's
 * nearest hit switched between adjacent sibling meshes — e.g. the
 * laptop's base vs. its screen — even while the cursor stayed inside the
 * object's silhouette the whole time. One continuous hitbox has no
 * internal seam for the ray to cross, so hover state stays stable.
 */
export default function DeskObject({
  position,
  label,
  cursorLabel = "OPEN",
  onOpen,
  interactive = true,
  hitSize = [0.55, 0.35, 0.5],
  children,
}: Props) {
  const group = React.useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const base = React.useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const bob = Math.sin(t * 0.7 + base.x * 3) * 0.012;
    const lift = hovered ? 0.1 : 0;
    group.current.position.y += (base.y + bob + lift - group.current.position.y) * 0.15;
    const targetScale = hovered ? 1.045 : 1;
    const s = group.current.scale;
    s.x += (targetScale - s.x) * 0.18;
    s.y += (targetScale - s.y) * 0.18;
    s.z += (targetScale - s.z) * 0.18;
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    window.dispatchEvent(new CustomEvent("desk-hover", { detail: cursorLabel }));
  };
  const onOut = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(false);
    window.dispatchEvent(new CustomEvent("desk-hover", { detail: null }));
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    onOpen?.();
  };

  return (
    <group ref={group} position={position}>
      {interactive && (
        <mesh
          visible={false}
          position={[0, hitSize[1] / 2, 0]}
          onPointerOver={onOver}
          onPointerOut={onOut}
          onClick={onClick}
        >
          <boxGeometry args={hitSize} />
          <meshBasicMaterial />
        </mesh>
      )}
      {children}
      {interactive && hovered && (
        <Html center distanceFactor={9} position={[0, 0.5, 0]} style={{ pointerEvents: "none" }}>
          <span className="whitespace-nowrap rounded-full border border-raspberry/40 bg-pearl/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-raspberry shadow-sm">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}
