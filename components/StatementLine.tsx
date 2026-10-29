import * as React from "react";

const PHRASES = ["Observe patterns", "Question defaults", "Build better systems"];

function Phrases() {
  return (
    <>
      {PHRASES.map((phrase, i) => (
        <React.Fragment key={phrase}>
          <span
            className={
              i === 1
                ? "shimmer bg-gradient-to-r from-raspberry via-lime to-raspberry bg-clip-text font-italic italic text-transparent"
                : undefined
            }
          >
            {phrase}
          </span>
          <span aria-hidden className="inline-block size-3 shrink-0 rotate-45 bg-lime md:size-4" />
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * The working philosophy as a continuous marquee. It pauses on hover, and for
 * reduced motion it becomes a static, wrapped line instead of a loop.
 */
export default function StatementLine() {
  return (
    <section
      aria-label="Working philosophy"
      className="marquee overflow-hidden bg-gradient-to-r from-ink via-plum to-ink py-10 text-paper md:py-14"
    >
      <p className="sr-only">{PHRASES.join(". ")}.</p>
      <div
        aria-hidden
        className="marquee-track flex w-max items-center whitespace-nowrap font-display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-y-3 motion-reduce:px-5 motion-reduce:whitespace-normal sm:motion-reduce:px-8 lg:motion-reduce:px-12"
      >
        <span className="flex items-center gap-x-10 pl-10 motion-reduce:flex-wrap motion-reduce:pl-0">
          <Phrases />
        </span>
        {/* the second copy makes the loop seamless; hidden when motion is reduced */}
        <span className="flex items-center gap-x-10 pl-10 motion-reduce:hidden">
          <Phrases />
        </span>
      </div>
    </section>
  );
}
