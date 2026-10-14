import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

// ctx.roundRect() is a newer Canvas2D method — not guaranteed everywhere
// this scene runs. Drawn by hand with arcTo() instead, which has been
// supported since the original Canvas2D spec, so this can never throw
// and take the whole desk scene down with it.
function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

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
  roundedRectPath(ctx, 0, 0, size, size, r);
  ctx.fill();

  const inset = size * 0.047;
  ctx.strokeStyle = "#D9B66F";
  ctx.lineWidth = size * 0.023;
  ctx.globalAlpha = 0.6;
  roundedRectPath(ctx, inset, inset, size - inset * 2, size - inset * 2, r * 0.8);
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
