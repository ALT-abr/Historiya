import Image from "next/image";
import { BiHeart } from "react-icons/bi";

export default function AudioPage() {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-5 py-16 sm:px-8">
      <Image
        src="/audio/audio-coming-soon-bg.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      <div className="mt-32 max-w-xl text-center sm:mt-40">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10245b] sm:text-5xl">
          L’espace <span className="text-[#6846d8]">audio</span>
          <br />
          arrive bientôt !
        </h1>

        <div className="my-5 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px w-7 bg-[#f0b48a]" />
          <span className="text-[#f3ad63]">★</span>
          <span className="h-px w-7 bg-[#f0b48a]" />
        </div>

        <p className="mx-auto max-w-md text-sm leading-6 text-[#465a83] sm:text-base">
          Préparez-vous à écouter vos histoires préférées
          <br className="hidden sm:block" /> dans une expérience audio magique.
        </p>

        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#f1eaff]/90 px-5 py-3 text-sm font-semibold text-[#653bd2] shadow-sm backdrop-blur-sm">
          <BiHeart aria-hidden="true" className="size-5" />
          <p>Encore un peu de patience, de belles histoires arrivent !</p>
        </div>
      </div>
    </div>
  );
}
