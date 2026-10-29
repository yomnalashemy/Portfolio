import Link from "next/link";

import PageIntro from "@/components/PageIntro";
import { experience } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "How Yomna Alshemy went from penetration testing to financial-crime investigation and full-stack engineering, and the principles behind the work.",
  path: "/about",
});

const INTERESTS = [
  {
    title: "Fraud as a systems problem",
    body: "Financial-crime patterns behave like anomaly-detection problems wearing a compliance costume. Most of my tooling starts from that idea.",
  },
  {
    title: "LLMs where they're accountable",
    body: "My chargeback-defense pipeline separates retrieval and reasoning from generation, and every draft goes to an analyst for review before anything is submitted.",
  },
  {
    title: "Security, from the attacking side",
    body: "Working toward CEH Master (312-50v13), targeting December 2026 — the same curiosity that started with CTF challenges.",
  },
  {
    title: "Interfaces that hold up",
    body: "Design systems, semantic tokens, and accessibility checks that run automatically instead of being remembered.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title={
          <>
            I learned to build systems by <span className="font-italic italic text-raspberry-deep">trying to break them.</span>
          </>
        }
      >
        <p>
          I&rsquo;m Yomna — a Senior FinCrime Analyst at Ziina, working remotely from Cairo with a team in Dubai, and a
          full-stack engineer who builds the tools my work keeps asking for.
        </p>
      </PageIntro>

      <section aria-labelledby="story-title" className="shell grid gap-6 pb-20 lg:grid-cols-12">
        <h2 id="story-title" className="label text-mauve lg:col-span-3">
          The story so far
        </h2>
        <div className="prose-body flex max-w-2xl flex-col gap-5 lg:col-span-9">
          <p>
            I started in penetration testing and CTF challenges. Finding the gap in someone else&rsquo;s system taught
            me early that most failures aren&rsquo;t dramatic — they&rsquo;re a default nobody questioned, or a step
            everyone repeats by hand.
          </p>
          <p>
            I studied Computer Science at Misr University for Science and Technology, graduating in 2025 with a 3.86
            GPA. Along the way I worked in IT and compliance support, watching for unusual access patterns, and as a
            research assistant leading a lupus-screening app built on an SVM model.
          </p>
          <p>
            At Ziina I investigate fraud, KYB, sanctions, and chargeback cases end to end. When the same slow step kept
            showing up, I built something for it:{" "}
            <Link href="/work/sentinel" className="link">
              Sentinel
            </Link>{" "}
            for law-enforcement responses, Python automations for KYB remediation, and a reviewed LLM pipeline for
            chargeback defense. Outside work I build products like{" "}
            <Link href="/work/itqan" className="link">
              ITQAN
            </Link>
            , a revision platform used across the UAE and Egypt.
          </p>
        </div>
      </section>

      <section aria-labelledby="interests-title" className="border-y border-rule bg-[#efe6dc]">
        <div className="shell grid gap-10 py-20 lg:grid-cols-12">
          <h2 id="interests-title" className="label text-mauve lg:col-span-3">
            What I&rsquo;m interested in
          </h2>
          <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-9">
            {INTERESTS.map((it) => (
              <li key={it.title} className="border-t border-ink pt-5">
                <h3 className="font-display text-2xl leading-tight">{it.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/85">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exp-title" className="shell grid gap-10 py-20 lg:grid-cols-12">
        <h2 id="exp-title" className="label text-mauve lg:col-span-3">
          Where I&rsquo;ve worked
        </h2>
        <div className="lg:col-span-9">
          <ol className="border-t border-ink">
            {experience.map((r) => (
              <li key={r.title} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[1fr_auto] md:gap-8">
                <div>
                  <p className="font-display text-xl leading-snug">{r.title}</p>
                  <p className="mt-1 text-ink/80">{r.org}</p>
                </div>
                <p className="label text-mauve md:pt-1.5">{r.dates}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link href="/resume" className="link">
              Full résumé, with every responsibility and result
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="personal-title" className="shell grid gap-6 pb-24 lg:grid-cols-12">
        <h2 id="personal-title" className="label text-mauve lg:col-span-3">
          A few more things
        </h2>
        <ul className="prose-body flex max-w-2xl flex-col gap-3 lg:col-span-9">
          <li>Arabic is my native language; my English is at bilingual proficiency.</li>
          <li>Ranked 12th in my Computer Science class.</li>
          <li>
            I&rsquo;ll read the whole log file. <span className="font-script text-2xl text-raspberry-deep">Every line.</span>
          </li>
        </ul>
      </section>
    </>
  );
}
