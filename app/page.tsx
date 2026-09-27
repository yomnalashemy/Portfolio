"use client";

import About from "@/components/archive/About";
import ArchiveFooter from "@/components/archive/ArchiveFooter";
import Contact from "@/components/archive/Contact";
import CustomCursor from "@/components/archive/CustomCursor";
import Hero from "@/components/archive/Hero";
import Introduction from "@/components/archive/Introduction";
import Lab from "@/components/archive/Lab";
import Loader from "@/components/archive/Loader";
import Nav from "@/components/archive/Nav";
import Projects from "@/components/archive/Projects";
import ScrollProgress from "@/components/archive/ScrollProgress";
import Skills from "@/components/archive/Skills";
import Timeline from "@/components/archive/Timeline";

const Home = () => {
  return (
    <main className="relative bg-obsidian">
      <div className="grain" />
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Nav />
      <Hero />
      <Introduction />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Lab />
      <Contact />
      <ArchiveFooter />
    </main>
  );
};

export default Home;
