/**
 * An iPhone built from CSS — titanium body, a Dynamic Island cutout,
 * side buttons, a home indicator. Same reasoning as MacFrame: no
 * image asset or 3D model to source, so this is the honest way to get
 * a recognizable device silhouette without faking a photo.
 */
export default function PhoneFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="mx-auto w-[260px]">
      <div
        className="relative rounded-[44px] p-[10px] shadow-[0_30px_60px_-26px_rgba(50,27,36,0.55)]"
        style={{ background: "linear-gradient(160deg, #46464a 0%, #232326 55%, #121214 100%)" }}
      >
        {/* side buttons */}
        <span aria-hidden className="absolute -left-[2px] top-[90px] h-[28px] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
        <span aria-hidden className="absolute -left-[2px] top-[130px] h-[46px] w-[3px] rounded-l-sm bg-[#2b2b2e]" />
        <span aria-hidden className="absolute -right-[2px] top-[110px] h-[56px] w-[3px] rounded-r-sm bg-[#2b2b2e]" />

        <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[34px] bg-black">
          <iframe src={src} title={title} loading="lazy" className="size-full border-0" />
          {/* dynamic island */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[10px] z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black"
          />
          {/* home indicator */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-[6px] left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/50"
          />
        </div>
      </div>
    </div>
  );
}
