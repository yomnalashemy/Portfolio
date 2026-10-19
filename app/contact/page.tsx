import type { Metadata } from "next";

import ContactContent from "@/components/panels/ContactContent";
import PageShell from "@/components/sections/PageShell";
import SiteFooter from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Yomna Alshemy",
  description: "Let's talk.",
};

export default function ContactPage() {
  return (
    <>
      <PageShell
        eyebrow="07 / THE ENVELOPE"
        title={<>Let&rsquo;s <span className="italic-phrase text-bubblegum">talk.</span></>}
        accent="bubblegum"
      >
        <ContactContent />
      </PageShell>
      <SiteFooter />
    </>
  );
}
