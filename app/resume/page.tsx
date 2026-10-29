import { Download } from "lucide-react";
import Link from "next/link";

import PageIntro from "@/components/PageIntro";
import { projects } from "@/data/projects";
import { certifications, education, experience, site, skills } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Résumé",
  description:
    "Yomna Alshemy's résumé: Senior FinCrime Analyst at Ziina, full-stack engineer, B.Sc. Computer Science (MUST, GPA 3.86). Readable in the browser or as a PDF.",
  path: "/resume",
});

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-ink py-12 lg:grid-cols-12">
      <h2 id={id} className="display-md lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageIntro label="Résumé" title="Yomna Alshemy">
        <p>{site.role}. The same content as the PDF, readable here.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={site.resumePdf} className="btn-primary" download>
            Download PDF <Download className="size-4" aria-hidden />
          </a>
          <a href={site.resumePdf} className="btn-ghost" target="_blank" rel="noopener noreferrer">
            Open PDF in a new tab
          </a>
        </div>
      </PageIntro>

      <div className="shell pb-24">
        <Block id="r-experience" title="Experience">
          <ol className="flex flex-col gap-12">
            {experience.map((r) => (
              <li key={r.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-2xl leading-snug">{r.title}</h3>
                  <p className="label text-mauve">{r.dates}</p>
                </div>
                <p className="mt-1 text-ink/80">
                  {r.org} · {r.location}
                  {r.current && <span className="label ml-3 rounded-full bg-lime px-2 py-0.5 text-ink">Current</span>}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 leading-relaxed">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-raspberry-deep" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {r.project && (
                  <p className="mt-3">
                    <Link href={`/work/${r.project}`} className="link text-sm">
                      Case study: {projects.find((p) => p.slug === r.project)?.name}
                    </Link>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Block>

        <Block id="r-education" title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-2xl leading-snug">{education.degree}</h3>
            <p className="label text-mauve">{education.date}</p>
          </div>
          <p className="mt-1 text-ink/80">
            {education.school} · {education.location}
          </p>
          <p className="mt-3">{education.detail}</p>
          <p className="mt-2 text-sm leading-relaxed text-mauve">Coursework: {education.coursework}</p>
        </Block>

        <Block id="r-projects" title="Projects">
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="link font-display text-xl">
                  {p.name}
                </Link>
                <p className="mt-1 text-sm text-ink/80">{p.tagline}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="r-skills" title="Skills">
          <dl className="grid gap-6 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group}>
                <dt className="label text-mauve">{s.group}</dt>
                <dd className="mt-2 leading-relaxed">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block id="r-certs" title="Certifications">
          <ul className="flex flex-col divide-y divide-rule">
            {certifications.map((c) => (
              <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span>
                  {c.name} <span className="text-mauve">· {c.issuer}</span>
                </span>
                <span className={`label ${c.inProgress ? "rounded-full bg-lime px-2 py-0.5 text-ink" : "text-mauve"}`}>
                  {c.inProgress ? `In progress · ${c.date}` : c.date}
                </span>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </>
  );
}
