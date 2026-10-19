"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Real route changes now (About, Experience, etc. are their own
 * pages), not just scroll position — AnimatePresence keyed on the
 * pathname gives each navigation an actual transition instead of a
 * hard cut, which is most of what makes separate pages feel like one
 * continuous site instead of a pile of disconnected documents.
 * MotionConfig (set in layout) already makes this respect
 * prefers-reduced-motion automatically.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    // opacity only, deliberately — the homepage's desk canvas uses
    // `position: fixed`, and any transform on an ancestor (a y/x
    // offset, a scale) redefines the containing block for fixed-
    // position descendants per the CSS spec, which would silently
    // break the canvas's full-viewport positioning the moment a page
    // transition touched it. Opacity has no such side effect.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
