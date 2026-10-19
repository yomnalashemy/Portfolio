import type { Metadata } from "next";

import ResumeContent from "@/components/panels/ResumeContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Résumé — Yomna Alshemy",
  description: "The résumé. Scented, allegedly.",
};

export default function ResumePage() {
  return (
    <>
      <PageShell
        eyebrow="06 / THE DOCUMENT"
        title={<>The résumé. <span className="italic-phrase text-pistachio">Scented, allegedly.</span></>}
        accent="pistachio"
      >
        <ResumeContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
