export type Project = (typeof projects)[number];

export const projects = [
  {
    id: 1,
    slug: "itqan",
    tag: "ITQAN",
    color: "#dcc68f",
    title: "ITQAN – Full-Stack Cambridge IGCSE Revision Platform",
    des: "~61K lines of TypeScript, 147 API routes, 1,025 automated tests, serving students, tutors, and parents with assignments, marking, and progress tracking — used across the UAE and Egypt.",
    img: "/itqan.svg",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis"],
    link: "https://itqan-web-dy2r.onrender.com/welcome",
    demo: "/demos/itqan/index.html",
    repo: "https://github.com/yomnalashemy/ITQAN_TECH",
    caseStudy: {
      problem:
        "Cambridge IGCSE students, tutors, and parents needed one real system for assignments, marking, and progress tracking — not a patchwork of spreadsheets and PDFs passed around by email.",
      role: "Full-stack, end to end — product, backend, frontend, and the verification tooling that caught defects before they shipped.",
      decisions: [
        "A from-scratch cipher-decoding pipeline to recover text from PDFs with corrupted font maps — known-plaintext cribs, a syllabus-trained trigram model, coordinate-ascent solving — reaching 98.1% character accuracy and 100% question-anchoring across 20 real exam papers, with zero external services.",
        "Privacy-preserving analytics for a product used by minors: daily-rotating salted visitor hashes, server-verified attribution, no IP address ever stored.",
        "Rebuilt the design system from a gradient-heavy theme to a token-driven neutral UI — semantic color tokens, a single accent, a theme-adaptive SVG favicon — with automated WCAG AA contrast checks across every page and theme that caught unstyled buttons before launch.",
      ],
      tradeoffs: [
        "Building the cipher pipeline in-house instead of calling an OCR/LLM API meant more time writing the solver myself — but no per-call cost, no vendor dependency, and every step of it is auditable.",
      ],
      outcome:
        "~61K lines of TypeScript, 147 API routes, 1,025 automated tests, 11 custom audit scripts — used across the UAE and Egypt.",
    },
  },
  {
    id: 2,
    slug: "curacare",
    tag: "CuraCare",
    color: "#3fbf93",
    title: "CuraCare – Full-Stack Healthcare Platform",
    des: "Secure platform with structured data models for patient intake, appointment flow, and medical records — admin/provider dashboards with SQL-based access controls and audit trails.",
    img: "/Carepulse.png",
    stack: ["Next.js", "Twilio", "TypeScript", "TailwindCSS"],
    link: "https://mini-carepulse.onrender.com",
    demo: "/demos/curacare/index.html",
    repo: "https://github.com/yomnalashemy/mini-carepulse",
    caseStudy: {
      problem:
        "A focused healthcare intake system — patient intake, appointment flow, and medical records — scoped deliberately rather than attempting a full EHR.",
      role: "Full-stack.",
      decisions: [
        "Admin/provider dashboards with SQL-based access controls and audit trails to support performance monitoring.",
      ],
      tradeoffs: [
        "Scoped as a mini version (it's deployed as mini-carepulse) — depth over breadth: a handful of flows done with real access control and auditing, not a sprawling feature set.",
      ],
      outcome: "Live, with structured data models and audit trails in place.",
    },
  },
  {
    id: 3,
    slug: "lupira",
    tag: "Lupira",
    color: "#e2749a",
    title: "Lupira – Full-Stack AI-Powered Lupus Detection App",
    des: "SVM models for early lupus risk prediction — custom datasets, clinical-input mapping to diagnostic probabilities, and visualized output guiding patient self-assessments.",
    img: "/Lupira.png",
    stack: ["Flutter", "Python", "Scikit-learn"],
    link: "https://lupira-mulo.onrender.com",
    demo: "/demos/lupira/index.html",
    repo: "https://github.com/yomnalashemy/Lupira",
    caseStudy: {
      problem:
        "Lupus is notoriously hard to catch early. The project applies an SVM model aligned with EULAR/ACR diagnostic criteria to flag risk from patient-reported data, aimed at low-resource settings where specialist screening isn't always accessible.",
      role: "Research Assistant, MUST — led development of the mobile app and the diagnostic pipeline behind it.",
      decisions: [
        "Data preprocessing, feature engineering, and model validation built around EULAR/ACR clinical criteria rather than an ad-hoc feature set.",
        "Output framed as probability guidance for self-assessment and follow-up, not a standalone diagnosis.",
      ],
      tradeoffs: [
        "Deliberately built as a screening and self-assessment aid, not a diagnostic authority — the model guides someone toward a real clinical follow-up rather than replacing one.",
      ],
      outcome: "A full-stack mobile app integrating the AI output for practical use in healthcare settings.",
    },
  },
  {
    id: 4,
    slug: "horizon-banking",
    tag: "Horizon Banking",
    color: "#e08a42",
    title: "Horizon Banking – Full-Stack Financial Management Platform",
    des: "Responsive fintech app with secure auth, cross-account transfers, and data-driven spending analysis — SQL-based reporting for user-level insights and budgeting.",
    img: "/horizon.png",
    stack: ["Next.js", "Appwrite", "Sentry"],
    link: "https://mini-banking.onrender.com",
    demo: "/demos/banking/index.html",
    repo: "https://github.com/yomnalashemy/mini-banking",
    caseStudy: {
      problem: "A fintech dashboard needed secure auth, cross-account transfers, and spending analysis a user could actually trust.",
      role: "Full-stack.",
      decisions: [
        "SQL-based reporting and budgeting logic built on anonymized transaction data, rather than wiring analytics directly to identifiable records.",
        "Sentry wired in for error monitoring from the start, not bolted on after launch.",
      ],
      tradeoffs: [
        "Anonymizing the transaction data before it reaches the analytics layer costs some query convenience, but means the insights layer never has a reason to touch anything identifiable.",
      ],
      outcome: "Live, with cross-account transfers and user-level budgeting insights.",
    },
  },
  {
    id: 5,
    slug: "sushimania",
    tag: "SushiMania",
    color: "#e0605a",
    title: "SushiMania – Sushi Ordering Website",
    des: "A user-friendly sushi restaurant website built with HTML, CSS, and JavaScript, focused on responsive UI, an interactive cart, and clear UX.",
    img: "/sushi.png",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://sushi-zj20.onrender.com",
    demo: "https://sushi-zj20.onrender.com",
    repo: "https://github.com/yomnalashemy/Sushi",
    caseStudy: {
      problem:
        "A restaurant ordering flow — menu browsing, an interactive cart, checkout — built to get the front-end fundamentals exactly right without a backend to lean on.",
      role: "Front-end, solo.",
      decisions: [
        "No framework — cart state, quantity updates, and the running total are hand-rolled DOM/JavaScript, not abstracted behind a library.",
      ],
      tradeoffs: ["No framework overhead, but every interaction had to be wired by hand — a deliberate constraint, not a shortcut."],
      outcome: "A responsive, interactive ordering UI, live.",
    },
  },
  {
    id: 6,
    slug: "sentinel",
    tag: "Sentinel",
    color: "#d97a5f",
    title: "Sentinel – Raw Data to Branded PDF Engine (mini demo)",
    des: "A generic miniature of an internal tool suite built at Ziina: the same raw data, rendered live into a real PDF through three completely different brand templates — the engine, not any specific report.",
    img: "/sentinel.svg",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    link: "https://unified-sentinel.vercel.app",
    demo: "https://unified-sentinel.vercel.app",
    repo: "https://github.com/yomnalashemy/mini-sentinel",
    caseStudy: {
      problem:
        "The real Sentinel runs inside Ziina: police-report generation, Emirates NBD RFI handling, and a 35,000-character SQL search spanning 42 CTEs and 13 warehouse/staging tables. This demo is a generic miniature of that engine — the same raw-data-to-branded-PDF pattern, not any specific report or real case data.",
      role: "Designed and built the original tool suite end to end at Ziina; this demo rebuilds the rendering engine in isolation.",
      decisions: [
        "One engine, three completely different brand templates rendered from the same raw data — proving the templating layer is actually decoupled from the data, not hard-coded per report.",
      ],
      tradeoffs: [
        "The real tool's SQL search and case-management integration aren't in this demo — only the render engine is, since the rest depends on Ziina's internal systems and can't be shown publicly.",
      ],
      outcome:
        "At Ziina, the real version cut case response time from 9 to 6.9 minutes and now runs the team's law-enforcement response process.",
    },
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/yomnalashemy",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "",
  },
];
