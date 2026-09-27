"use client";

import * as React from "react";

export type PanelId = "work" | "about" | "lab" | "resume" | "contact" | null;

interface Ctx {
  active: PanelId;
  open: (id: PanelId) => void;
  close: () => void;
}

const PanelContext = React.createContext<Ctx | null>(null);

/** Shared open/close state so the Nav, the desk objects, and the mobile
 * layout all drive the exact same six panels — one source of truth. */
export function PanelProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState<PanelId>(null);
  const value = React.useMemo<Ctx>(
    () => ({ active, open: setActive, close: () => setActive(null) }),
    [active]
  );
  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanels() {
  const ctx = React.useContext(PanelContext);
  if (!ctx) throw new Error("usePanels must be used within PanelProvider");
  return ctx;
}
