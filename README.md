# Yomna Alshemy — Live Systems

An interactive, editorial-style portfolio for my software engineering work. The visual direction pairs a warm paper-and-cherry palette, expressive typography, and a scroll-driven 3D desk with straightforward project case studies and working demos.

**Live site:** https://portfolio-veug.onrender.com

## What's inside

- **Interactive home experience** — a Three.js / React Three Fiber desk scene with scroll-driven camera movement on desktop, plus a purpose-built mobile composition.
- **Project archive** — data-driven case studies, technology stacks, decision notes, trade-offs, and outcomes.
- **Project demos** — standalone HTML demos served from `public/demos`.
- **Separate pages** — About, Experience, Workbench, Lab, Résumé, and Contact.
- **Motion with a fallback** — Framer Motion transitions and reduced-motion handling.
- **Responsive navigation** — desktop navigation and an accessible mobile menu.

## Tech stack

- Next.js 14 App Router and React 18
- TypeScript
- Tailwind CSS
- Three.js and React Three Fiber / Drei
- Framer Motion and GSAP
- Render for deployment

## Run locally

Use Node.js 20 or newer.

```bash
git clone https://github.com/yomnalashemy/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run these before submitting changes:

```bash
npm run lint
npm run typecheck
npm run build
```

The build uses `next/font` to fetch and optimize the selected Google Fonts, so a network connection is needed during the production build.

## Project structure

```
app/                  App Router pages and global styles
components/archive/   Navigation, loader, cursor, page transitions
components/desk/      Interactive 3D desk scene and objects
components/mobile/    Mobile-first homepage
components/panels/    Page content and project case studies
components/sections/  Shared page shell and footer
components/mockups/   Reusable device frames for project previews
data/index.ts         Project content and case-study data
public/demos/         Standalone project demonstrations
public/               Images, icons, and résumé PDF
render.yaml           Render web-service configuration
```

## Content updates

- Update project descriptions, stacks, links, and case studies in `data/index.ts`.
- Add static assets to `public/` and reference them with root-relative paths such as `/Carepulse.png`.
- Place standalone demos under `public/demos/<project>/`.
- Keep claims measurable and verifiable; distinguish shipped features from prototypes and research work.

## Deployment

The repository includes a `render.yaml` web-service definition. Render should build with `npm install && npm run build` and start with `npm start -- -p $PORT`. When the Render service is connected to this repository, pushes to its configured deployment branch can trigger a new deployment.

Always review the build and the deployed site after merging changes. A successful Git push alone does not prove the live deployment is healthy.
