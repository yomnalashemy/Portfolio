"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  title: string;
  children: React.ReactNode;
}

/**
 * The one overlay used for every "opened object" on the desk — the folder,
 * the notebook, the resume, the envelope. Real, focus-trapped, closable by
 * Escape or backdrop click, so every panel is reachable without ever
 * touching the 3D canvas (Nav opens the same panels).
 */
export default function Panel({ open, onClose, label, title, children }: Props) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-espresso/55 px-4 py-10 backdrop-blur-sm md:items-center md:py-16"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-cherry/15 bg-pearl shadow-[0_30px_80px_-30px_rgba(50,27,36,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-cherry/10 px-7 py-5">
              <p className="label-tech">{label}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-cursor="CLOSE"
                className="grid size-8 place-items-center rounded-full text-raspberry transition-colors hover:bg-powder-pink"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto px-7 py-8">
              <h2 className="display-lg mb-6 text-espresso">{title}</h2>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
