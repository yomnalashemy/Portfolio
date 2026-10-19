"use client";

import { ExternalLink, Github, Laptop as LaptopIcon, NotebookText, Smartphone } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { projects, type Project } from "@/data";

import MacFrame from "../mockups/MacFrame";
import PhoneFrame from "../mockups/PhoneFrame";

function shortTitle(title: string) {
  return title.split(/[–|-]/)[0]!.trim();
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [device, setDevice] = React.useState<"mac" | "phone">("mac");
  const title = shortTitle(project.title);

  return (
    <article
      className="relative overflow-hidden rounded-xl border border-cherry/10 shadow-[0_18px_40px_-24px_rgba(50,27,36,0.35)]"
      style={{
        borderTopColor: project.color,
        borderTopWidth: 3,
        background: `linear-gradient(180deg, ${project.color}0d, transparent 140px)`,
      }}
    >
      {/* a folded manila-tab detail, like a real project folder */}
      <span aria-hidden className="absolute -top-px left-6 h-3 w-16 rounded-b-md" style={{ background: project.color }} />
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="label-tech">FILE {String(index + 1).padStart(2, "0")}</span>
        <span className="label-tech" style={{ color: project.color }}>
          LIVE
        </span>
      </div>
      <h3 className="px-5 pt-2 font-display text-xl text-espresso">{title}</h3>
      <p className="px-5 pt-2 text-sm leading-relaxed text-espresso/70">{project.des}</p>

      {/* Mac/iPhone toggle — same live site, scrollable and navigable
          inside whichever device frame is active, not a static screenshot */}
      <div className="mt-4 flex justify-center gap-2 px-5">
        <button
          type="button"
          onClick={() => setDevice("mac")}
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
          style={{
            borderColor: device === "mac" ? project.color : "rgba(50,27,36,0.15)",
            color: device === "mac" ? project.color : "rgba(50,27,36,0.55)",
            background: device === "mac" ? `${project.color}14` : "transparent",
          }}
        >
          <LaptopIcon className="size-3.5" /> Mac
        </button>
        <button
          type="button"
          onClick={() => setDevice("phone")}
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
          style={{
            borderColor: device === "phone" ? project.color : "rgba(50,27,36,0.15)",
            color: device === "phone" ? project.color : "rgba(50,27,36,0.55)",
            background: device === "phone" ? `${project.color}14` : "transparent",
          }}
        >
          <Smartphone className="size-3.5" /> iPhone
        </button>
      </div>

      <div className="mt-5 px-5 pb-2">
        {device === "mac" ? (
          <MacFrame src={project.demo} title={title} />
        ) : (
          <PhoneFrame src={project.demo} title={title} />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
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
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 px-4 py-2 font-mono text-xs uppercase tracking-wide text-espresso/70"
        >
          <NotebookText className="size-3.5" /> Case study
        </Link>
      </div>
    </article>
  );
}

export default function WorkContent() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-espresso/70">
        Six systems, all still running. Not screenshots — the real thing, scrollable inside a real Mac or
        iPhone.
      </p>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
