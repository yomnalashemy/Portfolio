"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Third attempt at this framing, so: reliability over drama. Two rounds
// of "still cropped" real screenshots means the previous "dramatic close
// keyframe, wide reveal keyframe" arc had a start/mid too tight — rather
// than tune that blind again, start/mid/end all sit close to the same
// well-framed distance now, with only a small drift between them for a
// gentle settle rather than a big zoom journey. Objects span roughly
// x:[-0.55,0.55] z:[-0.32,0.42]; a ~4 unit distance at a gentle ~18°
// angle below horizontal frames that with real margin on every side.
const KEYFRAMES = {
  start: { pos: [0.75, 1.35, 3.7] as const, look: [0.05, 0.14, 0.05] as const },
  mid: { pos: [0.55, 1.42, 3.95] as const, look: [0.02, 0.11, 0] as const },
  end: { pos: [0.4, 1.5, 4.2] as const, look: [0, 0.1, -0.1] as const },
};

interface Props {
  trackEl: React.RefObject<HTMLDivElement>;
  introDone: React.MutableRefObject<boolean>;
}

export default function CameraRig({ trackEl, introDone }: Props) {
  const camRef = React.useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const lookAt = React.useRef(new THREE.Vector3(...KEYFRAMES.start.look));
  const camState = React.useRef<{ x: number; y: number; z: number }>({
    x: KEYFRAMES.start.pos[0],
    y: KEYFRAMES.start.pos[1],
    z: KEYFRAMES.start.pos[2],
  });
  const lookState = React.useRef<{ x: number; y: number; z: number }>({
    x: KEYFRAMES.start.look[0],
    y: KEYFRAMES.start.look[1],
    z: KEYFRAMES.start.look[2],
  });
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
    if (!trackEl.current) return;

    if (reducedMotion.current) {
      camState.current = { x: KEYFRAMES.end.pos[0], y: KEYFRAMES.end.pos[1], z: KEYFRAMES.end.pos[2] };
      lookState.current = { x: KEYFRAMES.end.look[0], y: KEYFRAMES.end.look[1], z: KEYFRAMES.end.look[2] };
      introDone.current = true;
      return;
    }

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

    // Tween the plain refs directly — read every R3F frame below. Two
    // independent rAF loops (gsap's ticker + fiber's own) fighting over
    // the same camera object was the source of the visible stutter.
    tl.to(camState.current, { x: KEYFRAMES.mid.pos[0], y: KEYFRAMES.mid.pos[1], z: KEYFRAMES.mid.pos[2], ease: "power1.inOut" }, 0)
      .to(lookState.current, { x: KEYFRAMES.mid.look[0], y: KEYFRAMES.mid.look[1], z: KEYFRAMES.mid.look[2], ease: "power1.inOut" }, 0)
      .to(camState.current, { x: KEYFRAMES.end.pos[0], y: KEYFRAMES.end.pos[1], z: KEYFRAMES.end.pos[2], ease: "power1.inOut" }, 0.5)
      .to(lookState.current, { x: KEYFRAMES.end.look[0], y: KEYFRAMES.end.look[1], z: KEYFRAMES.end.look[2], ease: "power1.inOut" }, 0.5);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [trackEl, introDone]);

  useFrame(() => {
    const cam = camRef.current;
    if (!cam) return;

    cam.position.set(camState.current.x, camState.current.y, camState.current.z);
    lookAt.current.set(lookState.current.x, lookState.current.y, lookState.current.z);

    const target = lookAt.current;
    if (introDone.current && !reducedMotion.current) {
      // subtle parallax once settled — "disturbing" the scene, not
      // steering it
      cam.lookAt(target.x + mouse.current.x * 0.06, target.y - mouse.current.y * 0.04, target.z);
    } else {
      cam.lookAt(target);
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={40} aspect={size.width / size.height} position={KEYFRAMES.start.pos} />;
}
