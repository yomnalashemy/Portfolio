// Soft colour fields that drift behind every page, plus a fine grain.
// Radial gradients (not CSS blur) keep this cheap to paint; peak strengths are
// capped so small raspberry and mauve text keeps at least 4.5:1 on top of them.

const BLOBS = [
  { color: "var(--raspberry)", alpha: 0.12, size: "62vmax", top: "-26vmax", left: "-22vmax", dur: "26s", dx: "8vw", dy: "6vh" },
  { color: "var(--lime)", alpha: 0.55, size: "48vmax", top: "8vh", left: "62vw", dur: "32s", dx: "-10vw", dy: "8vh" },
  { color: "var(--lilac)", alpha: 0.45, size: "54vmax", top: "55vh", left: "-14vw", dur: "38s", dx: "12vw", dy: "-6vh" },
  { color: "var(--rose)", alpha: 0.35, size: "46vmax", top: "70vh", left: "58vw", dur: "30s", dx: "-8vw", dy: "-10vh" },
];

export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((b) => (
        <span
          key={b.color}
          className="atmo-blob"
          style={
            {
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              background: `radial-gradient(closest-side, rgb(${b.color} / ${b.alpha}), rgb(${b.color} / 0))`,
              "--dur": b.dur,
              "--dx": b.dx,
              "--dy": b.dy,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="grain absolute inset-0 opacity-[0.18] mix-blend-multiply" />
    </div>
  );
}
