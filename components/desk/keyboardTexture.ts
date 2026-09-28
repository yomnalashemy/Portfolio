import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

/** A flat dark rectangle read as "keyboard deck" in name only — this
 * bakes an actual grid of rounded keys (with a subtle per-key shadow so
 * they read as recessed, not printed) once and reuses it as a texture
 * map, which is far cheaper than modeling ~60 individual key meshes. */
export function getKeyboardTexture(): THREE.CanvasTexture {
  if (cached) return cached;
  const w = 512;
  const h = 320;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#2a1720";
  ctx.fillRect(0, 0, w, h);

  const cols = 14;
  const rows = 5;
  const gap = 6;
  const cellW = w / cols;
  const cellH = h / rows;
  const keyW = cellW - gap;
  const keyH = cellH - gap;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + gap / 2;
      const y = r * cellH + gap / 2;
      const radius = 5;

      // shadow first, offset down-right, so the key reads as recessed
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      roundRect(ctx, x + 1.5, y + 2, keyW, keyH, radius);
      ctx.fill();

      ctx.fillStyle = "#3a2430";
      roundRect(ctx, x, y, keyW, keyH, radius);
      ctx.fill();
    }
  }

  cached = new THREE.CanvasTexture(canvas);
  cached.anisotropy = 4;
  return cached;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
