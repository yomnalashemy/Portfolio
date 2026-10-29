"use client";

import { ArrowDownRight, ArrowUpRight, ArrowUpRight as NorthEast, Github, MoveUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data";

const selected = [projects[0], projects[5], projects[2]];

function SignalMap() {
  return (
    <div className="signal-map" aria-label="A living map of the work: systems, product, and investigation connected by evidence" role="img">
      <div className="signal-map__top"><span>FIELD STUDY / 001</span><span>31° 57′ N — 35° 56′ E</span></div>
      <svg className="signal-map__svg" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="thread" x1="82" y1="120" x2="522" y2="478" gradientUnits="userSpaceOnUse"><stop stopColor="#F3C9DB"/><stop offset=".52" stopColor="#F05A85"/><stop offset="1" stopColor="#B7E36A"/></linearGradient>
          <radialGradient id="core"><stop stopColor="#FFF4B8"/><stop offset=".55" stopColor="#F2C3D5"/><stop offset="1" stopColor="#E74C7A" stopOpacity=".15"/></radialGradient>
        </defs>
        <circle cx="300" cy="300" r="236" stroke="currentColor" strokeOpacity=".12" strokeDasharray="2 9"/>
        <circle cx="300" cy="300" r="184" stroke="currentColor" strokeOpacity=".18"/>
        <circle cx="300" cy="300" r="126" stroke="currentColor" strokeOpacity=".12" strokeDasharray="5 8"/>
        <path d="M84 192 C180 82 256 132 300 300 S434 474 520 380" stroke="url(#thread)" strokeWidth="2"/>
        <path d="M108 440 C178 506 262 450 300 300 S404 108 494 154" stroke="url(#thread)" strokeWidth="1.5" strokeDasharray="4 7"/>
        <path d="M84 192 L494 154 M108 440 L520 380 M84 192 L108 440 M494 154 L520 380" stroke="currentColor" strokeOpacity=".18"/>
        <circle cx="300" cy="300" r="83" fill="url(#core)"/>
        <circle cx="300" cy="300" r="52" stroke="#F05A85" strokeOpacity=".7"/>
        <circle cx="300" cy="300" r="35" fill="#2A1528"/>
        <path d="M286 301 L297 312 L318 286" stroke="#D9F49B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <g className="signal-node signal-node--one"><circle cx="84" cy="192" r="18" fill="#F6E9E2"/><circle cx="84" cy="192" r="6" fill="#F05A85"/></g>
        <g className="signal-node signal-node--two"><circle cx="494" cy="154" r="21" fill="#D9F49B"/><circle cx="494" cy="154" r="6" fill="#2A1528"/></g>
        <g className="signal-node signal-node--three"><circle cx="108" cy="440" r="16" fill="#F2C3D5"/><circle cx="108" cy="440" r="5" fill="#2A1528"/></g>
        <g className="signal-node signal-node--four"><circle cx="520" cy="380" r="19" fill="#F05A85"/><circle cx="520" cy="380" r="5" fill="#F6E9E2"/></g>
        <path d="M300 48 V88 M300 512 V552 M48 300 H88 M512 300 H552" stroke="currentColor" strokeOpacity=".25"/>
      </svg>
      <div className="signal-label signal-label--a"><span className="signal-label__dot" /> SYSTEMS <small>01</small></div>
      <div className="signal-label signal-label--b"><span className="signal-label__dot" /> PRODUCT <small>02</small></div>
      <div className="signal-label signal-label--c"><span className="signal-label__dot" /> EVIDENCE <small>03</small></div>
      <div className="signal-map__bottom"><span>CONNECT THE DOTS.</span><span>THEN BUILD THE THING.</span></div>
      <span className="signal-sticker">CURIOUS<br/>BY DESIGN ↗</span>
    </div>
  );
}

function ProjectMark({ kind }: { kind: string }) {
  if (kind === "ITQAN") return <div className="project-art project-art--itqan" aria-hidden><div className="art-window"><div className="art-window__bar"><i/><i/><i/><span>LEARNING / 0625</span></div><div className="art-window__body"><div className="art-line art-line--wide"/><div className="art-line"/><div className="art-line art-line--short"/><div className="art-blocks"><b/><b/><b/></div></div></div><span className="art-index">A—01</span></div>;
  if (kind === "Sentinel") return <div className="project-art project-art--sentinel" aria-hidden><div className="sentinel-paper"><span>REPORT / GENERATED</span><div className="sentinel-rule"/><div className="sentinel-rule short"/><div className="sentinel-stamp">VERIFIED</div></div><span className="art-index">A—02</span></div>;
  return <div className="project-art project-art--lupira" aria-hidden><div className="lupira-orbit"><i/><i/><i/><b/></div><span className="art-index">A—03</span></div>;
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const } };
  return (
    <main id="main-content" className="portfolio-home">
      <section className="home-hero">
        <div className="hero-meta"><span><i className="live-dot"/> INDEPENDENTLY BUILT. ALWAYS ITERATING.</span><span>PORTFOLIO / 2026</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.p className="hero-kicker" {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: .15 } })}>ENGINEERING WITH A POINT OF VIEW <span>✳</span></motion.p>
            <motion.h1 {...(reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: .8, delay: .1 } })}>
              I make<br/><span className="hero-title-outline">complex</span><br/><em>make sense.</em>
            </motion.h1>
            <motion.p className="hero-description" {...(reduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: .45 } })}>
              I’m Yomna — a systems-minded engineer and financial-crime analyst. I follow the evidence, find the friction, and build things that make the next step clearer.
            </motion.p>
            <div className="hero-actions">
              <Link href="/work" className="button-primary">Explore selected work <ArrowUpRight size={16}/></Link>
              <Link href="/about" className="button-text">A little about me <ArrowDownRight size={16}/></Link>
            </div>
            <div className="hero-footnote"><span>BASED IN THE UAE</span><span>BUILT WITH CURIOSITY, NOT TEMPLATES.</span></div>
          </div>
          <motion.div className="hero-visual" {...(reduceMotion ? {} : { initial: { opacity: 0, scale: .94, rotate: 2 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 1, delay: .25 } })}>
            <SignalMap/>
          </motion.div>
        </div>
        <div className="hero-bottomline"><span>SCROLL A LITTLE. THERE’S SUBSTANCE BELOW.</span><span className="scroll-line"/></div>
      </section>

      <section className="manifesto-strip" aria-label="Approach">
        <div className="manifesto-track"><span>NOTICE THE PATTERN</span><b>✳</b><span>QUESTION THE DEFAULT</span><b>✳</b><span>BUILD THE BETTER WAY</span><b>✳</b><span>NOTICE THE PATTERN</span><b>✳</b><span>QUESTION THE DEFAULT</span><b>✳</b><span>BUILD THE BETTER WAY</span><b>✳</b></div>
      </section>

      <section className="selected-work section-wrap">
        <motion.div className="section-heading" {...reveal()}>
          <div><p className="section-index">01 / PROOF OF WORK</p><h2>Ideas are nice.<br/><em>Working systems</em> are better.</h2></div>
          <p className="section-intro">A few things I’ve taken beyond the “wouldn’t it be cool if…” stage. Each one taught me something different about building for real people.</p>
        </motion.div>
        <div className="project-stack">
          {selected.map((project, index) => (
            <motion.article key={project.id} className={"feature-project feature-project--" + index} {...reveal(index * .08)}>
              <Link href={"/work/" + project.slug} className="project-art-link" aria-label={"Read the " + project.tag + " case study"}><ProjectMark kind={project.tag}/></Link>
              <div className="feature-project__copy">
                <div className="project-overline"><span>SELECTED CASE / 0{index + 1}</span><span className="project-status"><i/> LIVE BUILD</span></div>
                <h3>{project.tag === "ITQAN" ? "A better way to learn." : project.tag === "Sentinel" ? "From raw data to a real report." : "A signal in the noise."}</h3>
                <p>{project.des}</p>
                <div className="project-tags">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links"><Link href={"/work/" + project.slug}>Read the case <ArrowUpRight size={15}/></Link><a href={project.link} target="_blank" rel="noreferrer">Visit live <NorthEast size={14}/></a></div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="all-work-row"><span>THERE’S MORE WHERE THAT CAME FROM.</span><Link href="/work">See the full archive <MoveUpRight size={16}/></Link></div>
      </section>

      <section className="thinking-section">
        <div className="thinking-inner">
          <motion.div className="thinking-title" {...reveal()}><p className="section-index">02 / HOW I THINK</p><h2>Different lenses.<br/><em>One sharper picture.</em></h2><p>My work sits at the intersection of investigation, engineering, and product craft. The overlap is where things get interesting.</p></motion.div>
          <div className="thinking-list">
            <motion.article {...reveal(.05)}><span className="thinking-number">01</span><div><h3>Investigate first.</h3><p>Follow the trail. Ask what the data actually says. Don’t confuse a neat explanation with a true one.</p></div><span className="thinking-glyph">⌕</span></motion.article>
            <motion.article {...reveal(.12)}><span className="thinking-number">02</span><div><h3>Make the system legible.</h3><p>Good engineering reduces mystery. Clear interfaces, auditable decisions, automation with a reason.</p></div><span className="thinking-glyph">⌘</span></motion.article>
            <motion.article {...reveal(.19)}><span className="thinking-number">03</span><div><h3>Care about the last 10%.</h3><p>The edge cases, the keyboard path, the awkward mobile breakpoint. That’s where “it works” becomes “it works well.”</p></div><span className="thinking-glyph">↗</span></motion.article>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-orbit" aria-hidden><span/><span/><span/><b>YA</b></div>
        <div className="closing-copy"><p className="section-index">03 / YOUR TURN</p><h2>Have a good<br/><em>problem?</em></h2><p>I’m always interested in the kind that needs curiosity, care, and a little stubbornness to solve.</p><div className="closing-actions"><Link href="/contact" className="button-primary button-primary--light">Let’s talk <ArrowUpRight size={16}/></Link><Link href="/resume" className="closing-resume">Or take the concise version <ArrowUpRight size={14}/></Link></div></div>
        <div className="closing-footer"><span>YOMNA ALSHEMY © 2026</span><span>MADE WITH INTENTION, NOT DECORATION.</span><a href="https://github.com/yomnalashemy" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16}/></a></div>
      </section>
    </main>
  );
}
