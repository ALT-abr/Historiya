import Image from "next/image";

export default function HomeBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
      <Image
        src="/claude-classic.png"
        alt=""
        width={2172}
        height={724}
        sizes="(min-width: 1024px) 420px, 220px"
        className="absolute -right-16 top-[24%] h-auto w-[220px] opacity-25 lg:-right-20 lg:w-[420px] lg:opacity-40"
      />
      <Image
        src="/blue-bird.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(min-width: 1280px) 110px, 72px"
        className="absolute left-[2%] top-[35%] hidden h-auto w-[72px] -rotate-12 opacity-25 md:block xl:w-[110px] xl:opacity-40"
      />
      <Image
        src="/claude-moon-seen.png"
        alt=""
        width={2172}
        height={724}
        sizes="(min-width: 1024px) 360px, 200px"
        className="absolute -left-20 top-[51%] h-auto w-[200px] opacity-20 lg:-left-24 lg:w-[360px] lg:opacity-35"
      />
      <Image
        src="/bird-classic.png"
        alt=""
        width={1330}
        height={1182}
        sizes="(min-width: 1280px) 76px, 56px"
        className="absolute right-[3%] top-[58%] hidden h-auto w-14 rotate-6 opacity-30 lg:block xl:w-[76px]"
      />
      <Image
        src="/cluad-moon-bhinde.png"
        alt=""
        width={2171}
        height={724}
        sizes="(min-width: 1024px) 460px, 240px"
        className="absolute -right-16 bottom-[3%] h-auto w-[240px] opacity-25 lg:-right-20 lg:w-[460px] lg:opacity-40"
      />
      <Image
        src="/bird-orange.png"
        alt=""
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 90px, 64px"
        className="absolute bottom-[9%] left-[4%] hidden h-auto w-16 -rotate-6 opacity-30 sm:block lg:w-[90px]"
      />
    </div>
  );
}
