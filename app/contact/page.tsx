import { ArrowUpRight, Mail } from "lucide-react";

import CopyEmail from "@/components/CopyEmail";
import PageIntro from "@/components/PageIntro";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Email Yomna Alshemy about a technical problem, an opportunity, or a collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact"
        title={
          <>
            Tell me about the problem. <span className="font-italic italic text-raspberry-deep">Let&rsquo;s look at it together.</span>
          </>
        }
      >
        <p>
          A role, a collaboration, or a system that isn&rsquo;t behaving — email is the fastest way to reach me.
          I&rsquo;m based in Cairo and work remotely with a team in Dubai.
        </p>
      </PageIntro>

      <section aria-label="Ways to reach me" className="shell pb-24">
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-ink bg-ink lg:grid-cols-[1.5fr_1fr]">
          <div className="bg-lime p-8 md:p-12">
            <p className="label">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block break-all font-display text-[clamp(1.6rem,3.6vw,2.8rem)] leading-tight underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="btn-primary">
                <Mail className="size-4" aria-hidden /> Write an email
              </a>
              <CopyEmail email={site.email} />
            </div>
          </div>
          <ul className="flex flex-col bg-paper">
            <li className="flex-1 border-b border-rule">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[120px] items-center justify-between gap-4 p-8"
              >
                <span>
                  <span className="label block text-mauve">Code</span>
                  <span className="mt-1 block font-display text-2xl">GitHub</span>
                </span>
                <ArrowUpRight className="size-6 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="flex-1">
              <a
                href={site.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[120px] items-center justify-between gap-4 p-8"
              >
                <span>
                  <span className="label block text-mauve">Résumé</span>
                  <span className="mt-1 block font-display text-2xl">PDF</span>
                </span>
                <ArrowUpRight className="size-6 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
