// Project records. Evidence policy: every metric below appears in
// public/resume.pdf or the project's own records; anything not documented
// (team size, dates, user counts) is left out rather than estimated.

export type Kind = "product" | "automation" | "applied-ml" | "front-end";

export const KINDS: Record<Kind, string> = {
  product: "Product engineering",
  automation: "Investigation & automation",
  "applied-ml": "Applied ML",
  "front-end": "Front-end",
};

/**
 * How far a project actually got. The label is always shown as text so
 * status never depends on color alone.
 */
export type Status = "in-use" | "production-internal" | "deployed" | "prototype" | "study";

export const STATUS_LABEL: Record<Status, string> = {
  "in-use": "Shipped · in use",
  "production-internal": "Internal production tool",
  deployed: "Deployed · scoped build",
  prototype: "Research prototype",
  study: "Front-end study",
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  kind: Kind;
  status: Status;
  /** extra nuance about status that the label alone can't carry */
  statusNote?: string;
  featured?: boolean;
  /** one accent per project, used only on large surfaces and graphics */
  surface: "rose" | "sage" | "lime" | "paper";
  summary: string;
  stack: string[];
  links: { live?: { href: string; label: string }; repo?: string };
  image?: { src: string; alt: string; width: number; height: number; tall?: boolean };
  caseStudy: {
    problem: string;
    users?: string;
    constraints?: string[];
    role: string;
    architecture?: string[];
    implementation: string[];
    tradeoffs: string[];
    validation?: string[];
    results: string[];
    unfinished?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "itqan",
    name: "ITQAN",
    tagline: "A full-stack Cambridge IGCSE revision platform",
    kind: "product",
    status: "in-use",
    statusNote: "Used by students, tutors, and parents across the UAE and Egypt.",
    featured: true,
    surface: "sage",
    summary:
      "Three role-based portals — students, tutors, parents — for assignments, marking, and progress tracking, replacing spreadsheets and PDFs passed around by email.",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis"],
    links: {
      live: { href: "https://itqan-web-dy2r.onrender.com/welcome", label: "Open ITQAN" },
      repo: "https://github.com/yomnalashemy/ITQAN_TECH",
    },
    caseStudy: {
      problem:
        "Cambridge IGCSE students, tutors, and parents were coordinating assignments, marking, and progress through a patchwork of spreadsheets and emailed PDFs. Past exam papers — the core revision material — often came as PDFs with corrupted font maps, so their text couldn't be extracted reliably.",
      users: "Students preparing for IGCSE exams, the tutors who set and mark their work, and parents following progress.",
      constraints: [
        "The product is used by minors, so analytics could not store anything that identifies a visitor.",
        "Exam text had to be recovered from broken PDFs without sending papers to an external OCR or LLM service.",
        "Three audiences with different permissions had to share one data model.",
      ],
      role: "Sole full-stack engineer, end to end: product, backend, frontend, and the verification tooling around them.",
      architecture: [
        "Next.js frontend serving three role-based portals over a NestJS API with 147 routes.",
        "PostgreSQL as the system of record; Redis alongside it.",
        "A token-driven design system — semantic color tokens, a single accent, a theme-adaptive SVG favicon.",
      ],
      implementation: [
        "A from-scratch cipher-decoding pipeline for PDFs with corrupted font maps: known-plaintext cribs, a syllabus-trained trigram model, and coordinate-ascent solving.",
        "Privacy-preserving analytics: daily-rotating salted visitor hashes and server-verified attribution, with no IP address ever stored.",
        "A rebuild from a gradient-heavy theme to a neutral, token-driven UI.",
      ],
      tradeoffs: [
        "Writing the decoding solver in-house took longer than calling an OCR or LLM API, but it has no per-call cost, no vendor dependency, and every step is auditable.",
        "Daily-rotating hashes make long-term visitor journeys impossible to reconstruct — deliberately, because the audience is children.",
      ],
      validation: [
        "1,025 automated tests across the codebase.",
        "11 custom audit scripts — contrast, dead code, and contract/DDL consistency — plus mutation-tested fixes.",
        "Automated WCAG AA contrast checks across every page and theme, which caught unstyled buttons before launch.",
      ],
      results: [
        "98.1% character accuracy and 100% question-anchoring across 20 real exam papers, with zero external services.",
        "~61K lines of TypeScript, 147 API routes, 1,025 tests — shipped and used across the UAE and Egypt.",
      ],
    },
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    tagline: "Raw case data to branded, law-enforcement-ready documents",
    kind: "automation",
    status: "production-internal",
    statusNote:
      "The real tool runs inside Ziina and can't be shown. The public link is a miniature that rebuilds only its rendering engine with generic data.",
    featured: true,
    surface: "rose",
    summary:
      "A self-initiated tool suite for Ziina's financial-crime team: police-report generation, partner-bank RFI handling, and a deep SQL case search — now the team's law-enforcement response process.",
    stack: ["Next.js", "TypeScript", "SQL", "Tailwind CSS"],
    links: {
      live: { href: "https://unified-sentinel.vercel.app", label: "Open the public miniature" },
      repo: "https://github.com/yomnalashemy/mini-sentinel",
    },
    caseStudy: {
      problem:
        "Responding to law-enforcement and partner-bank requests meant assembling case evidence by hand from many warehouse tables, then formatting it into documents. Each response was slow, and the format varied by whoever wrote it.",
      users: "Financial-crime analysts at Ziina responding to police reports and Emirates NBD RFIs.",
      constraints: [
        "Case data is sensitive and internal — nothing real can leave the company, including into a public demo.",
        "Different recipients need different document formats from the same underlying facts.",
      ],
      role: "Identified the problem, then designed and built the tool suite end to end at Ziina, on my own initiative. The public demo is a separate rebuild of the rendering engine only.",
      architecture: [
        "A 35,000-character SQL search spanning 42 CTEs and 13 warehouse/staging tables that gathers a case's evidence in one pass.",
        "A rendering engine that turns the same raw data into differently branded documents through interchangeable templates.",
        "Workflows for police-report generation and Emirates NBD RFI handling built on top.",
      ],
      implementation: [
        "Templates are fully decoupled from data: the public miniature renders one dataset through three completely different brand templates to prove it.",
      ],
      tradeoffs: [
        "The public miniature leaves out the SQL search and case-management integration, because they depend on Ziina's internal systems. It demonstrates the pattern, not the production tool.",
      ],
      results: [
        "Case response time fell from 9 to 6.9 minutes, despite handling more cases per email.",
        "Sentinel now runs the team's law-enforcement response process.",
      ],
      unfinished: ["The public demo covers the rendering engine only; the investigation side can't be shown publicly."],
    },
  },
  {
    slug: "lupira",
    name: "Lupira",
    tagline: "Early lupus-risk screening on a phone",
    kind: "applied-ml",
    status: "prototype",
    statusNote: "Built as university research. The AI service behind the diagnosis flow is being rebuilt and redeployed.",
    featured: true,
    surface: "lime",
    summary:
      "A Flutter app that applies an SVM model aligned with EULAR/ACR criteria to patient-reported data, giving probability guidance toward clinical follow-up — not a diagnosis.",
    stack: ["Flutter", "Python", "Scikit-learn"],
    links: {
      live: { href: "https://lupira-mulo.onrender.com", label: "Open Lupira" },
      repo: "https://github.com/yomnalashemy/Lupira",
    },
    image: {
      src: "/work/lupira.png",
      alt: "Lupira's home screen on Android: a Quick Detection card with a Start Now button, and Learn More links to lupus articles.",
      width: 536,
      height: 1134,
      tall: true,
    },
    caseStudy: {
      problem:
        "Lupus is notoriously hard to catch early, and specialist screening isn't always accessible in low-resource settings. The project asks whether patient-reported data, mapped to established clinical criteria, can flag risk early enough to prompt a real follow-up.",
      users: "People who may have lupus symptoms but limited access to a specialist, and the clinicians they are referred to.",
      constraints: [
        "The output must guide toward a clinician, never replace one.",
        "Features had to map to recognised diagnostic criteria rather than an ad-hoc feature set.",
      ],
      role: "Research Assistant at MUST — led development of the mobile app and the diagnostic pipeline behind it.",
      architecture: [
        "A Flutter mobile app collecting patient-reported inputs.",
        "A Python / scikit-learn SVM model trained on custom datasets, with features aligned to EULAR/ACR criteria.",
      ],
      implementation: [
        "Data preprocessing, feature engineering, and mapping clinical inputs to diagnostic probabilities.",
        "Visualised output that frames the result as guidance for self-assessment and clinical follow-up.",
      ],
      tradeoffs: [
        "Deliberately scoped as a screening and self-assessment aid, not a diagnostic authority. That limits what the app can claim, and it is the honest framing for the evidence available.",
      ],
      validation: ["Model validation was part of the research pipeline, run alongside preprocessing and feature engineering."],
      results: ["A working full-stack mobile app integrating the model's output, built as part of university research."],
      unfinished: ["The AI service behind the real diagnosis flow is being rebuilt and properly deployed."],
    },
  },
  {
    slug: "curacare",
    name: "CuraCare",
    tagline: "Healthcare intake with access control built in",
    kind: "product",
    status: "deployed",
    surface: "paper",
    summary:
      "Patient intake, appointment flow, and medical records, with admin and provider dashboards backed by SQL-based access controls and audit trails.",
    stack: ["Next.js", "TypeScript", "Twilio", "Tailwind CSS"],
    links: {
      live: { href: "https://mini-carepulse.onrender.com", label: "Open CuraCare" },
      repo: "https://github.com/yomnalashemy/mini-carepulse",
    },
    image: {
      src: "/work/curacare.png",
      alt: "CuraCare's patient sign-up screen, asking for full name, email, and phone number next to a photo of clinicians.",
      width: 1866,
      height: 1522,
    },
    caseStudy: {
      problem:
        "A focused healthcare intake system — patient intake, appointment flow, and medical records — scoped deliberately rather than attempting a full electronic health record.",
      role: "Full-stack.",
      implementation: [
        "Structured data models for patients, appointments, and records.",
        "Admin and provider dashboards with SQL-based access controls and audit trails to support performance monitoring.",
        "Twilio for patient messaging.",
      ],
      tradeoffs: [
        "Depth over breadth: a handful of flows done with real access control and auditing, instead of a sprawling feature set.",
      ],
      results: ["Deployed, with structured data models and audit trails in place."],
    },
  },
  {
    slug: "horizon-banking",
    name: "Horizon Banking",
    tagline: "Personal finance with privacy at the analytics layer",
    kind: "product",
    status: "deployed",
    surface: "paper",
    summary:
      "A responsive fintech app with secure auth, cross-account transfers, and spending analysis built on anonymised transaction data.",
    stack: ["Next.js", "Appwrite", "Sentry"],
    links: {
      live: { href: "https://mini-banking.onrender.com", label: "Open Horizon Banking" },
      repo: "https://github.com/yomnalashemy/mini-banking",
    },
    image: {
      src: "/work/horizon-banking.png",
      alt: "Horizon Banking's landing page: a headline, a Get Started button, and feature tiles for security, analytics, and multiple accounts.",
      width: 2022,
      height: 1518,
    },
    caseStudy: {
      problem: "A personal-finance dashboard that needed secure auth, cross-account transfers, and spending analysis a user could actually trust.",
      role: "Full-stack.",
      implementation: [
        "SQL queries and reporting logic producing user-level insights and budgeting recommendations.",
        "Sentry wired in for error monitoring from the start, not added after launch.",
      ],
      tradeoffs: [
        "Transaction data is anonymised before it reaches the analytics layer. That costs some query convenience, but the insights code never has a reason to touch anything identifiable.",
      ],
      results: ["Deployed, with cross-account transfers and user-level budgeting insights."],
    },
  },
  {
    slug: "sushimania",
    name: "SushiMania",
    tagline: "An ordering flow with no framework to lean on",
    kind: "front-end",
    status: "study",
    surface: "paper",
    summary:
      "A restaurant ordering site — menu, interactive cart, checkout — written in plain HTML, CSS, and JavaScript to get the fundamentals exactly right.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: {
      live: { href: "https://sushi-zj20.onrender.com", label: "Open SushiMania" },
      repo: "https://github.com/yomnalashemy/Sushi",
    },
    image: {
      src: "/work/sushimania.png",
      alt: "SushiMania's landing page: an illustrated piece of nigiri held in chopsticks above the headline “Feel the taste of Japanese food”.",
      width: 2026,
      height: 1534,
    },
    caseStudy: {
      problem: "An ordering flow built without a framework or backend, to practise front-end fundamentals deliberately.",
      role: "Front-end, solo.",
      implementation: [
        "Cart state, quantity updates, and the running total are hand-written DOM and JavaScript rather than abstracted behind a library.",
      ],
      tradeoffs: ["No framework overhead, but every interaction had to be wired by hand — a deliberate constraint."],
      results: ["A responsive, interactive ordering UI, deployed."],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
