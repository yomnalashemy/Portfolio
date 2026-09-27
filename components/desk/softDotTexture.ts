import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

/** PointsMaterial with no map renders each point as a hard-edged screen
 * square — this bakes a soft radial-gradient circle once and shares it
 * across every particle system in the scene, so dust and steam read as
 * soft dots instead of glitchy little squares. */
export function getSoftDotTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  cached = new THREE.CanvasTexture(canvas);
  return cached;
}
