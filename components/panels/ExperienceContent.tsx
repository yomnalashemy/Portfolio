"use client";

import Link from "next/link";

type Role = {
  title: string;
  org: string;
  location: string;
  dates: string;
  current?: boolean;
  bullets: string[];
  /** when a role produced one of the live systems in The Archive, link to it */
  seeProject?: string;
};

// every figure here is lifted straight from the résumé (public/resume.pdf) —
// nothing rounded up, nothing invented for effect.
const ROLES: Role[] = [
  {
    title: "Senior FinCrime Analyst — Automation & Investigations",
    org: "Ziina",
    location: "Dubai, UAE (Remote)",
    dates: "Aug 2025 — Present",
    current: true,
    bullets: [
      "Designed and built Sentinel, a self-initiated tool suite that cut case response time from 9 to 6.9 minutes — it now runs the team's law-enforcement response process.",
      "Initiated and built a RAG-based chargeback-defense automation: an n8n-orchestrated, two-stage (retrieval/reasoning → generation) LLM pipeline that drafts representment packages straight from the Dispute Register for analyst review — architected to replace a third-party defense vendor.",
      "Built three production Python automations for KYB remediation that cut field-set failures from 303 to 1.",
    ],
    seeProject: "Sentinel",
  },
  {
    title: "Research Assistant — AI-Powered Lupus Diagnosis Assistant",
    org: "Misr University for Science and Technology (MUST)",
    location: "Cairo, Egypt",
    dates: "Sept 2024 — June 2025",
    bullets: [
      "Led development of a mobile app applying an SVM model aligned with EULAR/ACR diagnostic criteria to assess lupus probability from patient-reported data.",
      "Ran data preprocessing, feature engineering, and model validation, then integrated the AI output into a full-stack mobile app for real healthcare use.",
    ],
    seeProject: "Lupira",
  },
  {
    title: "IT & Compliance Support Intern",
    org: "MUST at SCEEP",
    location: "Cairo, Egypt",
    dates: "July 2022 — Feb 2025",
    bullets: [
      "Monitored student and staff activity across internal systems to catch unusual access patterns.",
      "Supported compliance reviews of internal digital platforms, contributing UI/UX audits and interface-security suggestions.",
    ],
  },
];

export default function ExperienceContent() {
  return (
    <div>
      <p className="text-sm text-espresso/70">
        Three roles, in order. The full breakdown — education, certifications, every bullet — is one tab
        away in <Link href="/resume" className="underline decoration-cherry/40 underline-offset-2 hover:text-raspberry">the résumé</Link>.
      </p>

      <ol className="relative mt-8 flex flex-col gap-10 border-l border-champagne-gold/50 pl-7">
        {ROLES.map((role) => (
          <li key={role.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1 size-[11px] rounded-full border-2 border-pearl bg-champagne-gold"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg leading-snug text-espresso">{role.title}</h3>
              <span className="label-tech shrink-0">{role.dates}</span>
            </div>
            <p className="mt-0.5 text-sm text-espresso/70">
              {role.org} · {role.location}
              {role.current && (
                <span className="ml-2 inline-flex items-center gap-1.5 text-raspberry">
                  <span className="size-1.5 animate-pulse rounded-full bg-raspberry" /> current
                </span>
              )}
            </p>

            <ul className="mt-3 flex flex-col gap-1.5">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[13.5px] leading-relaxed text-espresso/80">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-raspberry/50" />
                  {b}
                </li>
              ))}
            </ul>

            {role.seeProject && (
              <Link
                href="/work"
                data-cursor="GO"
                className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-cherry hover:text-raspberry"
              >
                → see {role.seeProject} in The Archive
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
