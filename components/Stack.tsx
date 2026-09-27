"use client";

/**
 * A continuously-scrolling ticker of the real tools behind the six systems
 * above — deliberately broad. Security tooling (Burp/Wireshark/CEH) is two
 * chips out of fourteen here, not the headline: this section exists so the
 * page reads as "full-stack builder who's also comfortable in security,"
 * not "security person who codes." n8n and SQL/PostgreSQL get real credit
 * since they carry real weight in ITQAN and Sentinel — described generically,
 * nothing about what Sentinel actually does at Ziina.
 */

const TOOLS = [
  { name: "TypeScript", note: "ITQAN — ~61K lines, frontend and backend" },
  { name: "PostgreSQL / SQL", note: "Sentinel's 42-CTE investigation search; ITQAN's data layer" },
  { name: "n8n", note: "automating the repetitive parts of investigation work" },
  { name: "Next.js", note: "every one of these six systems" },
  { name: "NestJS", note: "ITQAN's 147 API routes" },
  { name: "Python", note: "KYB automations, Lupira's SVM model" },
  { name: "MongoDB", note: "Lupira's diagnosis history" },
  { name: "Redis", note: "ITQAN's background jobs" },
  { name: "Docker", note: "infra for all of it" },
  { name: "Flutter", note: "Lupira's mobile layer" },
  { name: "Appwrite", note: "CuraCare & Horizon Banking" },
  { name: "Scikit-learn", note: "Lupira's risk model" },
  { name: "BurpSuite / Wireshark", note: "comfortable there too" },
  { name: "CEH", note: "module 03/20 — currently in progress" },
] as const;

function Ticker({ reverse = false }: { reverse?: boolean }) {
  const items = [...TOOLS, ...TOOLS];
  return (
    <div className="flex w-max gap-3 animate-[scroll_48s_linear_infinite] hover:[animation-play-state:paused]" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {items.map((t, i) => (
        <div
          key={`${t.name}-${i}`}
          className="flex items-center gap-3 shrink-0 rounded-md border border-console-line bg-console-surface px-4 py-3"
        >
          <span className="size-1.5 rounded-full bg-console-amber shrink-0" />
          <span className="font-mono text-sm text-console-ink whitespace-nowrap">{t.name}</span>
          <span className="text-xs text-console-faint whitespace-nowrap">{t.note}</span>
        </div>
      ))}
    </div>
  );
}

const Stack = () => {
  return (
    <section className="py-20 border-y border-console-line -mx-5 sm:-mx-10 px-5 sm:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow">What it&apos;s actually built with</p>
        <h2 className="heading mt-3 mb-10">Broad stack. Deep in a few places.</h2>
      </div>
      <div className="flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Ticker />
        <Ticker reverse />
      </div>
    </section>
  );
};

export default Stack;
