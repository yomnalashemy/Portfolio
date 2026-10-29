import Image from "next/image";

import type { Project } from "@/data/projects";

const SURFACE: Record<Project["surface"], string> = {
  rose: "bg-gradient-to-br from-rose via-rose to-lilac",
  sage: "bg-gradient-to-br from-sage via-sage to-lime/70",
  lime: "bg-gradient-to-br from-lime via-lime to-sage",
  paper: "bg-gradient-to-br from-[#efe6dc] to-rose/60",
};

function Step({ n, children, strong }: { n: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <li
      className={`relative flex items-start gap-3 rounded-xl px-4 py-3 text-[0.95rem] leading-snug [&:not(:first-child)]:mt-4 ${
        strong ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <span aria-hidden className="absolute -top-4 left-7 h-4 w-px bg-ink/30 [li:first-child>&]:hidden" />
      <span className={`label pt-0.5 ${strong ? "text-lime" : "text-raspberry-deep"}`}>{n}</span>
      <span>{children}</span>
    </li>
  );
}

/** ITQAN: how text is recovered from PDFs with corrupted font maps */
function ItqanDiagram() {
  return (
    <div>
      <p className="label text-ink/80">Recovering exam text from broken PDFs</p>
      <p aria-hidden className="mt-4 select-none rounded-xl bg-ink/90 px-4 py-3 font-mono text-[0.95rem] tracking-wider text-paper/70">
        ⟊ʘ̸ ⌀ɮ ʭ⊄ ȻɄ⫶ ʓ∤ ⟟ʘ ⌇ɮ
      </p>
      <ol className="mt-3 flex flex-col">
        <Step n="01">Known-plaintext cribs anchor the first glyphs</Step>
        <Step n="02">A trigram model trained on the syllabus scores guesses</Step>
        <Step n="03">Coordinate-ascent solving settles the mapping</Step>
        <Step n="→" strong>
          98.1% character accuracy, 100% question-anchoring on 20 real papers
        </Step>
      </ol>
    </div>
  );
}

/** Sentinel: one dataset, rendered through interchangeable templates */
function SentinelDiagram() {
  const templates = [
    { name: "Template A", cls: "font-display text-lg", bar: "bg-raspberry" },
    { name: "Template B", cls: "font-mono text-sm uppercase tracking-wider", bar: "bg-ink" },
    { name: "Template C", cls: "font-sans font-semibold", bar: "bg-lime" },
  ];
  return (
    <div>
      <p className="label text-ink/80">One engine, many documents</p>
      <div className="mt-4 rounded-xl bg-ink px-4 py-3 font-mono text-[0.85rem] leading-relaxed text-paper/90">
        <span className="text-lime">case</span> = &#123; reference, parties, timeline, evidence[] &#125;
      </div>
      <div aria-hidden className="mx-auto h-5 w-px bg-ink/30" />
      <div className="rounded-xl border-2 border-dashed border-ink/30 px-4 py-2.5 text-center">
        <span className="label text-ink">Rendering engine</span>
      </div>
      <div aria-hidden className="mx-auto h-5 w-px bg-ink/30" />
      <ul className="grid grid-cols-3 gap-2.5">
        {templates.map((t) => (
          <li key={t.name} className="overflow-hidden rounded-lg bg-paper shadow-[0_10px_24px_-16px_rgba(42,21,40,0.5)]">
            <span aria-hidden className={`block h-1.5 ${t.bar}`} />
            <div className="p-2.5 sm:p-3">
              <span className={`block leading-tight text-ink ${t.cls}`}>{t.name}</span>
              <span aria-hidden className="mt-2 block h-1 w-4/5 rounded bg-ink/15" />
              <span aria-hidden className="mt-1 block h-1 w-3/5 rounded bg-ink/15" />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-snug text-ink/80">
        Illustration of the public miniature&rsquo;s pattern. The production tool and its data stay inside Ziina.
      </p>
    </div>
  );
}

/** Lupira: the real app screen, with the screening flow beside it */
function LupiraVisual({ project }: { project: Project }) {
  const img = project.image!;
  return (
    <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] items-center gap-4 sm:gap-6">
      <div className="overflow-hidden rounded-[22px] border-[6px] border-ink bg-ink shadow-[0_24px_40px_-24px_rgba(42,21,40,0.6)]">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 220px, 40vw" className="h-auto w-full" />
      </div>
      <ol className="flex flex-col gap-2 text-[0.9rem] leading-snug">
        {["Patient-reported symptoms", "Mapped to EULAR/ACR criteria", "SVM risk estimate"].map((s, i) => (
          <li key={s} className="rounded-lg bg-paper px-3 py-2">
            <span className="label mr-2 text-raspberry-deep">0{i + 1}</span>
            {s}
          </li>
        ))}
        <li className="rounded-lg bg-ink px-3 py-2 text-paper">
          <span className="label mr-2 text-lime">→</span>
          Guidance toward a clinician, never a diagnosis
        </li>
      </ol>
    </div>
  );
}

export default function ProjectVisual({ project, priority }: { project: Project; priority?: boolean }) {
  let content: React.ReactNode = null;
  if (project.slug === "itqan") content = <ItqanDiagram />;
  else if (project.slug === "sentinel") content = <SentinelDiagram />;
  else if (project.slug === "lupira") content = <LupiraVisual project={project} />;
  else if (project.image) {
    content = (
      <figure>
        <div className="overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_24px_48px_-28px_rgba(42,21,40,0.55)]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority={priority}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="label mt-3 text-ink/80">Screenshot of the deployed app</figcaption>
      </figure>
    );
  }

  return (
    <div
      className={`rounded-[28px] p-5 shadow-[0_30px_60px_-36px_rgba(42,21,40,0.55)] sm:p-8 ${
        SURFACE[project.surface]
      }`}
    >
      {content}
    </div>
  );
}
