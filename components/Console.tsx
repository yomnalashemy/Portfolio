"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { projects } from "@/data";

/**
 * The central hook, take two. The first version (three giant stacked words)
 * was a common manifesto trick and still read as "another portfolio
 * gimmick." This is a real REPL instead — not scripted animation, an actual
 * input a visitor types into. `ping` genuinely fetches all six live project
 * URLs from the visitor's own browser and prints real elapsed time; `resume`
 * triggers the real download; `why` answers in the same blunt, specific
 * voice as everywhere else on this site. Nothing here is faked.
 *
 * `ping` uses mode: "no-cors" — the response is opaque (no status code
 * readable), but the promise still resolves/rejects on real network
 * activity, so elapsed time is real even though we can't read the body.
 * Labelled "responded" rather than "200 OK" to stay honest about that.
 */

interface Line {
  kind: "input" | "output" | "muted";
  text: string;
}

const HINTS = ["ping", "resume", "whoami", "why", "hire me", "help"];

function useRotatingHint() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % HINTS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return HINTS[i];
}

const HELP_TEXT = [
  "commands:",
  "  ping        check all six live systems, for real, right now",
  "  whoami      who's behind this",
  "  why         why you'd hire me, no résumé-speak",
  "  resume      download the résumé",
  "  hire        jump to contact",
  "  clear       clear this",
];

async function pingOne(name: string, url: string): Promise<{ name: string; ms: number | null }> {
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    await fetch(url, { mode: "no-cors", signal: controller.signal, cache: "no-store" });
    clearTimeout(timeout);
    return { name, ms: Math.round(performance.now() - started) };
  } catch {
    clearTimeout(timeout);
    return { name, ms: null };
  }
}

const Console = () => {
  const [lines, setLines] = React.useState<Line[]>([
    { kind: "muted", text: "yomna@systems — type a command. try `help`." },
  ]);
  const [value, setValue] = React.useState("");
  const [pinging, setPinging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const hint = useRotatingHint();

  const push = (line: Line) => setLines((prev) => [...prev, line]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const runPing = async () => {
    setPinging(true);
    push({ kind: "output", text: "pinging 6 live systems…" });

    // All six kick off in parallel; each prints the moment IT resolves, not
    // in list order — otherwise one slow cold-start earlier in the array
    // would block results that already finished from showing up sooner.
    let remaining = projects.map((p) => pingOne(p.tag, p.link));
    while (remaining.length) {
      const winner = await Promise.race(remaining.map((p, idx) => p.then((r) => ({ r, idx }))));
      remaining = remaining.filter((_, idx) => idx !== winner.idx);
      const { name, ms } = winner.r;
      push({
        kind: "output",
        text:
          ms === null
            ? `  ○ ${name.padEnd(16, " ")} cold start — still waking up`
            : `  ● ${name.padEnd(16, " ")} responded in ${ms}ms`,
      });
    }
    push({ kind: "muted", text: "done — Render free tier, so a cold ○ just means it was asleep." });
    setPinging(false);
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    push({ kind: "input", text: raw });

    if (!cmd) return;
    if (cmd === "help") {
      HELP_TEXT.forEach((t) => push({ kind: "output", text: t }));
    } else if (cmd === "ping") {
      void runPing();
    } else if (cmd === "whoami") {
      push({ kind: "output", text: "FinCrime analyst at Ziina by day. Full-stack engineer always." });
      push({ kind: "output", text: "Six of my own systems are live above — try `ping`." });
    } else if (cmd === "why" || cmd === "why you" || cmd === "why should i hire you") {
      push({ kind: "output", text: "Because I ship. A KYB pipeline from 303 failures to 1." });
      push({ kind: "output", text: "Six production systems, built solo, still running. Ask them yourself — `ping`." });
    } else if (cmd === "resume" || cmd === "cv" || cmd === "résumé") {
      push({ kind: "output", text: "→ opening resume.pdf" });
      window.open("/resume.pdf", "_blank", "noopener,noreferrer");
    } else if (cmd === "hire" || cmd === "hire me" || cmd === "contact") {
      push({ kind: "output", text: "→ scrolling to contact" });
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "sudo hire me") {
      push({ kind: "output", text: "[sudo] password for hiring-manager: ********" });
      push({ kind: "output", text: "permission granted. → scrolling to contact" });
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "clear") {
      setLines([]);
      return;
    } else {
      push({ kind: "muted", text: `command not found: ${raw} — try \`help\`` });
    }
  };

  return (
    <section className="py-24 flex flex-col items-center">
      <p className="eyebrow">The pitch, live</p>
      <h2 className="heading mt-3 text-center">Don&rsquo;t take my word for it. Ask it yourself.</h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 w-full max-w-2xl rounded-lg border border-console-line bg-console-surface overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-1.5 border-b border-console-line px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#e0605a]" />
          <span className="size-2.5 rounded-full bg-console-amber" />
          <span className="size-2.5 rounded-full bg-console-good" />
          <span className="ml-3 font-mono text-[11px] text-console-faint">yomna@systems — zsh</span>
        </div>

        <div ref={scrollRef} className="max-h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "input"
                  ? "text-console-ink"
                  : l.kind === "muted"
                    ? "text-console-faint"
                    : "text-console-muted whitespace-pre"
              }
            >
              {l.kind === "input" ? (
                <>
                  <span className="text-console-amber">%</span> {l.text}
                </>
              ) : (
                l.text
              )}
            </div>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-console-line px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (pinging) return;
            const v = value;
            setValue("");
            run(v);
          }}
        >
          <span className="font-mono text-sm text-console-amber shrink-0">%</span>
          <input
            ref={inputRef}
            id="console-input"
            type="text"
            value={value}
            disabled={pinging}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`try "${hint}"`}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent font-mono text-sm text-console-ink placeholder:text-console-faint outline-none disabled:opacity-50"
          />
        </form>
      </motion.div>

      <p className="mt-4 text-xs text-console-faint">No script, no fake typing effect — it&rsquo;s a real input. Try <span className="font-mono text-console-amber">ping</span>.</p>
    </section>
  );
};

export default Console;
