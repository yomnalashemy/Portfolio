"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <HeroScene />

      {/* Asymmetric: text sits left of center, the particle system reads
          through and past it rather than sitting flatly behind it. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="label-tech mb-6"
          >
            ARCHIVE / 001
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-xl text-bone"
          >
            BUILDING
            <br />
            SYSTEMS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="italic-phrase mt-4 text-2xl text-dusty-rose md:text-3xl"
          >
            with unreasonable curiosity.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="label-tech mt-8"
          >
            Software engineer · systems · infrastructure · curious things
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-tech">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-steel"
        />
      </motion.div>
    </section>
  );
}
