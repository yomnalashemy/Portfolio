// The hero figure: a field of noisy data points with one traced path through
// it — the investigation that became Sentinel. Points come from a seeded
// generator so server and client render the same figure.

const W = 560;
const H = 500;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(7);
const NOISE = Array.from({ length: 78 }, () => ({
  x: 24 + rand() * (W - 48),
  y: 24 + rand() * (H - 48),
  r: 1.4 + rand() * 2.2,
}));

// faint links between nearby noise points: the "everything looks related" layer
const LINKS: [number, number][] = [];
NOISE.forEach((a, i) => {
  NOISE.slice(i + 1).forEach((b, j) => {
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 62 && LINKS.length < 70) LINKS.push([i, i + 1 + j]);
  });
});

const NODES = [
  { x: 64, y: 408, label: "a law-enforcement request", align: "left" },
  { x: 196, y: 300, label: "evidence across 13 tables", align: "left" },
  { x: 318, y: 334, label: "the slow, repeated step", align: "left" },
  { x: 410, y: 186, label: "Sentinel", align: "right" },
  { x: 500, y: 88, label: "9 → 6.9 min per case", align: "right" },
] as const;

const PATH = NODES.map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`).join(" ");

export default function SignalMap() {
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink via-ink to-plum shadow-[0_28px_50px_-34px_rgba(42,21,40,0.6)]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden focusable="false">
          <g stroke="#a9969f" strokeOpacity="0.22" strokeWidth="1">
            {LINKS.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={NOISE[a].x} y1={NOISE[a].y} x2={NOISE[b].x} y2={NOISE[b].y} />
            ))}
          </g>
          <g fill="#a9969f" fillOpacity="0.45">
            {NOISE.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={p.r} />
            ))}
          </g>
          {/* a few points flicker in colour: candidate signals among the noise */}
          <g>
            {NOISE.filter((_, i) => i % 6 === 0).map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r + 0.6}
                fill={i % 3 === 0 ? "#d9f49b" : i % 3 === 1 ? "#f05a85" : "#c9b6f2"}
                className="twinkle"
                opacity="0.35"
                style={{ "--tw": `${2.6 + (i % 5) * 0.7}s`, animationDelay: `${(i * 0.37) % 3}s` } as React.CSSProperties}
              />
            ))}
          </g>

          <path
            d={PATH}
            pathLength={1000}
            className="signal-trace"
            fill="none"
            stroke="#f05a85"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={PATH}
            pathLength={1000}
            className="signal-pulse"
            fill="none"
            stroke="#d9f49b"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {NODES.map((n, i) => {
            const last = i === NODES.length - 1;
            return (
              <g key={n.label} className="signal-node" style={{ animationDelay: `${0.3 + i * 0.28}s` }}>
                <circle cx={n.x} cy={n.y} r={last ? 15 : 11} fill={last ? "#d9f49b" : "#f05a85"} fillOpacity="0.18" />
                <circle cx={n.x} cy={n.y} r={last ? 7 : 5.5} fill={last ? "#d9f49b" : "#f05a85"} />
              </g>
            );
          })}
        </svg>

        {/* HTML labels, positioned over the figure, so text keeps a real
            font size at every width instead of shrinking with the SVG */}
        <ol className="pointer-events-none absolute inset-0 m-0 hidden list-none p-0 sm:block">
          {NODES.map((n, i) => {
            const last = i === NODES.length - 1;
            return (
              <li
                key={n.label}
                className="absolute font-mono text-[12px] leading-tight sm:text-[13px]"
                style={{
                  left: n.align === "left" ? `${(n.x / W) * 100}%` : undefined,
                  right: n.align === "right" ? `${100 - (n.x / W) * 100}%` : undefined,
                  top: `${(n.y / H) * 100}%`,
                  transform: `translate(${n.align === "left" ? "14px" : "-14px"}, ${i === 0 ? "-130%" : "10px"})`,
                }}
              >
                <span
                  className={`inline-block whitespace-nowrap rounded-md px-1.5 py-0.5 ${
                    last ? "bg-lime text-ink" : "bg-ink/80 text-paper"
                  }`}
                >
                  <span className="sr-only">Step {i + 1}: </span>
                  {n.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* narrow screens: step numbers on the figure, the words below it */}
        <div aria-hidden className="pointer-events-none absolute inset-0 sm:hidden">
          {NODES.map((n, i) => (
            <span
              key={n.label}
              className={`absolute grid size-6 place-items-center rounded-full font-mono text-[12px] ${
                i === NODES.length - 1 ? "bg-lime text-ink" : "bg-paper text-ink"
              }`}
              style={{
                left: `${(n.x / W) * 100}%`,
                top: `${(n.y / H) * 100}%`,
                transform: i === NODES.length - 1 ? "translate(-130%, 10%)" : "translate(30%, -120%)",
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <ol className="mt-3 grid gap-1.5 font-mono text-[12px] text-ink/80 sm:hidden">
        {NODES.map((n, i) => (
          <li key={n.label} className="flex gap-2">
            <span className="text-raspberry-deep">{i + 1}</span>
            {n.label}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 flex gap-3 text-sm leading-snug text-mauve">
        <span className="label shrink-0 pt-0.5 text-raspberry-deep">Fig. 1</span>
        <span>
          One path through the noise of daily case work: a slow, repeated step, traced across 13 tables and
          rebuilt as a tool.
        </span>
      </figcaption>
    </figure>
  );
}
