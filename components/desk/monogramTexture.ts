import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

/** The desk's one stand-in for "her": not a human figure (no photo or
 * physical description exists in this repo to build one from honestly),
 * but the same monogram seal already established in public/favicon.svg —
 * same proportions, same colors, same serif "Y". Baked once onto a
 * canvas and shared, same pattern as keyboardTexture/softDotTexture. */
export function getMonogramTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = size * 0.25; // matches favicon.svg's rx=16 on a 64 viewBox

  ctx.fillStyle = "#C72C48";
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  const inset = size * 0.047;
  ctx.strokeStyle = "#D9B66F";
  ctx.lineWidth = size * 0.023;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.roundRect(inset, inset, size - inset * 2, size - inset * 2, r * 0.8);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#FFFDF8";
  ctx.font = `700 ${size * 0.53}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Y", size / 2, size * 0.58);

  cached = new THREE.CanvasTexture(canvas);
  cached.anisotropy = 4;
  return cached;
}
