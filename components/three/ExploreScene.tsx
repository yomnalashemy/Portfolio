"use client";

import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * The literal "figures moving" layer behind the scavenger hunt: one
 * wireframe polyhedron per project, drifting and spinning in real 3D,
 * clickable via raycasting. Unlocking one (click, or the pill list below —
 * both call the same onSelect) lights it up and grows a line from the
 * center hub to it, so the "X/6 explored" state is something you can
 * literally watch get wired together, not just a counter.
 */

interface SceneStack {
  tag: string;
  color: string;
}

interface Props {
  stacks: SceneStack[];
  found: Set<string>;
  active: string | null;
  onSelect: (tag: string) => void;
}

const GEOMETRIES = [
  () => new THREE.OctahedronGeometry(1, 0),
  () => new THREE.IcosahedronGeometry(1, 0),
  () => new THREE.TorusKnotGeometry(0.62, 0.2, 90, 12),
  () => new THREE.DodecahedronGeometry(1, 0),
  () => new THREE.TetrahedronGeometry(1.15, 0),
  () => new THREE.BoxGeometry(1.3, 1.3, 1.3),
];

export default function ExploreScene({ stacks, found, active, onSelect }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Read from refs inside the RAF loop so prop changes never tear down /
  // rebuild the three.js scene — only the closures' captured values move.
  const foundRef = React.useRef(found);
  const activeRef = React.useRef(active);
  const onSelectRef = React.useRef(onSelect);
  foundRef.current = found;
  activeRef.current = active;
  onSelectRef.current = onSelect;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "none";

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI / 2 - 0.55;
    controls.maxPolarAngle = Math.PI / 2 + 0.55;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(0xe8a33d, 1.1, 20);
    key.position.set(3, 4, 5);
    scene.add(key);

    // Hub: the "yomna@systems" node everything wires back to.
    const hub = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf2f1ea })
    );
    scene.add(hub);
    const hubGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xe8a33d, transparent: true, opacity: 0.18 })
    );
    scene.add(hubGlow);

    // Ambient dust field — cheap, constant motion even before any interaction.
    const DUST_COUNT = 220;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 16;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0x5c5b51, size: 0.028, transparent: true, opacity: 0.55 })
    );
    scene.add(dust);

    const ringCount = stacks.length;
    const radius = 3.1;

    interface Node {
      tag: string;
      color: THREE.Color;
      mesh: THREE.Mesh;
      glow: THREE.Mesh;
      basePos: THREE.Vector3;
      spinAxis: THREE.Vector3;
      spinSpeed: number;
      floatPhase: number;
      floatSpeed: number;
      line: THREE.Line;
      lineMat: THREE.LineBasicMaterial;
      foundAt: number | null;
    }

    const nodes: Node[] = stacks.map((s, i) => {
      const angle = (i / ringCount) * Math.PI * 2;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.3) * 0.9,
        Math.sin(angle) * radius * 0.62 - 0.6
      );
      const color = new THREE.Color(s.color);

      const geometry = GEOMETRIES[i % GEOMETRIES.length]();
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 })
      );
      mesh.scale.setScalar(0.62);
      mesh.position.copy(basePos);
      mesh.userData.tag = s.tag;
      scene.add(mesh);

      const glow = new THREE.Mesh(
        geometry.clone(),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.05 })
      );
      glow.scale.setScalar(0.7);
      glow.position.copy(basePos);
      scene.add(glow);

      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([hub.position, basePos]);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      return {
        tag: s.tag,
        color,
        mesh,
        glow,
        basePos,
        spinAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        spinSpeed: 0.3 + Math.random() * 0.4,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.4,
        line,
        lineMat,
        foundAt: null,
      };
    });

    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let hovered: Node | null = null;
    let downPos: { x: number; y: number } | null = null;

    const setSize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    const ndcFromEvent = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickNode = (): Node | null => {
      raycaster.setFromCamera(pointerNdc, camera);
      const hit = raycaster.intersectObjects(nodes.map((n) => n.mesh))[0];
      if (!hit) return null;
      return nodes.find((n) => n.mesh === hit.object) ?? null;
    };

    const onPointerMove = (e: PointerEvent) => {
      ndcFromEvent(e);
      const node = pickNode();
      hovered = node;
      renderer.domElement.style.cursor = node ? "pointer" : "grab";
    };
    const onPointerDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!downPos) return;
      const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      downPos = null;
      if (moved > 6) return; // was a drag, not a click
      ndcFromEvent(e);
      const node = pickNode();
      if (node) onSelectRef.current(node.tag);
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      const activeTag = activeRef.current;
      const foundSet = foundRef.current;

      nodes.forEach((n) => {
        const isFound = foundSet.has(n.tag);
        const isActive = activeTag === n.tag;
        const isHovered = hovered === n;

        if (isFound && n.foundAt === null) n.foundAt = t;
        if (!isFound) n.foundAt = null;

        n.mesh.rotateOnAxis(n.spinAxis, n.spinSpeed * dt);
        const floatY = Math.sin(t * n.floatSpeed + n.floatPhase) * 0.22;
        n.mesh.position.set(n.basePos.x, n.basePos.y + floatY, n.basePos.z);
        n.glow.position.copy(n.mesh.position);
        n.glow.rotation.copy(n.mesh.rotation);

        const pulse = n.foundAt !== null ? Math.min(1, (t - n.foundAt) / 0.5) : 0;
        const bounce = n.foundAt !== null ? Math.sin(pulse * Math.PI) * 0.18 : 0;
        const targetScale = 0.62 * (isFound ? 1.15 : 1) * (isActive || isHovered ? 1.12 : 1) + bounce;
        n.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        n.glow.scale.copy(n.mesh.scale).multiplyScalar(1.15);

        const mat = n.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = isFound ? 1 : isHovered ? 0.95 : 0.55;
        const glowMat = n.glow.material as THREE.MeshBasicMaterial;
        glowMat.opacity = isFound ? (isActive ? 0.16 : 0.09) : 0.03;

        const targetLineOpacity = isFound ? 0.55 : 0;
        n.lineMat.opacity += (targetLineOpacity - n.lineMat.opacity) * 0.08;
        const positions = n.line.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0, hub.position.x, hub.position.y, hub.position.z);
        positions.setXYZ(1, n.mesh.position.x, n.mesh.position.y, n.mesh.position.z);
        positions.needsUpdate = true;
      });

      hubGlow.scale.setScalar(1 + Math.sin(t * 1.4) * 0.08);
      dust.rotation.y += dt * 0.02;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      controls.dispose();
      nodes.forEach((n) => {
        n.mesh.geometry.dispose();
        (n.mesh.material as THREE.Material).dispose();
        n.glow.geometry.dispose();
        (n.glow.material as THREE.Material).dispose();
        n.line.geometry.dispose();
        n.lineMat.dispose();
      });
      dustGeo.dispose();
      (dust.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
    // Scene is built once; state changes flow through the refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
