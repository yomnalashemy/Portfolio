"use client";

import AboutContent from "./AboutContent";
import ContactContent from "./ContactContent";
import LabContent from "./LabContent";
import Panel from "./Panel";
import { usePanels } from "./PanelContext";
import ResumeContent from "./ResumeContent";
import WorkContent from "./WorkContent";

const CONFIG = {
  work: { label: "01 / ARCHIVE", title: "The Work", Content: WorkContent },
  about: { label: "02 / NOTEBOOK", title: "About", Content: AboutContent },
  lab: { label: "03 / THE LAB", title: "Notes From the Margins", Content: LabContent },
  resume: { label: "04 / DOCUMENT", title: "Résumé", Content: ResumeContent },
  contact: { label: "05 / ENVELOPE", title: "Contact", Content: ContactContent },
} as const;

export default function PanelHost() {
  const { active, close } = usePanels();

  return (
    <>
      {(Object.keys(CONFIG) as (keyof typeof CONFIG)[]).map((id) => {
        const { label, title, Content } = CONFIG[id];
        return (
          <Panel key={id} open={active === id} onClose={close} label={label} title={title}>
            <Content />
          </Panel>
        );
      })}
    </>
  );
}
