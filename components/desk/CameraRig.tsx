"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

const LOOK = new THREE.Vector3(0, 0.1, -0.1);
const CAMERA_POSITION = new THREE.Vector3(0.35, 1.7, 5.4);

interface Props {
  introDone: React.MutableRefObject<boolean>;
}

export default function CameraRig({ introDone }: Props) {
  const camRef = React.useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const pointer = React.useRef({ x: 0, y: 0 });
  const reducedMotion = React.useRef(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    const onMotionChange = (event: MediaQueryListEvent) => { reducedMotion.current = event.matches; };
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    media.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onMove, { passive: true });
    introDone.current = true;
    return () => {
      media.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onMove);
    };
  }, [introDone]);

  useFrame(() => {
    const camera = camRef.current;
    if (!camera) return;
    camera.position.copy(CAMERA_POSITION);
    const motion = reducedMotion.current ? 0 : 1;
    camera.lookAt(
      LOOK.x + pointer.current.x * 0.035 * motion,
      LOOK.y - pointer.current.y * 0.025 * motion,
      LOOK.z,
    );
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={40} aspect={size.width / size.height} position={CAMERA_POSITION.toArray()} />;
}
