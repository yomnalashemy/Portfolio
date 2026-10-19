import type { Metadata } from "next";

import AboutContent from "@/components/panels/AboutContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "About — Yomna Alshemy",
  description: "Not a bio. A working notebook.",
};

export default function AboutPage() {
  return (
    <>
      <PageShell
        eyebrow="02 / THE NOTEBOOK"
        title={<>Not a bio. <span className="italic-phrase text-raspberry">A working notebook.</span></>}
        accent="raspberry"
      >
        <AboutContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
