import Link from "next/link";
import type { ReactNode } from "react";

type ComingSoonCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  eyebrow?: string;
  buttonLabel?: string;
  buttonHref?: string;
  headingAs?: "h1" | "h2" | "h3";
};

export default function ComingSoonCard({
  title,
  description,
  icon,
  eyebrow = "Prochainement",
  buttonLabel = "Retour à l’accueil",
  buttonHref = "/",
  headingAs: Heading = "h1",
}: ComingSoonCardProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center rounded-[40px] border border-dashed border-[#bdc8d6] bg-white px-6 py-16 text-center text-[#122340] sm:px-12 lg:min-h-[620px] lg:pb-[116px] lg:pt-[149px]">
      <span aria-hidden="true" className="grid size-[58px] shrink-0 place-items-center">
        {icon ?? (
          <span className="grid size-full place-items-center rounded-full border-[4.5px] border-[#122340]">
            <span className="size-9 rounded-full bg-[#122340]" />
          </span>
        )}
      </span>

      <p className="mt-[38px] text-[18px] font-bold uppercase leading-6 tracking-[0.14em] text-[#b76c00]">
        {eyebrow}
      </p>

      <Heading className="mt-10 text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px] lg:leading-[58px]">
        {title}
      </Heading>

      <p className="mt-8 text-base leading-9 sm:text-xl lg:text-2xl">
        {description}
      </p>

      <Link
        href={buttonHref}
        className="mt-[30px] inline-flex items-center justify-center rounded-full bg-[#122340] px-[30px] text-xl font-extrabold leading-8 text-white transition hover:bg-[#244365] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#122340] sm:text-2xl"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
