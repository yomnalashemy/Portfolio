import type { Metadata } from "next";

import SkillsWorkbench from "@/components/panels/SkillsWorkbench";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "The Workbench — Yomna Alshemy",
  description: "Not a percentage bar. A real workbench.",
};

export default function WorkbenchPage() {
  return (
    <>
      <PageShell
        eyebrow="04 / THE WORKBENCH"
        title={<>Not a percentage bar. <span className="italic-phrase text-baby-blue">A real workbench.</span></>}
        accent="baby-blue"
      >
        <SkillsWorkbench />
      </PageShell>
      <SiteFooter />
    </>
  );
}
