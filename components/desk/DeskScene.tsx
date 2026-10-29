"use client";

import { AdaptiveDpr, ContactShadows, Float, PerformanceMonitor, Preload, Sparkles, Text } from "@react-three/drei";
import { Canvas, extend, type Object3DNode, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import CameraRig from "./CameraRig";
import EnvironmentSetup from "./EnvironmentSetup";

extend({ RoundedBoxGeometry });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedBoxGeometry: Object3DNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>;
    }
  }
}

type ArtifactProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  eyebrow: string;
  href: string;
  accent: string;
  onOpen: (href: string) => void;
};

function Artifact({ position, rotation = [0, 0, 0], title, eyebrow, href, accent, onOpen }: ArtifactProps) {
  const ref = React.useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    else document.body.style.cursor = "";
    return () => { document.body.style.cursor = ""; };
  }, [hovered]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const s = hovered ? 1.055 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-delta * 9));
    ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.55 + position[0] * 4) * 0.025;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.11}>
      <group ref={ref} position={position} rotation={rotation}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onOpen(href); }}>
        <mesh castShadow receiveShadow>
          <roundedBoxGeometry args={[0.60, 0.78, 0.10, 6, 0.04]} />
          <meshPhysicalMaterial color={hovered ? "#FFFFFF" : "#F7F5F0"} roughness={0.24} metalness={0.12} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.25} />
        </mesh>
        <mesh position={[0, 0.37, 0.066]}>
          <roundedBoxGeometry args={[0.46, 0.02, 0.01, 3, 0.008]} />
          <meshStandardMaterial color={accent} metalness={0.45} roughness={0.28} emissive={accent} emissiveIntensity={hovered ? 0.3 : 0.06} />
        </mesh>
        <Text position={[0, 0.22, 0.068]} fontSize={0.06} color="#686873" anchorX="center" anchorY="middle" letterSpacing={0.1}>{eyebrow}</Text>
        <Text position={[0, 0.015, 0.069]} fontSize={0.09} maxWidth={0.64} textAlign="center" color="#292832" anchorX="center" anchorY="middle" fontWeight={600}>{title}</Text>
        <mesh position={[0, -0.27, 0.068]}>
          <circleGeometry args={[0.075, 32]} />
          <meshStandardMaterial color={accent} metalness={0.45} roughness={0.2} emissive={accent} emissiveIntensity={hovered ? 0.65 : 0.18} />
        </mesh>
        <mesh position={[0, -0.27, 0.077]}>
          <ringGeometry args={[0.09, 0.095, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={hovered ? 0.9 : 0.42} />
        </mesh>
      </group>
    </Float>
  );
}

function CoreSculpture({ onOpen }: { onOpen: (href: string) => void }) {
  const core = React.useRef<THREE.Group>(null);
  const orb = React.useRef<THREE.Mesh>(null);
  const orbit = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => { document.body.style.cursor = ""; };
  }, [hovered]);
  useFrame((state, delta) => {
    if (core.current) {
      const scale = hovered ? 1.055 : 1;
      core.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-delta * 7));
    }
    if (orb.current) {
      orb.current.rotation.y += delta * 0.16;
      orb.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
    if (orbit.current) {
      orbit.current.rotation.z += delta * 0.12;
      orbit.current.rotation.x = Math.PI / 2.8 + Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }
  });
  return (
    <group ref={core} position={[0, 0.82, -0.38]}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => { event.stopPropagation(); onOpen("/workbench"); }}>
      <mesh ref={orb} castShadow>
        <icosahedronGeometry args={[0.36, 4]} />
        <meshPhysicalMaterial color={hovered ? "#F06A9C" : "#D93C78"} roughness={0.18} metalness={0.34} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.6} emissive="#D93C78" emissiveIntensity={hovered ? 0.22 : 0.07} />
      </mesh>
      <mesh scale={1.025}>
        <icosahedronGeometry args={[0.36, 2]} />
        <meshBasicMaterial color="#F7F5F0" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={orbit} rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[0.52, 0.008, 10, 128]} />
        <meshStandardMaterial color="#A8A9B0" metalness={0.88} roughness={0.16} emissive="#A8A9B0" emissiveIntensity={0.14} />
      </mesh>
      <mesh rotation={[0.3, 0.2, 0.8]}>
        <torusGeometry args={[0.61, 0.004, 8, 128]} />
        <meshStandardMaterial color="#FFF8F1" metalness={0.7} roughness={0.22} />
      </mesh>
      <pointLight position={[0, 0, 0.4]} intensity={0.5} color="#D93C78" distance={2.8} />
    </group>
  );
}

function Architecture() {
  return (
    <>
      <mesh position={[0, 1.32, -1.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.04, 0.035, 18, 144]} />
        <meshPhysicalMaterial color="#D93C78" roughness={0.22} metalness={0.5} clearcoat={1} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 1.32, -1.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.94, 0.006, 8, 144]} />
        <meshStandardMaterial color="#A8A9B0" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh position={[-0.94, 0.54, -0.84]} rotation={[0, 0, -0.08]} castShadow>
        <roundedBoxGeometry args={[0.12, 1.05, 0.14, 5, 0.03]} />
        <meshPhysicalMaterial color="#C9C7CC" roughness={0.27} metalness={0.22} clearcoat={0.85} />
      </mesh>
      <mesh position={[0.94, 0.54, -0.84]} rotation={[0, 0, 0.08]} castShadow>
        <roundedBoxGeometry args={[0.12, 1.05, 0.14, 5, 0.03]} />
        <meshPhysicalMaterial color="#C9C7CC" roughness={0.27} metalness={0.22} clearcoat={0.85} />
      </mesh>
      <mesh position={[0, 0.16, -0.38]} castShadow receiveShadow>
        <cylinderGeometry args={[1.08, 1.18, 0.20, 96]} />
        <meshPhysicalMaterial color="#292832" roughness={0.27} metalness={0.32} clearcoat={0.9} />
      </mesh>
      <mesh position={[0, 0.29, -0.38]} castShadow receiveShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.03, 96]} />
        <meshPhysicalMaterial color="#EAE7E9" roughness={0.22} metalness={0.22} clearcoat={1} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#E4E2DE" roughness={0.72} envMapIntensity={0.45} />
      </mesh>
    </>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.42} color="#F7F5F0" />
      <directionalLight position={[3, 5, 3]} intensity={2.25} color="#F7F5F0" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-3, 2, -1]} intensity={1.15} color="#C9B7C8" />
      <pointLight position={[0, 2.4, 1.8]} intensity={0.8} color="#FFFFFF" distance={6} />
      <pointLight position={[-2, 1.5, 0]} intensity={0.45} color="#A9C4D8" distance={5} />
    </>
  );
}

function AdaptiveQuality() {
  const { performance } = useThree();
  return <PerformanceMonitor onDecline={() => performance.regress()} />;
}

export default function DeskScene() {
  const introDone = React.useRef(false);
  const router = useRouter();
  const open = React.useCallback((href: string) => router.push(href), [router]);

  return (
    <div data-desk-canvas aria-hidden="true" className="fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 1.5]} frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}>
        <color attach="background" args={["#F1F0EC"]} />
        <fog attach="fog" args={["#F1F0EC", 5.5, 12]} />
        <CameraRig introDone={introDone} />
        <EnvironmentSetup />
        <Lighting />
        <group position={[0.92, -0.02, 0]} scale={0.76}>
        <Architecture />
        <ContactShadows position={[0, 0.015, -0.38]} opacity={0.38} scale={3.6} blur={2.1} far={1.8} resolution={512} color="#292832" />
        <CoreSculpture onOpen={open} />
        <Sparkles count={80} scale={[5.5, 3.2, 4.5]} size={1.5} speed={0.18} color="#A8A9B0" opacity={0.5} />
        <AdaptiveQuality />
        <AdaptiveDpr />
        <Preload all />
        <Artifact position={[-0.83, 0.98, 0.05]} rotation={[0, 0.1, 0]} eyebrow="01 / THE PERSON" title="ABOUT" href="/about" accent="#D93C78" onOpen={open} />
        <Artifact position={[0.83, 0.98, 0.05]} rotation={[0, -0.1, 0]} eyebrow="02 / THE WORK" title="PROJECTS" href="/work" accent="#D93C78" onOpen={open} />
        <Artifact position={[-0.88, 0.96, -0.78]} rotation={[0, 0.22, 0]} eyebrow="03 / THE METHOD" title="SYSTEMS" href="/workbench" accent="#292832" onOpen={open} />
        <Artifact position={[0.88, 0.96, -0.78]} rotation={[0, -0.22, 0]} eyebrow="04 / THE STORY" title="EXPERIENCE" href="/experience" accent="#A8A9B0" onOpen={open} />
        </group>
      </Canvas>
    </div>
  );
}
