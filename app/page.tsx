"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Systems from "@/components/Systems";
import StatusStrip from "@/components/StatusStrip";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (
    <main className="relative bg-console-bg flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-6xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <StatusStrip />
        <Systems />
        <Grid />
        <Experience />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
