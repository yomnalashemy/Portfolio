"use client";

import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The literal "figures moving" layer behind the scavenger hunt: one
 * solid, lit polyhedron per project, drifting and spinning in real 3D,
 * clickable via raycasting. Unlocking one (click, or the pill list below —
 * both call the same onSelect) lights it up and grows a line from the
 * center hub to it, so the "X/6 explored" state is something you can
 * literally watch get wired together, not just a counter.
 *
 * Shapes are solid MeshStandardMaterial lit by a real environment map
 * (PMREM-baked RoomEnvironment) rather than raw `wireframe:true` — a
 * plain wireframe draws every triangulated edge including internal
 * diagonals, which on a 90x12-segment torus knot is ~2000 crisscrossing
 * lines and reads as noise, not a shape. A thin EdgesGeometry outline
 * (silhouette edges only, geometric threshold) gives the same crisp
 * "technical" read without the mess.
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
  () => new THREE.TorusKnotGeometry(0.62, 0.2, 128, 16),
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "none";

    // Soft studio-style reflections on the solid shapes — the single
    // biggest lever between "flat cartoon shape" and "realistic 3D".
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI / 2 - 0.55;
    controls.maxPolarAngle = Math.PI / 2 + 0.55;

    scene.add(new THREE.HemisphereLight(0xfff2df, 0x1a1610, 0.55));
    const key = new THREE.PointLight(0xe8a33d, 1.4, 20);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0x9db4ff, 0.5, 20);
    fill.position.set(-4, -1, 3);
    scene.add(fill);

    // Hub: the "yomna@systems" node everything wires back to.
    const hub = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xf2f1ea, roughness: 0.3, metalness: 0.3, emissive: 0xe8a33d, emissiveIntensity: 0.4 })
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
      edges: THREE.LineSegments;
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
      const material = new THREE.MeshStandardMaterial({
        color: color.clone().multiplyScalar(0.45),
        roughness: 0.32,
        metalness: 0.35,
        flatShading: true,
        emissive: color.clone(),
        emissiveIntensity: 0.05,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(0.62);
      mesh.position.copy(basePos);
      mesh.userData.tag = s.tag;
      scene.add(mesh);

      // Silhouette-only outline (real geometric edges, not every triangle
      // diagonal) — parented to the mesh so it inherits its transform for
      // free instead of needing a manual per-frame sync.
      const edgesGeo = new THREE.EdgesGeometry(geometry, 20);
      const edgesMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      mesh.add(edges);

      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([hub.position, basePos]);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      return {
        tag: s.tag,
        color,
        mesh,
        edges,
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
    const tmpColor = new THREE.Color();

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

        const pulse = n.foundAt !== null ? Math.min(1, (t - n.foundAt) / 0.5) : 0;
        const bounce = n.foundAt !== null ? Math.sin(pulse * Math.PI) * 0.18 : 0;
        const targetScale = 0.62 * (isFound ? 1.15 : 1) * (isActive || isHovered ? 1.12 : 1) + bounce;
        n.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Lit shading carries the "found" state now — dim/desaturated body
        // color + faint emissive when locked, full color + glow once found,
        // instead of the old flat opacity fade.
        const mat = n.mesh.material as THREE.MeshStandardMaterial;
        const brightness = isFound ? 1 : isHovered ? 0.75 : 0.45;
        mat.color.copy(tmpColor.copy(n.color).multiplyScalar(brightness));
        const targetEmissive = isFound ? (isActive ? 0.85 : 0.5) : isHovered ? 0.15 : 0.05;
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.12;

        const edgesMat = n.edges.material as THREE.LineBasicMaterial;
        edgesMat.opacity = isFound ? 0.5 : isHovered ? 0.35 : 0.18;

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
        n.edges.geometry.dispose();
        (n.edges.material as THREE.Material).dispose();
        n.line.geometry.dispose();
        n.lineMat.dispose();
      });
      dustGeo.dispose();
      (dust.material as THREE.Material).dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
    // Scene is built once; state changes flow through the refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}
