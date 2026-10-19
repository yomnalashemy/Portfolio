import type { Metadata } from "next";

import WorkContent from "@/components/panels/WorkContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "The Archive — Yomna Alshemy",
  description: "Six systems, all still running. Not screenshots — the real thing, live.",
};

export default function WorkPage() {
  return (
    <>
      <PageShell
        eyebrow="01 / THE ARCHIVE"
        title={<>Six systems. <span className="italic-phrase text-cherry">All of them running.</span></>}
        accent="cherry"
      >
        <WorkContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
