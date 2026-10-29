import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import CopyEmail from "@/components/CopyEmail";
import ProjectVisual from "@/components/ProjectVisual";
import SignalMap from "@/components/SignalMap";
import StatementLine from "@/components/StatementLine";
import StatusTag from "@/components/StatusTag";
import { KINDS, projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata = { alternates: { canonical: "/" } };

const featured = projects.filter((p) => p.featured);

const PRINCIPLES = [
  {
    title: "Investigate before concluding",
    body: "The first explanation is usually the convenient one. I follow the data until it stops surprising me.",
    evidence:
      "Traced the coordinated card attack behind Ziina's worst fraud month by following IBAN and P2P chains — 60+ accounts mapped for ban.",
  },
  {
    title: "Make systems understandable",
    body: "A tool only helps if the next person can read it, run it, and trust it. Structure is part of the deliverable.",
    evidence:
      "Sentinel keeps templates fully separate from case data, and the chargeback process now has a 5-network reason-code playbook and a 5-document SOP suite.",
  },
  {
    title: "Sweat the details that decide whether it works",
    body: "Dry runs, resumability, rate limits, contrast ratios — the unglamorous parts are where things actually break.",
    evidence:
      "Three dry-run-safe, resumable KYB automations cut field-set failures from 303 to 1. ITQAN's 11 audit scripts caught unstyled buttons before launch.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="shell grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="label text-raspberry-deep">Senior FinCrime Analyst at Ziina · Full-stack engineer</p>
          <h1 className="display-xl mt-5 text-balance">
            I find the signal in complex systems,{" "}
            <span className="font-italic italic text-raspberry-deep">then build the tools</span> that keep it
            visible.
          </h1>
          <p className="prose-body mt-6 max-w-xl text-pretty">
            By day I investigate fraud, sanctions, and compliance cases. Alongside that, I build the software that
            makes those problems faster to solve — from a 42-CTE SQL case search running in production to a
            revision platform with 1,025 automated tests.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">
              Explore selected work <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link href="/resume" className="btn-ghost">
              Read the résumé
            </Link>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 border-t border-rule pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="label text-mauve">Builds with</dt>
              <dd className="mt-1">TypeScript, Next.js, NestJS, Python, SQL, PostgreSQL</dd>
            </div>
            <div>
              <dt className="label text-mauve">Investigates</dt>
              <dd className="mt-1">Fraud, KYB, sanctions &amp; PEP, chargebacks</dd>
            </div>
          </dl>
        </div>
        <SignalMap />
      </section>

      {/* 2 — Working philosophy */}
      <StatementLine />

      {/* 3 — Selected work */}
      <section id="work" aria-labelledby="work-title" className="shell py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-8">
          <div>
            <p className="label text-raspberry-deep">Selected work</p>
            <h2 id="work-title" className="display-lg mt-3">
              Three systems, <span className="font-italic italic">three kinds of problem</span>
            </h2>
          </div>
          <Link href="/work" className="link font-mono text-sm uppercase tracking-[0.1em]">
            All {projects.length} projects
          </Link>
        </div>

        <ol className="flex flex-col">
          {featured.map((p, i) => (
            <li key={p.slug} className="group grid gap-10 border-b border-rule py-14 last:border-0 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className={`reveal lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ProjectVisual project={p} priority={i === 0} />
              </div>
              <article className={`flex flex-col lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="label text-mauve">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </span>
                  <span className="label text-mauve">{KINDS[p.kind]}</span>
                </div>
                <h3 className="display-lg mt-4">{p.name}</h3>
                <p className="mt-2 font-italic text-2xl italic leading-snug text-ink/80">{p.tagline}</p>

                <dl className="mt-7 grid gap-5 text-[0.98rem] leading-relaxed">
                  <div>
                    <dt className="label text-mauve">The problem</dt>
                    <dd className="mt-1.5">{p.summary}</dd>
                  </div>
                  <div>
                    <dt className="label text-mauve">My part</dt>
                    <dd className="mt-1.5">{p.caseStudy.role}</dd>
                  </div>
                  <div>
                    <dt className="label text-mauve">Status</dt>
                    <dd className="mt-1.5">
                      <StatusTag status={p.status} />
                      {p.statusNote && <p className="mt-1.5 text-sm text-mauve">{p.statusNote}</p>}
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Stack</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2" aria-label="Stack">
                        {p.stack.map((s) => (
                          <li key={s} className="rounded-full border border-rule px-3 py-1 font-mono text-xs">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href={`/work/${p.slug}`} className="btn-primary">
                    Read the case study<span className="sr-only">: {p.name}</span>
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  {p.links.live && (
                    <a href={p.links.live.href} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                      {p.links.live.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* 4 — Engineering approach */}
      <section aria-labelledby="approach-title" className="border-y border-rule bg-[#efe6dc]">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="label text-raspberry-deep lg:col-span-3">How I work</p>
            <h2 id="approach-title" className="display-lg lg:col-span-9">
              Three habits, <span className="font-italic italic">each with a receipt.</span>
            </h2>
          </div>
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {PRINCIPLES.map((pr, i) => (
              <li key={pr.title} className="reveal flex flex-col border-t-2 border-ink pt-6">
                <span aria-hidden className="font-display text-6xl leading-none text-raspberry">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight">{pr.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/85">{pr.body}</p>
                <p className="mt-5 border-l-2 border-raspberry-deep pl-4 text-sm leading-relaxed text-mauve">
                  <span className="label mb-1 block text-raspberry-deep">In practice</span>
                  {pr.evidence}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Contact */}
      <section aria-labelledby="contact-title" className="bg-lime">
        <div className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">Contact</p>
            <h2 id="contact-title" className="display-lg mt-3">
              Have a messy system, a suspicious pattern, or a role in mind?
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <a
              href={`mailto:${site.email}`}
              className="break-all font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} />
            <p className="text-sm">
              Or see the{" "}
              <Link href="/resume" className="underline underline-offset-4">
                résumé
              </Link>{" "}
              and{" "}
              <a href={site.github} className="underline underline-offset-4">
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
