# Yomna Alshemy — portfolio

Next.js 14 (App Router), TypeScript, Tailwind CSS. Art direction: *Editorial Signal Studio*.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks and lints)
```

## Where things live

| Path | What it is |
| --- | --- |
| `data/projects.ts` | Every project, its status, and its case-study content |
| `data/site.ts` | Profile, experience, education, skills, certifications |
| `app/globals.css` | Design tokens (colors, type scale) with contrast notes |
| `app/` | Routes: `/`, `/work`, `/work/[slug]`, `/about`, `/resume`, `/contact` |
| `components/` | Header, footer, hero figure, project visuals, shared pieces |
| `public/work/` | Real screenshots of deployed projects |

## Content rules

- Every figure must be traceable to `public/resume.pdf` or the project's own records.
- A project's `status` must match reality: `in-use`, `production-internal`,
  `deployed`, `prototype`, or `study`. Case-study sections only render when
  their content exists — leave a field out rather than pad it.
- Diagrams in `components/ProjectVisual.tsx` explain how a system works; they
  are not product screenshots and are labelled where that could be unclear.

## Deployment

**Vercel (recommended):** import the GitHub repo at vercel.com/new — the
framework is detected as Next.js and no settings are needed. Canonical URLs
and the sitemap use `VERCEL_PROJECT_PRODUCTION_URL` automatically.

**Render:** `render.yaml` deploys as a Node web service and uses `RENDER_EXTERNAL_URL`.

On either host, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) once a
custom domain is attached.
