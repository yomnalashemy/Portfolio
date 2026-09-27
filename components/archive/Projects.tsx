"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { projects } from "@/data";

function shortTitle(title: string) {
  return title.split(/[–|-]/)[0]!.trim();
}

export default function Projects() {
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="label-tech mb-3 text-steel">03 / ARCHIVE</p>
        <h2 className="display-lg text-bone">
          Six experiments. <span className="italic-phrase text-dusty-rose">All of them running.</span>
        </h2>
      </div>

      <div className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            data-cursor="INSPECT"
            className="group relative flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-steel/25 bg-obsidian/60 md:w-[560px]"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] opacity-70"
              style={{ background: project.color }}
            />

            <div className="flex items-center justify-between px-7 pt-7">
              <span className="label-tech text-steel">
                EXPERIMENT {String(i + 1).padStart(3, "0")}
              </span>
              <span className="label-tech flex items-center gap-1.5" style={{ color: project.color }}>
                <span className="size-1.5 rounded-full" style={{ background: project.color }} />
                LIVE
              </span>
            </div>

            <h3 className="px-7 pt-4 font-display text-2xl text-bone">{shortTitle(project.title)}</h3>
            <p className="px-7 pt-3 text-sm leading-relaxed text-steel">{project.des}</p>

            <div className="mt-5 flex flex-wrap gap-2 px-7">
              {project.iconLists.map((icon, idx) => (
                <div key={idx} className="grid size-7 place-items-center rounded border border-steel/25 bg-obsidian">
                  <img src={icon} alt="" className="size-3.5 opacity-70" />
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-sm border-t border-steel/20 bg-white">
              <iframe
                src={project.demo}
                title={shortTitle(project.title)}
                loading="lazy"
                className="h-[280px] w-full opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            <div className="mt-auto flex items-center gap-3 px-7 py-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN FILE"
                className="inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors"
                style={{ borderColor: project.color, color: project.color }}
              >
                Open live <ExternalLink className="size-3.5" />
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-steel/30 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-steel transition-colors hover:text-bone"
              >
                <Github className="size-3.5" /> Source
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="label-tech px-6 text-steel md:px-10">← drag or scroll to browse the archive →</p>
    </section>
  );
}
