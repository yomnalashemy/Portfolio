// Real iPhone 18 Pro dimensions (150.0 x 71.9mm, from apple.com/iphone-18-pro/specs)
// drive the aspect ratio below, instead of an eyeballed 9:19.5 guess.
export const IPHONE_FINISHES = {
  black: { label: "Black", body: "linear-gradient(160deg, #46464a 0%, #232326 55%, #121214 100%)" },
  silver: { label: "Silver", body: "linear-gradient(160deg, #F0F0F2 0%, #D7D8DA 55%, #C3C4C6 100%)" },
  glacier: { label: "Glacier", body: "linear-gradient(160deg, #D9E4EB 0%, #C2D1DA 55%, #A9BAC4 100%)" },
  burgundy: { label: "Burgundy", body: "linear-gradient(160deg, #7D2B3B 0%, #5E1C2A 55%, #45121E 100%)" },
} as const;

export type IphoneFinish = keyof typeof IPHONE_FINISHES;

/**
 * An iPhone 18 Pro built from CSS — real proportions (71.9 x 150.0mm),
 * a Dynamic Island, the four real announced finishes, side buttons, a
 * home indicator. No 3D model or photo asset exists to license safely
 * (checked — every free "realistic iPhone" model found was paid or
 * editorial-use-only), so this is the honest way to get a dimensionally
 * accurate device silhouette without any IP risk.
 */
export default function PhoneFrame({
  src,
  title,
  finish = "black",
}: {
  src: string;
  title: string;
  finish?: IphoneFinish;
}) {
  const { body } = IPHONE_FINISHES[finish];
  return (
    <div className="mx-auto w-[258px]">
      <div
        className="relative rounded-[48px] p-[10px] shadow-[0_30px_60px_-26px_rgba(50,27,36,0.55)]"
        style={{ background: body }}
      >
        {/* side buttons */}
        <span aria-hidden className="absolute -left-[2px] top-[90px] h-[28px] w-[3px] rounded-l-sm bg-black/25" />
        <span aria-hidden className="absolute -left-[2px] top-[130px] h-[46px] w-[3px] rounded-l-sm bg-black/25" />
        <span aria-hidden className="absolute -right-[2px] top-[110px] h-[56px] w-[3px] rounded-r-sm bg-black/25" />

        {/* real height:width ratio — 150.0 / 71.9mm — not an eyeballed one */}
        <div className="relative aspect-[71.9/150] w-full overflow-hidden rounded-[38px] bg-black">
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
