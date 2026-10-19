/**
 * A MacBook built from CSS, not an image or a 3D model — no raster
 * asset exists to drop in, and licensing a stock device-mockup photo
 * isn't something to do without asking. Real proportions (16:10
 * screen, aluminum lid, a hinge, a base with a trackpad notch) instead
 * of a generic rounded rectangle, so it reads as "a Mac" at a glance.
 */
export default function MacFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="mx-auto w-full max-w-[640px]">
      {/* lid: aluminum bezel around the screen */}
      <div
        className="rounded-t-[14px] p-[10px] shadow-[0_30px_60px_-30px_rgba(50,27,36,0.5)]"
        style={{ background: "linear-gradient(155deg, #EDEDEF 0%, #CFCFD2 55%, #B9B9BC 100%)" }}
      >
        <div className="relative rounded-[6px] bg-[#0B0B0D] p-[3px]">
          {/* camera dot */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[2px] z-10 size-[5px] -translate-x-1/2 rounded-full bg-[#1c1c1e] ring-1 ring-[#2a2a2c]"
          />
          <div className="aspect-[16/10.4] w-full overflow-hidden rounded-[4px] bg-white">
            <iframe src={src} title={title} loading="lazy" className="size-full border-0" />
          </div>
        </div>
      </div>
      {/* hinge sliver */}
      <div
        className="h-[7px] w-full"
        style={{ background: "linear-gradient(180deg, #B9B9BC 0%, #A7A7AA 100%)" }}
      />
      {/* base, narrower than the lid like a real MacBook's wedge, with
          a trackpad notch cut into the front edge */}
      <div className="relative mx-auto h-[14px] w-[92%]">
        <div
          className="h-full w-full rounded-b-[8px]"
          style={{ background: "linear-gradient(180deg, #D7D7DA 0%, #B4B4B7 100%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-px left-1/2 h-[6px] w-[72px] -translate-x-1/2 rounded-b-[5px]"
          style={{ background: "#A0A0A3" }}
        />
      </div>
    </div>
  );
}
