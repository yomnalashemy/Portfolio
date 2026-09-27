"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as React from "react";
import * as THREE from "three";

/**
 * Elle Woods x Oppenheimer hero: an abstract atomic structure, not a
 * cartoon atom. One THREE.Points buffer mutated in place per frame (not
 * hundreds of React-managed meshes) holds every particle; a handful of
 * THREE.Line loops trace the orbital shells they ride on. A soft
 * additive sprite stands in for real bloom — cheaper than a full
 * postprocessing pipeline for one glow point.
 */

const ROSE = new THREE.Color("#D98B9A");
const CHAMPAGNE = new THREE.Color("#D8C7A5");
const PINK = new THREE.Color("#E94F87");

interface Ring {
  radiusX: number;
  radiusZ: number;
  tiltX: number;
  tiltZ: number;
  count: number;
  speed: number;
}

function buildRings(dense: boolean): Ring[] {
  const base: Omit<Ring, "count">[] = [
    { radiusX: 1.6, radiusZ: 1.1, tiltX: 0.15, tiltZ: 0.55, speed: 0.09 },
    { radiusX: 2.3, radiusZ: 1.9, tiltX: -0.35, tiltZ: 0.1, speed: -0.065 },
    { radiusX: 2.9, radiusZ: 2.9, tiltX: 0.9, tiltZ: -0.2, speed: 0.05 },
    { radiusX: 3.6, radiusZ: 2.4, tiltX: -0.6, tiltZ: 0.75, speed: -0.04 },
  ];
  return base.map((r) => ({ ...r, count: dense ? 90 : 42 }));
}

function ringPoint(ring: Ring, angle: number, out: THREE.Vector3) {
  out.set(Math.cos(angle) * ring.radiusX, 0, Math.sin(angle) * ring.radiusZ);
  out.applyEuler(new THREE.Euler(ring.tiltX, 0, ring.tiltZ));
  return out;
}

function OrbitLines({ rings }: { rings: Ring[] }) {
  return (
    <>
      {rings.map((ring, i) => {
        const points: THREE.Vector3[] = [];
        const segs = 96;
        const v = new THREE.Vector3();
        for (let s = 0; s <= segs; s++) {
          points.push(ringPoint(ring, (s / segs) * Math.PI * 2, v).clone());
        }
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const color = i % 2 === 0 ? ROSE : CHAMPAGNE;
        return (
          <lineLoop key={i} geometry={geo}>
            <lineBasicMaterial color={color} transparent opacity={0.16} />
          </lineLoop>
        );
      })}
    </>
  );
}

function Particles({ rings }: { rings: Ring[] }) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const escapeRef = React.useRef<Float32Array>();

  const { positions, colors, meta, total } = React.useMemo(() => {
    let total = 0;
    rings.forEach((r) => (total += r.count));
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const meta: { ring: number; angle: number; escaping: boolean; escapeR: number }[] = [];

    let idx = 0;
    rings.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + Math.random() * 0.3;
        const escaping = Math.random() < 0.035;
        meta.push({ ring: ringIdx, angle, escaping, escapeR: 0 });

        const v = ringPoint(ring, angle, new THREE.Vector3());
        positions[idx * 3] = v.x;
        positions[idx * 3 + 1] = v.y;
        positions[idx * 3 + 2] = v.z;

        const c = Math.random() < 0.12 ? PINK : Math.random() < 0.5 ? ROSE : CHAMPAGNE;
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;
        idx++;
      }
    });
    return { positions, colors, meta, total };
  }, [rings]);

  React.useEffect(() => {
    escapeRef.current = new Float32Array(total);
  }, [total]);

  useFrame((_, dt) => {
    const geom = pointsRef.current?.geometry;
    if (!geom) return;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();

    let idx = 0;
    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const m = meta[idx];
        m.angle += ring.speed * dt;
        ringPoint(ring, m.angle, v);

        if (m.escaping) {
          m.escapeR += dt * 0.35;
          if (m.escapeR > 2.2) m.escapeR = 0;
          const dir = v.clone().normalize();
          v.addScaledVector(dir, m.escapeR);
        }

        posAttr.setXYZ(idx, v.x, v.y, v.z);
        idx++;
      }
    });
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={total} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={total} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Nucleus() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.6) * 0.06;
    ref.current.scale.setScalar(s);
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#E94F87" emissive="#E94F87" emissiveIntensity={1.4} roughness={0.3} />
      </mesh>
      <sprite scale={[2.2, 2.2, 1]}>
        <spriteMaterial
          color="#E94F87"
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

function Scene({ dense }: { dense: boolean }) {
  const rings = React.useMemo(() => buildRings(dense), [dense]);
  const group = React.useRef<THREE.Group>(null);
  const { camera } = useThree();
  const mouse = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.05;
      group.current.rotation.x += (mouse.current.y * 0.25 - group.current.rotation.x) * 0.02;
      group.current.rotation.z += (-mouse.current.x * 0.12 - group.current.rotation.z) * 0.02;
    }
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 0.35 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#D8C7A5" />
      <Nucleus />
      <OrbitLines rings={rings} />
      <Particles rings={rings} />
    </group>
  );
}

export default function HeroScene() {
  const [dense, setDense] = React.useState(true);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setDense(window.innerWidth > 768);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 60% 45%, rgba(233,79,135,0.18), transparent 55%), radial-gradient(circle at 30% 70%, rgba(216,199,165,0.12), transparent 50%)",
        }}
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="absolute inset-0"
    >
      <fogExp2 attach="fog" args={["#111114", 0.055]} />
      <Scene dense={dense} />
    </Canvas>
  );
}
