// Real 14" MacBook Pro screen resolution (3024x1964, from
// apple.com/macbook-pro/specs) drives the aspect ratio below, instead
// of an eyeballed 16:10.4 guess.
export const MACBOOK_FINISHES = {
  silver: {
    label: "Silver",
    lid: "linear-gradient(155deg, #EDEDEF 0%, #CFCFD2 55%, #B9B9BC 100%)",
    hinge: "linear-gradient(180deg, #B9B9BC 0%, #A7A7AA 100%)",
    base: "linear-gradient(180deg, #D7D7DA 0%, #B4B4B7 100%)",
    notch: "#A0A0A3",
  },
  "space-black": {
    label: "Space Black",
    lid: "linear-gradient(155deg, #4A4A4D 0%, #2E2E31 55%, #1D1D1F 100%)",
    hinge: "linear-gradient(180deg, #2E2E31 0%, #1D1D1F 100%)",
    base: "linear-gradient(180deg, #343437 0%, #1D1D1F 100%)",
    notch: "#141416",
  },
} as const;

export type MacbookFinish = keyof typeof MACBOOK_FINISHES;

/**
 * A 14" MacBook Pro built from CSS — real screen proportions (3024x1964,
 * Apple's own published resolution), both real current finishes (Silver,
 * Space Black), an aluminum lid, a hinge, a base with a trackpad notch.
 * No 3D model or photo asset exists to license safely for this exact
 * product (checked — every free option found was paid or
 * editorial-use-only), so this is the honest way to get a dimensionally
 * accurate device silhouette without IP risk.
 */
export default function MacFrame({
  src,
  title,
  finish = "silver",
}: {
  src: string;
  title: string;
  finish?: MacbookFinish;
}) {
  const f = MACBOOK_FINISHES[finish];
  return (
    <div className="mx-auto w-full max-w-[640px]">
      {/* lid: aluminum bezel around the screen */}
      <div
        className="rounded-t-[14px] p-[10px] shadow-[0_30px_60px_-30px_rgba(50,27,36,0.5)]"
        style={{ background: f.lid }}
      >
        <div className="relative rounded-[6px] bg-[#0B0B0D] p-[3px]">
          {/* camera dot */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[2px] z-10 size-[5px] -translate-x-1/2 rounded-full bg-[#1c1c1e] ring-1 ring-[#2a2a2c]"
          />
          {/* real screen resolution ratio — 3024 / 1964 — not an
              eyeballed one */}
          <div className="aspect-[3024/1964] w-full overflow-hidden rounded-[4px] bg-white">
            <iframe src={src} title={title} loading="lazy" className="size-full border-0" />
          </div>
        </div>
      </div>
      {/* hinge sliver */}
      <div className="h-[7px] w-full" style={{ background: f.hinge }} />
      {/* base, narrower than the lid like a real MacBook's wedge, with
          a trackpad notch cut into the front edge */}
      <div className="relative mx-auto h-[14px] w-[92%]">
        <div className="h-full w-full rounded-b-[8px]" style={{ background: f.base }} />
        <div
          aria-hidden
          className="absolute -bottom-px left-1/2 h-[6px] w-[72px] -translate-x-1/2 rounded-b-[5px]"
          style={{ background: f.notch }}
        />
      </div>
    </div>
  );
}
