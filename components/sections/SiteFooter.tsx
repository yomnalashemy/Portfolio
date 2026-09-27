export default function SiteFooter() {
  return (
    <footer className="border-t border-cherry/10 bg-espresso px-6 py-14 text-center md:px-10">
      {/* the signature — Caveat at real size, not the small script-note
          scale, with a hand-drawn underline stroke rather than a plain
          CSS border so it reads as pen-on-paper, not a text-decoration */}
      <p className="font-script text-5xl leading-none md:text-6xl" style={{ color: "#FFD6E7" }}>
        Yomna Alshemy
      </p>
      <svg
        aria-hidden
        viewBox="0 0 220 20"
        className="mx-auto mt-1 h-4 w-44 md:w-52"
        style={{ color: "#FFD6E7" }}
      >
        <path
          d="M4 10 C 40 2, 80 16, 120 8 S 190 2, 216 11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      <p className="label-tech mt-8 text-pearl/50">
        SYSTEM STATUS: <span className="text-pistachio">ONLINE</span>
      </p>
      <p className="script-note mt-3" style={{ color: "#FFD6E7" }}>
        Thanks for stopping by.
      </p>

      <p className="label-tech mt-8 text-pearl/30">
        © {new Date().getFullYear()} Yomna Alshemy. All rights reserved.
      </p>
    </footer>
  );
}
