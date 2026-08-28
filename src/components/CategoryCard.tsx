import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
    href : string;
    imageSrc : string;
    imageAlt : string;
};

export default function CategoryCard({
  href,
  imageSrc,
  imageAlt,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-w-20 flex-col items-center rounded-2xl p-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2338]"
    >
      <div className="relative aspect-square w-20 overflow-hidden rounded-2xl bg-[#f7ead8] shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:w-24">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 640px) 96px, 80px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
