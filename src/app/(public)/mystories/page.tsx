import Image from "next/image";
import { BiHeart } from "react-icons/bi";

export default function MyStoriesPage() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-10">
      <Image
        src="/generator/generator-coming-soon-bg.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10245b] sm:text-5xl lg:text-6xl">
            Le générateur de
            <br />
            <span className="text-[#6846d8]">ma histoire</span> arrive bientôt !
          </h1>

          <div className="my-6 flex items-center gap-2" aria-hidden="true">
            <span className="h-px w-8 bg-[#f0b48a]" />
            <span className="text-[#f3ad63]">★</span>
            <span className="h-px w-8 bg-[#f0b48a]" />
          </div>

          <p className="max-w-xl text-base leading-7 text-[#30476d] sm:text-lg">
            Créez bientôt vos propres histoires en quelques clics
            <br className="hidden sm:block" /> et laissez libre cours à votre imagination.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f1eaff]/90 px-5 py-3 text-sm font-semibold text-[#653bd2] shadow-sm backdrop-blur-sm sm:text-base">
            <BiHeart aria-hidden="true" className="size-5 shrink-0" />
            <p>Encore un peu de patience, de belles histoires arrivent !</p>
          </div>
        </div>
      </div>
    </section>
  );
}
