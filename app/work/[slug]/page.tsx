import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectVisual from "@/components/ProjectVisual";
import StatusTag from "@/components/StatusTag";
import { KINDS, getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — case study`,
    description: `${project.tagline}. ${project.summary}`,
    path: `/work/${project.slug}`,
  });
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-raspberry-deep" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  // only the sections this project's records actually support
  const sections = [
    {
      id: "problem",
      title: "Problem",
      body: (
        <>
          <p>{cs.problem}</p>
          {cs.users && (
            <p className="mt-4">
              <span className="label mr-2 text-mauve">Who it&rsquo;s for</span>
              {cs.users}
            </p>
          )}
        </>
      ),
    },
    cs.constraints && { id: "constraints", title: "Constraints", body: <List items={cs.constraints} /> },
    { id: "role", title: "My role", body: <p>{cs.role}</p> },
    cs.architecture && { id: "architecture", title: "Architecture", body: <List items={cs.architecture} /> },
    { id: "implementation", title: "Implementation", body: <List items={cs.implementation} /> },
    { id: "tradeoffs", title: "Trade-offs", body: <List items={cs.tradeoffs} /> },
    cs.validation && { id: "validation", title: "Testing & validation", body: <List items={cs.validation} /> },
    { id: "results", title: "Results", body: <List items={cs.results} /> },
    cs.unfinished && { id: "unfinished", title: "Still unfinished", body: <List items={cs.unfinished} /> },
  ].filter(Boolean) as { id: string; title: string; body: React.ReactNode }[];

  return (
    <article>
      <header className="shell pb-12 pt-10 md:pt-16">
        <Link href="/work" className="label inline-flex min-h-[44px] items-center gap-2 text-mauve hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label text-raspberry-deep">
              Case study {String(index + 1).padStart(2, "0")} · {KINDS[project.kind]}
            </p>
            <h1 className="display-xl mt-4">{project.name}</h1>
            <p className="mt-3 font-italic text-[clamp(1.5rem,2.6vw,2.1rem)] italic leading-snug text-ink/80">
              {project.tagline}
            </p>
            <p className="prose-body mt-6 max-w-2xl">{project.summary}</p>
          </div>

          <aside aria-label="Project facts" className="lg:col-span-4">
            <dl className="grid gap-5 border-t-2 border-ink pt-5 text-[0.95rem]">
              <div>
                <dt className="label text-mauve">Status</dt>
                <dd className="mt-1.5">
                  <StatusTag status={project.status} />
                  {project.statusNote && <p className="mt-1.5 text-sm leading-relaxed text-mauve">{project.statusNote}</p>}
                </dd>
              </div>
              <div>
                <dt className="label text-mauve">Stack</dt>
                <dd className="mt-1.5">{project.stack.join(" · ")}</dd>
              </div>
              {(project.links.live || project.links.repo) && (
                <div>
                  <dt className="label text-mauve">Links</dt>
                  <dd className="mt-1.5 flex flex-col items-start gap-1.5">
                    {project.links.live && (
                      <a href={project.links.live.href} className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        {project.links.live.label} <ArrowUpRight className="size-4" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                    {project.links.repo && (
                      <a href={project.links.repo} className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                        Source on GitHub <ArrowUpRight className="size-4" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </header>

      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <ProjectVisual project={project} priority />
        </div>
      </div>

      <div className="shell py-16 md:py-24">
        <nav aria-label="Sections" className="mb-14 hidden border-y border-rule py-4 lg:block">
          <ol className="flex flex-wrap gap-x-6 gap-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="label text-mauve hover:text-raspberry-deep">
                  {String(i + 1).padStart(2, "0")} {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-14 md:gap-20">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid gap-4 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <span aria-hidden className="label text-raspberry-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 id={`${s.id}-title`} className="display-md mt-2">
                  {s.title}
                </h2>
              </div>
              <div className="prose-body max-w-2xl lg:col-span-8 lg:pt-8">{s.body}</div>
            </section>
          ))}
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-rule bg-[#efe6dc]">
        <Link href={`/work/${next.slug}`} className="shell group flex flex-wrap items-end justify-between gap-6 py-14 md:py-20">
          <span>
            <span className="label text-mauve">Next case study</span>
            <span className="display-lg mt-2 block transition-colors group-hover:text-raspberry-deep">{next.name}</span>
          </span>
          <ArrowRight className="size-8 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
        </Link>
      </nav>
    </article>
  );
}
