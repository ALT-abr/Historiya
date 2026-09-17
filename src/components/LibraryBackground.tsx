import Image from "next/image";

export default function LibraryBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
      <Image
        src="/decorations/moon-cloud.png"
        alt=""
        width={2172}
        height={724}
        sizes="(min-width: 1024px) 320px, 160px"
        className="absolute -right-10 top-6 h-auto w-40 opacity-20 lg:right-[3%] lg:w-80 lg:opacity-35"
      />
      <Image
        src="/decorations/blue-bird.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 64px, 48px"
        className="absolute left-[8%] top-1 h-auto w-12 -rotate-12 opacity-55 lg:left-[12%] lg:w-16"
      />
      <Image
        src="/decorations/claude-moon-seen.png"
        alt=""
        width={2172}
        height={724}
        sizes="(min-width: 1024px) 260px, 160px"
        className="absolute -left-8 -bottom-3 h-auto w-40 opacity-45 lg:-left-10 lg:w-[260px] lg:opacity-55"
      />
      <Image
        src="/decorations/swallow-sparkles.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 64px, 48px"
        className="absolute right-[8%] bottom-1 h-auto w-12 rotate-6 opacity-55 lg:right-[12%] lg:w-16"
      />
    </div>
  );
}
