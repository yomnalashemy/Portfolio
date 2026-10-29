"use client";

import * as React from "react";

const PHRASES = ["Observe patterns", "Question defaults", "Build better systems"];

/**
 * The working philosophy as one moving line. It only moves while the reader
 * scrolls past it — no perpetual loop — and stays still for reduced motion.
 */
export default function StatementLine() {
  const ref = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the band enters at the bottom, 1 when it leaves at the top
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const overflow = Math.max(0, track.scrollWidth - el.clientWidth);
      track.style.transform = `translate3d(${-progress * overflow}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-label="Working philosophy" className="overflow-hidden bg-ink py-10 text-paper md:py-14">
      <div ref={ref} className="overflow-hidden">
        <p
          ref={trackRef}
          className="flex w-max items-center gap-x-8 gap-y-3 whitespace-nowrap px-5 motion-reduce:w-auto motion-reduce:flex-wrap font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none will-change-transform sm:px-8 lg:px-12"
        >
          {PHRASES.map((phrase, i) => (
            <React.Fragment key={phrase}>
              <span className={i === 1 ? "font-italic italic text-raspberry" : undefined}>{phrase}</span>
              {i < PHRASES.length - 1 && (
                <span aria-hidden className="inline-block size-3 shrink-0 rounded-full bg-lime md:size-4" />
              )}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
