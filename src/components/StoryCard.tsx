import Image from "next/image";
import Link from "next/link";

type StoryCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  min: number;
};

export default function StoryCard({
  title,
  href,
  imageSrc,
  imageAlt,
  min,
}: StoryCardProps) {
  return (
    <Link
      href={href}
      className="group block w-full overflow-hidden rounded-2xl bg-[#242529] shadow-sm ring-1 ring-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10243a]"
    >
      <article>
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 640px) 260px, 75vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#242529] to-transparent" />
        </div>

        <div className="p-3 pb-4">
          <h3 className="line-clamp-2 min-h-12 text-lg font-bold leading-6 text-white">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-[#b8bbc2]">Histoire&nbsp;&nbsp;•&nbsp;&nbsp;{min} min</p>
        </div>
      </article>
    </Link>
  );
}
