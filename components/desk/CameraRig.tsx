"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Cinematic close-up → pull back → settle on the laptop screen.
const KEYFRAMES = {
  start: { pos: [0.35, 0.28, 0.55] as const, look: [0.15, 0.1, 0.1] as const },
  mid: { pos: [0.9, 0.85, 1.5] as const, look: [0, 0.1, -0.1] as const },
  end: { pos: [0.05, 0.42, 0.95] as const, look: [0, 0.1, -0.35] as const },
};

interface Props {
  trackEl: React.RefObject<HTMLDivElement>;
  introDone: React.MutableRefObject<boolean>;
}

export default function CameraRig({ trackEl, introDone }: Props) {
  const camRef = React.useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const lookAt = React.useRef(new THREE.Vector3(...KEYFRAMES.start.look));
  const mouse = React.useRef({ x: 0, y: 0 });
  const reducedMotion = React.useRef(false);

  React.useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  React.useEffect(() => {
    const cam = camRef.current;
    if (!cam || !trackEl.current) return;

    if (reducedMotion.current) {
      cam.position.set(...KEYFRAMES.end.pos);
      lookAt.current.set(...KEYFRAMES.end.look);
      introDone.current = true;
      return;
    }

    const camPos = { x: KEYFRAMES.start.pos[0], y: KEYFRAMES.start.pos[1], z: KEYFRAMES.start.pos[2] };
    const lookState = { x: KEYFRAMES.start.look[0], y: KEYFRAMES.start.look[1], z: KEYFRAMES.start.look[2] };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackEl.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onLeave: () => (introDone.current = true),
        onEnterBack: () => (introDone.current = false),
        onUpdate: (self) => {
          if (self.progress > 0.98) introDone.current = true;
        },
      },
    });

    tl.to(camPos, { x: KEYFRAMES.mid.pos[0], y: KEYFRAMES.mid.pos[1], z: KEYFRAMES.mid.pos[2], ease: "power1.inOut" }, 0)
      .to(lookState, { x: KEYFRAMES.mid.look[0], y: KEYFRAMES.mid.look[1], z: KEYFRAMES.mid.look[2], ease: "power1.inOut" }, 0)
      .to(camPos, { x: KEYFRAMES.end.pos[0], y: KEYFRAMES.end.pos[1], z: KEYFRAMES.end.pos[2], ease: "power1.inOut" }, 0.5)
      .to(lookState, { x: KEYFRAMES.end.look[0], y: KEYFRAMES.end.look[1], z: KEYFRAMES.end.look[2], ease: "power1.inOut" }, 0.5);

    const sync = () => {
      cam.position.set(camPos.x, camPos.y, camPos.z);
      lookAt.current.set(lookState.x, lookState.y, lookState.z);
    };
    gsap.ticker.add(sync);

    return () => {
      gsap.ticker.remove(sync);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [trackEl, introDone]);

  useFrame(() => {
    const cam = camRef.current;
    if (!cam) return;
    const target = lookAt.current.clone();
    if (introDone.current && !reducedMotion.current) {
      // subtle parallax once settled — "disturbing" the scene, not
      // steering it
      target.x += mouse.current.x * 0.06;
      target.y += -mouse.current.y * 0.04;
    }
    cam.lookAt(target);
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={38} aspect={size.width / size.height} position={KEYFRAMES.start.pos} />;
}
