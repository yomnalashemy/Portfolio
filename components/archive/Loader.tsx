"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export default function Loader() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-buttercream"
        >
          <p className="script-note text-2xl">setting the desk...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
