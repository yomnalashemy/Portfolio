import type { Metadata } from "next";

import ExperienceContent from "@/components/panels/ExperienceContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Experience — Yomna Alshemy",
  description: "Not a résumé line. A real timeline.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageShell
        eyebrow="03 / THE TIMELINE"
        title={<>Not a résumé line. <span className="italic-phrase text-lavender">A real timeline.</span></>}
        accent="lavender"
      >
        <ExperienceContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
