import Link from "next/link";

import { nav, site } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="on-ink bg-gradient-to-br from-ink via-ink to-plum text-paper">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mauve-light">
            Investigating complex systems, then building the tools that make them clearer.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label text-mauve-light">Pages</p>
          <ul className="mt-4 grid gap-2">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/90 underline-offset-4 hover:text-lime hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-mauve-light">Elsewhere</p>
          <ul className="mt-4 grid gap-2">
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-paper/90 underline-offset-4 hover:text-lime hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.github} className="text-paper/90 underline-offset-4 hover:text-lime hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.resumePdf} className="text-paper/90 underline-offset-4 hover:text-lime hover:underline">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-mauve-light sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Set in DM Serif Display, Manrope and IBM Plex Mono. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
