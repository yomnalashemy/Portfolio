"use client";

import * as React from "react";

// Numbers lifted straight from the résumé; each tile names its source project.
const STATS = [
  { from: 9, to: 6.9, decimals: 1, unit: "min", label: "case response time with Sentinel, down from 9", tile: "bg-raspberry text-ink" },
  { from: 303, to: 1, decimals: 0, unit: "", label: "KYB field-set failures left, down from 303", tile: "bg-lime text-ink" },
  { from: 0, to: 1025, decimals: 0, unit: "", label: "automated tests in ITQAN", tile: "bg-lilac text-ink" },
  { from: 0, to: 98.1, decimals: 1, unit: "%", label: "character accuracy recovering broken exam PDFs", tile: "bg-rose text-ink" },
];

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function Stat({ stat, run, delay }: { stat: (typeof STATS)[number]; run: boolean; delay: number }) {
  const [value, setValue] = React.useState(stat.to);

  // server HTML shows the real figure; once hydrated, wind it back to count up
  React.useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setValue(stat.from);
  }, [stat.from]);

  React.useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now() + delay;
    const duration = 1600;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(stat.from + (stat.to - stat.from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, stat, delay]);

  return (
    <li className={`flex min-h-[168px] flex-col justify-between rounded-[22px] p-4 sm:min-h-[200px] sm:rounded-[24px] sm:p-6 ${stat.tile}`}>
      {/* the final value is what assistive tech reads; the count-up is visual only */}
      <span className="sr-only">
        {format(stat.to, stat.decimals)}
        {stat.unit} — {stat.label}
      </span>
      <span aria-hidden className="font-display text-[clamp(2.1rem,6vw,4.75rem)] leading-none tabular-nums">
        {format(value, stat.decimals)}
        {stat.unit && <span className="ml-1 text-[0.45em]">{stat.unit}</span>}
      </span>
      <span aria-hidden className="mt-4 text-[0.8125rem] leading-snug sm:mt-6 sm:text-[0.95rem]">
        {stat.label}
      </span>
    </li>
  );
}

export default function ProofStrip() {
  const ref = React.useRef<HTMLUListElement>(null);
  const [run, setRun] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Results in numbers" className="shell py-16 md:py-20">
      <ul ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Stat key={s.label} stat={s} run={run} delay={i * 140} />
        ))}
      </ul>
    </section>
  );
}
