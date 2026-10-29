// Everything here is checked against public/resume.pdf. If a fact isn't in
// the résumé or in the project records, it doesn't belong on the site.

export const site = {
  name: "Yomna Alshemy",
  role: "Engineer & financial-crime investigator",
  description:
    "Yomna Alshemy is a Senior FinCrime Analyst at Ziina and a full-stack engineer who investigates fraud and compliance problems, then builds the software that makes them faster to solve.",
  email: "yomnaalshemy11@gmail.com",
  github: "https://github.com/yomnalashemy",
  resumePdf: "/resume.pdf",
  // Render exposes the service's public URL at build time; a custom domain
  // can be set explicitly with NEXT_PUBLIC_SITE_URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.RENDER_EXTERNAL_URL ??
    "http://localhost:3000",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
] as const;

export type Role = {
  title: string;
  org: string;
  location: string;
  dates: string;
  current?: boolean;
  bullets: string[];
  project?: string;
};

export const experience: Role[] = [
  {
    title: "Senior FinCrime Analyst — Automation & Investigations",
    org: "Ziina",
    location: "Dubai, UAE (remote)",
    dates: "Aug 2025 – Present",
    current: true,
    project: "sentinel",
    bullets: [
      "Own end-to-end investigations across fraud, KYB, sanctions/PEP, transaction monitoring, chargebacks, and Emirates NBD partner-bank RFIs; cleared all 233 assigned sanctions/PEP alerts and handled 749 Intercom cases (584 self-initiated).",
      "Detected and worked 5 organized fraud typologies end-to-end — including a card-fraud ring spanning 422 cards across 24 BINs — and independently traced a major coordinated card attack behind the company's worst fraud month, mapping 60+ accounts for ban via IBAN/P2P chains.",
      "Designed and built Sentinel, a self-initiated tool suite (police-report generation, Emirates NBD RFI handling, and a 35,000-character SQL search spanning 42 CTEs and 13 warehouse/staging tables) that cut case response time from 9 to 6.9 minutes despite handling more cases per email, and now runs the team's law-enforcement response process.",
      "Built three production Python automations for KYB remediation (dry-run safe, resumable, rate-limit-aware) that cut field-set failures from 303 to 1 and reduced the remediation queue from ~1,495 to ~1,167 cases.",
      "Own the chargeback defense process end-to-end — researched the full dispute lifecycle and the Visa CE3.0 compelling-evidence standard, authored a 5-network reason-code playbook and a 5-document SOP suite, and built 111+ representment cases by hand; piloted two self-submitted defenses (both reversed) and filed three formal Amex defense packets.",
      "Initiated and built a RAG-based chargeback-defense automation: an n8n-orchestrated, two-stage (retrieval/reasoning → generation) LLM pipeline that drafts representment packages from the Dispute Register for analyst review, architected to replace a third-party defense vendor.",
      "Personally dispositioned 512 KYB resubmission cases across four workstreams — the largest individual contribution on three of four — recovering accounts that had sat unresolved for months.",
      "Self-initiated an audit of ML-bypassing whitelist exemptions (10 accounts, 5,986 transactions, 70.73% average failure rate) and published a 90-day remediation plan; the tooling and write-ups were cited by leadership as reference material for the wider team.",
    ],
  },
  {
    title: "Research Assistant — AI-Powered Lupus Diagnosis Assistant",
    org: "Misr University for Science and Technology (MUST)",
    location: "Cairo, Egypt",
    dates: "Sept 2024 – June 2025",
    project: "lupira",
    bullets: [
      "Led development of a mobile app to assist in lupus diagnosis, applying an SVM model aligned with EULAR/ACR diagnostic criteria.",
      "Designed and implemented algorithms to assess lupus probability from patient-reported data, supporting timely screening in low-resource settings.",
      "Ran data preprocessing, feature engineering, and model validation, then integrated the model's output into a full-stack mobile app.",
    ],
  },
  {
    title: "IT & Compliance Support Intern",
    org: "MUST at SCEEP",
    location: "Cairo, Egypt",
    dates: "July 2022 – Feb 2025",
    bullets: [
      "Monitored student and staff activity across internal systems to catch unusual access patterns and reported anything suspicious to the IT team.",
      "Supported compliance reviews of internal digital platforms, contributing UI/UX audits and interface improvements for both functionality and security.",
      "Logged and followed up on access-related issues and system tickets, keeping internal case tracking up to date.",
    ],
  },
];

export const education = {
  school: "Misr University for Science and Technology (MUST)",
  degree: "B.Sc. Computer Science",
  location: "Cairo, Egypt",
  date: "June 2025",
  detail: "GPA 3.86 / 4.00 · ranked 12th in class",
  coursework:
    "Databases, Web Development, Software Engineering, Computer Networks, Object-Oriented Programming, Data Structures and Algorithms, Computer Security, Pattern Recognition",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "PHP", "Bash", "Dart / Flutter", "HTML", "CSS"],
  },
  {
    group: "Frameworks & data",
    items: [
      "Next.js",
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "TypeORM",
      "Redis",
      "Appwrite",
      "Scikit-learn",
      "Tailwind CSS",
    ],
  },
  {
    group: "Automation & tooling",
    items: ["n8n", "Twilio", "Git & GitHub", "Kali Linux", "Burp Suite", "Wireshark"],
  },
  {
    group: "Design",
    items: ["UI/UX design", "Design systems", "Accessibility (WCAG AA)"],
  },
  {
    group: "Investigation",
    items: [
      "Fraud investigation",
      "AML / KYB compliance",
      "Sanctions & PEP screening",
      "Chargeback disputes",
      "Transaction monitoring",
    ],
  },
  {
    group: "Spoken",
    items: ["Arabic (native)", "English (bilingual proficiency)"],
  },
];

export const certifications: { name: string; issuer: string; date: string; inProgress?: boolean }[] = [
  {
    name: "Certified Ethical Hacker — CEH Master (312-50v13)",
    issuer: "EC-Council",
    date: "Targeting Dec 2026",
    inProgress: true,
  },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Mar 2025" },
  { name: "MongoDB Node.js Developer Path", issuer: "MongoDB University", date: "Feb 2025" },
  { name: "JavaScript Essentials 2", issuer: "Cisco Networking Academy", date: "Feb 2025" },
  { name: "Advent of Cyber", issuer: "TryHackMe", date: "Dec 2024" },
  { name: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", date: "Dec 2024" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Nov 2024" },
];
