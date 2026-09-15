import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { FaFeatherAlt } from "react-icons/fa";

export default function WeeklyStorySection() {
  return (
    <section
      aria-labelledby="weekly-story-title"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1560px] rounded-[40px] bg-[linear-gradient(125deg,#173451_0%,#102b47_62%,#f8c68e_83%,#142e49_95%)] p-[2px] shadow-[0_25px_65px_-25px_#000a]">
        <article className="grid items-center gap-7 rounded-[40px] bg-[radial-gradient(ellipse_at_top_right,#353943_0%,#0b1e36_30%,#0a1d33_75%,#0d243c_100%)] p-5 sm:gap-10 sm:p-7 lg:grid-cols-[0.44fr_0.56fr] lg:gap-[4%] lg:p-8 lg:pr-16">
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[23px] border-2 border-[#244764]">
            <Image
              src="/stories/le-petit-chaperon-rouge.png"
              alt="Le Petit Chaperon rouge et le loup dans la forêt, près d’une chaumière"
              fill
              sizes="(min-width: 1672px) 615px, (min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[center_55%]"
            />
          </div>

          <div className="min-w-0 py-2 lg:py-6">
            <p className="text-sm font-bold uppercase tracking-[0.06em] text-[#ffcc70] sm:text-lg lg:text-xl xl:text-xl">
              Le choix de la semaine
            </p>
            <h2
              id="weekly-story-title"
              className="mt-5 [font-family:var(--font-lora),Georgia,serif] text-3xl font-bold leading-tight tracking-tight text-[#f7f7fb] sm:text-4xl lg:mt-7 lg:text-[clamp(2rem,3vw,3rem)]"
            >
              Le Petit Chaperon rouge
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#aebdce] sm:text-xl lg:mt-8 xl:text-xl">
              Dans un petit village, une fillette appelée Chaperon rouge part porter une galette et un pot de miel à sa grand-mère qui vit de l’autre côté de la forêt. En chemin, elle ...
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-[#ffffff] sm:text-lg lg:mt-8 xl:text-xl">
              <span className="inline-flex items-center gap-3">
                <FaFeatherAlt aria-hidden="true" className="size-4 shrink-0 text-[#008060] xl:size-5" />
                Charles Perrault
              </span>
              <span aria-hidden="true">·</span>
              <span>8 min</span>
              <span aria-hidden="true">·</span>
              <span>Contes, Classiques</span>
            </div>
            <Link
              href="/biblioteque/le-petit-chaperon-rouge"
              className="
                mt-8 flex w-full 
                items-center justify-center gap-3 
                rounded-full border-t-2 border-[#fff0c6] 
                bg-[linear-gradient(170deg,#fbe09b_0%,#f7ce7b_50%,#efb34f_100%)] 
                px-4 py-4 
                text-base font-extrabold text-[#09203d] 
                shadow-[inset_0_-2px_0_#e6a43b] 
                transition hover:brightness-105 
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffcc70] 
                sm:gap-5 sm:text-xl lg:mt-10 xl:text-[23px]"
            >
              <FiBookOpen aria-hidden="true" className="size-5 shrink-0 sm:size-6" />
              Commencer la lecture
              <FiArrowRight aria-hidden="true" className="size-5 shrink-0 sm:size-7" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
