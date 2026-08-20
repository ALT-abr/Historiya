import Link from "next/link";
import Image from "next/image";
import { BiBookOpen } from "react-icons/bi";

type AccountEmptyStateProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
};

export default function AccountEmptyState({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonLabel,
  buttonHref = "/biblioteque",
}: AccountEmptyStateProps) {
  return (
    <section className="mx-auto grid max-w-3xl items-center gap-7 py-12 sm:grid-cols-2 sm:gap-10 sm:py-16">
      <div className="relative mx-auto aspect-square w-full max-w-64 sm:max-w-72">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 256px, 288px"
          className="object-contain"
        />
      </div>

      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#101e58]">
          {title}
        </h2>
        <p className="mt-3 text-base leading-7 text-[#687196]">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        >
          <BiBookOpen aria-hidden="true" className="size-5" />
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
