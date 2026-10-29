import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/data";

import MacFrame from "@/components/mockups/MacFrame";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.tag} — Yomna Alshemy`,
    description: project.des,
  };
}

function shortTitle(title: string) {
  return title.split(/[–|-]/)[0]!.trim();
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { caseStudy: cs } = project;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-buttercream px-5 pb-24 pt-14 md:px-10 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="label-tech inline-flex items-center gap-1.5 text-espresso/60 hover:text-raspberry"
        >
          <ArrowLeft className="size-3.5" /> back to the archive
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span aria-hidden className="h-8 w-1.5 rounded-full" style={{ background: project.color }} />
          <p className="label-tech" style={{ color: project.color }}>
            {project.tag}
          </p>
        </div>
        <h1 className="display-lg mt-2 text-espresso">{shortTitle(project.title)}</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-espresso/70">{project.des}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide"
            style={{ borderColor: project.color, color: project.color }}
          >
            Open live <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-espresso/15 px-4 py-2 font-mono text-xs uppercase tracking-wide text-espresso/70"
          >
            <Github className="size-3.5" /> Source
          </a>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="label-tech rounded-full border border-espresso/10 px-2.5 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <MacFrame src={project.demo} title={shortTitle(project.title)} />
        </div>

        <div className="mt-16 flex flex-col gap-12">
          <section>
            <p className="label-tech">THE PROBLEM</p>
            <p className="mt-3 text-[15px] leading-relaxed text-espresso/80">{cs.problem}</p>
          </section>

          <section>
            <p className="label-tech">MY ROLE</p>
            <p className="mt-3 text-[15px] leading-relaxed text-espresso/80">{cs.role}</p>
          </section>

          <section>
            <p className="label-tech">KEY DECISIONS</p>
            <ul className="mt-3 flex flex-col gap-3">
              {cs.decisions.map((d) => (
                <li key={d} className="flex gap-2.5 text-[15px] leading-relaxed text-espresso/80">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-raspberry/50" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="label-tech">TRADE-OFFS</p>
            <ul className="mt-3 flex flex-col gap-3">
              {cs.tradeoffs.map((t) => (
                <li key={t} className="flex gap-2.5 text-[15px] leading-relaxed text-espresso/80">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-champagne-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-dashed border-champagne-gold/50 bg-pearl/60 p-6">
            <p className="label-tech">OUTCOME</p>
            <p className="mt-3 text-[15px] leading-relaxed text-espresso/80">{cs.outcome}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
