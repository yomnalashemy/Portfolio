"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { projects } from "@/data";

/**
 * Replaces the old bento-grid "pin card" project gallery. A pin card shows a
 * screenshot; this shows the actual project running in an iframe — served
 * from /public/demos so it works regardless of where (or whether) each
 * project's own hosting is live yet. The animation IS the product, not a
 * decorative effect layered on top of a picture of it.
 */

function shortTitle(title: string) {
  return title.split(/[–|-]/)[0]!.trim();
}
function subtitle(title: string) {
  const parts = title.split(/[–|-]/);
  return parts.length > 1 ? parts.slice(1).join("-").trim() : "";
}

const Systems = () => {
  return (
    <section id="systems" className="py-24">
      <div className="mb-16">
        <p className="eyebrow">02 / Live systems</p>
        <h2 className="heading mt-3">Not screenshots. Running software.</h2>
        <p className="mt-4 max-w-xl text-console-muted">
          Every panel below is the real project, embedded live. Click into any of them — the
          admin dashboard actually updates, the chart actually draws, the PDF actually generates.
        </p>
      </div>

      <div className="relative flex flex-col gap-24">
        {/* the connecting trace running down the module list */}
        <div
          aria-hidden
          className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-console-line via-console-line to-transparent hidden md:block"
        />

        {projects.map((project, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div
                aria-hidden
                className="absolute left-0 top-1 hidden md:flex size-9 items-center justify-center rounded-full border border-console-line bg-console-bg font-mono text-xs text-console-amber"
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className={`md:pl-16 ${reversed ? "md:order-2" : ""}`}>
                <p className="eyebrow">{project.tag}</p>
                <h3 className="mt-2 font-mono text-2xl font-semibold text-console-ink">
                  {shortTitle(project.title)}
                </h3>
                {subtitle(project.title) && (
                  <p className="mt-1 text-sm text-console-faint">{subtitle(project.title)}</p>
                )}
                <p className="mt-4 text-console-muted leading-relaxed">{project.des}</p>

                <div className="mt-5 flex items-center gap-2.5">
                  {project.iconLists.map((icon, idx) => (
                    <div
                      key={idx}
                      className="grid size-8 place-items-center rounded-md border border-console-line bg-console-surface"
                    >
                      <img src={icon} alt="" className="size-4 opacity-80" />
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-console-amber-dim bg-console-amber/10 px-4 py-2.5 font-mono text-sm text-console-amber hover:bg-console-amber/20 transition-colors"
                  >
                    Open live <ExternalLink className="size-3.5" />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-console-line px-4 py-2.5 font-mono text-sm text-console-muted hover:text-console-ink hover:border-console-faint transition-colors"
                  >
                    <Github className="size-3.5" /> Source
                  </a>
                </div>
              </div>

              <div className={reversed ? "md:order-1" : ""}>
                <div className="rounded-xl border border-console-line bg-console-raised p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-2 px-2 py-2">
                    <span className="size-2 rounded-full bg-console-good" />
                    <span className="font-mono text-[11px] text-console-faint truncate">
                      {project.demo.replace(/index\.html$/, "")}
                    </span>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-console-line bg-white">
                    <iframe
                      src={project.demo}
                      title={shortTitle(project.title)}
                      loading="lazy"
                      className="w-full h-[420px] md:h-[460px]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Systems;
