"use client";

import AboutContent from "@/components/panels/AboutContent";
import ContactContent from "@/components/panels/ContactContent";
import LabContent from "@/components/panels/LabContent";
import ResumeContent from "@/components/panels/ResumeContent";
import WorkContent from "@/components/panels/WorkContent";
import SiteFooter from "@/components/sections/SiteFooter";

const SECTIONS = [
  { id: "work", label: "01 / WORK", title: "The Work", Content: WorkContent },
  { id: "about", label: "02 / ABOUT", title: "About", Content: AboutContent },
  { id: "lab", label: "03 / LAB", title: "Notes From the Margins", Content: LabContent },
  { id: "resume", label: "04 / RESUME", title: "Résumé", Content: ResumeContent },
  { id: "contact", label: "05 / CONTACT", title: "Contact", Content: ContactContent },
] as const;

/**
 * The brief is explicit: don't shrink the desktop 3D scene onto mobile,
 * build a mobile-native composition instead. Same real content (same
 * panel components desktop uses inside the overlay), typography-first,
 * no canvas at all.
 */
export default function MobileHome() {
  return (
    <>
      <main className="min-h-screen bg-buttercream px-5 pb-16 pt-28">
        <p className="script-note text-3xl">Yomna Alshemy</p>
        <h1 className="display-lg mt-2 text-espresso">
          Live systems, <span className="italic-phrase text-cherry">on a real desk.</span>
        </h1>
        <p className="mt-4 text-sm text-espresso/70">
          Software · systems · infrastructure · curiosity. The full interactive desk lives on desktop —
          here&rsquo;s everything on it, in order.
        </p>

        <div className="mt-14 flex flex-col gap-16">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <p className="label-tech mb-2">{s.label}</p>
              <h2 className="display-lg mb-6 text-espresso">{s.title}</h2>
              <s.Content />
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
