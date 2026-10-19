import type { Metadata } from "next";

import LabContent from "@/components/panels/LabContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "The Lab — Yomna Alshemy",
  description: "Notes from the margins.",
};

export default function LabPage() {
  return (
    <>
      <PageShell
        eyebrow="05 / THE LAB"
        title={<>Notes from the <span className="italic-phrase text-hot-fuchsia">margins.</span></>}
        accent="hot-fuchsia"
      >
        <LabContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
