"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import StatusTag from "@/components/StatusTag";
import { KINDS, projects, type Kind } from "@/data/projects";

type Filter = "all" | Kind;

// only offer filters that map to at least one real project
const FILTERS: Filter[] = ["all", ...(Object.keys(KINDS) as Kind[]).filter((k) => projects.some((p) => p.kind === k))];

export default function WorkIndex() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects by kind" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "all" ? projects.length : projects.filter((p) => p.kind === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`label inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 transition-colors ${
                active ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"
              }`}
            >
              {f === "all" ? "All" : KINDS[f]}
              <span className={active ? "text-lime" : "text-mauve"}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} of {projects.length} projects.
      </p>

      <ol className="mt-10 border-t border-ink">
        {shown.map((p) => {
          const index = projects.indexOf(p) + 1;
          return (
            <li key={p.slug} className="border-b border-rule">
              <Link
                href={`/work/${p.slug}`}
                className="group grid gap-x-8 gap-y-3 py-8 transition-colors hover:bg-ink/[0.03] focus-visible:bg-ink/[0.03] md:grid-cols-[4rem_1.3fr_1fr_auto] md:items-center md:py-10"
              >
                <span className="label text-mauve">{String(index).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-none transition-colors group-hover:text-raspberry-deep">
                    {p.name}
                  </span>
                  <span className="mt-2 block font-italic text-xl italic leading-snug text-ink/80">{p.tagline}</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="label text-mauve">{KINDS[p.kind]}</span>
                  <StatusTag status={p.status} />
                  <span className="text-sm text-ink/80">{p.stack.join(" · ")}</span>
                </span>
                <span className="label inline-flex items-center gap-2 text-raspberry-deep">
                  Case study
                  <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
