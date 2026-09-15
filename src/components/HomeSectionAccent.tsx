import Image from "next/image";

type HomeSectionAccentProps = {
  variant: "cloud" | "flight" | "moon" | "storybook";
};

// Zero-height decorations sit in the existing section padding, without moving content.
export default function HomeSectionAccent({ variant }: HomeSectionAccentProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative -z-10 h-0 select-none">
      <div className="absolute inset-x-0 -top-7 h-20 overflow-hidden sm:-top-10 sm:h-28">
        {variant === "storybook" && (
          <>
            <Image
              src="/decorations/moon-cloud.png"
              alt=""
              width={2172}
              height={724}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 230px, 150px"
              className="absolute left-[5%] top-3 h-auto w-[150px] -rotate-3 opacity-65 sm:left-[12%] sm:top-1 sm:w-[230px] lg:left-[17%] lg:w-[300px]"
            />
            <Image
              src="/decorations/swallow-sparkles.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 112px, (min-width: 640px) 88px, 58px"
              className="absolute right-[7%] top-1 h-auto w-[58px] rotate-6 opacity-60 sm:right-[16%] sm:top-6 sm:w-[88px] lg:right-[22%] lg:w-[112px]"
            />
          </>
        )}
        {variant === "cloud" && (
          <div className="absolute left-[8%] top-2 flex items-center gap-5 opacity-45 sm:left-[14%] sm:gap-9">
            <Image
              src="/claude-classic.png"
              alt=""
              width={2172}
              height={724}
              sizes="(min-width: 640px) 176px, 112px"
              className="h-auto w-28 -rotate-3 sm:w-44"
            />
            <svg viewBox="0 0 70 42" fill="none" className="h-8 w-14 text-[#d4a75b] sm:h-10 sm:w-[70px]">
              <path d="M15 8 Q15 20 6 21 Q15 22 15 34 Q16 22 25 21 Q16 20 15 8Z" fill="currentColor" />
              <circle cx="39" cy="12" r="2" fill="currentColor" opacity=".6" />
              <path d="m55 23 1.5 5 4.5 1.5-4.5 1.5-1.5 5-1.5-5-4.5-1.5 4.5-1.5Z" fill="currentColor" opacity=".7" />
            </svg>
          </div>
        )}
        {variant === "flight" && (
          <div className="absolute right-[5%] top-1 flex items-center gap-2 sm:right-[12%] sm:gap-4">
            <svg viewBox="0 0 150 45" fill="none" className="hidden h-10 w-32 text-[#90aabd]/35 sm:block">
              <path d="M3 34C30 8 51 44 78 25S115 6 143 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 9" />
              <circle cx="26" cy="8" r="2" fill="#d4a75b" opacity=".7" />
            </svg>
            <Image
              src="/blue-bird.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 640px) 70px, 46px"
              className="h-auto w-[46px] -rotate-12 opacity-40 sm:w-[70px] sm:opacity-50"
            />
          </div>
        )}
        {variant === "moon" && (
          <svg viewBox="0 0 210 80" fill="none" className="absolute left-[7%] top-0 h-14 w-[147px] -rotate-6 text-[#d4ae72] opacity-40 sm:left-[18%] sm:h-20 sm:w-[210px]">
            <path d="M108 10a25 25 0 1 0 23 36A25 25 0 0 1 108 10Z" fill="currentColor" opacity=".6" />
            <path d="M51 31q0 10-8 11 8 1 8 11 1-10 9-11-8-1-9-11Z" fill="currentColor" />
            <path d="m162 12 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="currentColor" />
            <circle cx="22" cy="23" r="2" fill="currentColor" />
            <circle cx="187" cy="48" r="1.5" fill="currentColor" />
            <circle cx="145" cy="65" r="2.5" fill="currentColor" opacity=".5" />
          </svg>
        )}
      </div>
    </div>
  );
}
