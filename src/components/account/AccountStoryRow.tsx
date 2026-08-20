import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

type AccountStoryRowProps = {
  title: string;
  slug: string;
  imageSrc: string;
  addedAt: string;
  lastPageNumber?: number;
};

export default function AccountStoryRow({
  title,
  slug,
  imageSrc,
  addedAt,
  lastPageNumber,
}: AccountStoryRowProps) {
  return (
    <Link
      href={`/biblioteque/${slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-[#ebe5e2] bg-white/85 p-3 shadow-[0_8px_24px_rgba(55,39,90,0.04)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:gap-6"
    >
      <Image
        src={imageSrc}
        alt={`Couverture de ${title}`}
        width={112}
        height={88}
        className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28"
      />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-extrabold text-[#101e58] sm:text-xl">
          {title}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#687196] sm:text-base">
          <span>Ajoutée le {addedAt}</span>
          {lastPageNumber !== undefined && (
            <>
              <span aria-hidden="true">•</span>
              <span>Dernière page lue : {lastPageNumber}</span>
            </>
          )}
        </span>
      </span>

      <BiChevronRight
        aria-hidden="true"
        className="size-7 shrink-0 text-violet-600 transition group-hover:translate-x-1"
      />
    </Link>
  );
}
