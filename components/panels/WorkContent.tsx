"use client";

import { ExternalLink, Github } from "lucide-react";

import { projects } from "@/data";

function shortTitle(title: string) {
  return title.split(/[–|-]/)[0]!.trim();
}

export default function WorkContent() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-espresso/70">
        Six systems, all still running. Not screenshots — the real thing, embedded live.
      </p>
      {projects.map((project, i) => (
        <article
          key={project.id}
          className="relative overflow-hidden rounded-xl border border-cherry/10 shadow-[0_18px_40px_-24px_rgba(50,27,36,0.35)]"
          style={{
            borderTopColor: project.color,
            borderTopWidth: 3,
            background: `linear-gradient(180deg, ${project.color}0d, transparent 140px)`,
          }}
        >
          {/* a folded manila-tab detail, like a real project folder */}
          <span
            aria-hidden
            className="absolute -top-px left-6 h-3 w-16 rounded-b-md"
            style={{ background: project.color }}
          />
          <div className="flex items-center justify-between px-5 pt-4">
            <span className="label-tech">FILE {String(i + 1).padStart(2, "0")}</span>
            <span className="label-tech" style={{ color: project.color }}>
              LIVE
            </span>
          </div>
          <h3 className="px-5 pt-2 font-display text-xl text-espresso">{shortTitle(project.title)}</h3>
          <p className="px-5 pt-2 text-sm leading-relaxed text-espresso/70">{project.des}</p>
          <div className="mt-4 overflow-hidden border-t border-cherry/10 bg-white">
            <iframe
              src={project.demo}
              title={shortTitle(project.title)}
              loading="lazy"
              className="h-[260px] w-full"
            />
          </div>
          <div className="flex items-center gap-3 px-5 py-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide"
              style={{ borderColor: project.color, color: project.color }}
            >
              Open live <ExternalLink className="size-3.5" />
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 px-4 py-2 font-mono text-xs uppercase tracking-wide text-espresso/70"
            >
              <Github className="size-3.5" /> Source
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
