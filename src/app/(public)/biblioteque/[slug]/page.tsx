import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiBookOpen, FiBookmark, FiClock, FiHeadphones, FiHeart } from "react-icons/fi";
import StoryCard from "@/components/StoryCard";

const stories = [
  { slug: "la-fille-qui-partit-a-la-lune", title: "La fille qui partit à la lune", description: "Une jeune rêveuse embarque pour un voyage extraordinaire vers la lune et découvre que le courage peut nous emmener plus loin que toutes les fusées.", imageSrc: "/stories/la fille qui partie a la lune.png", imageAlt: "Une fille voyage vers la lune à bord d’une fusée", min: 13, category: "Aventure" },
  { slug: "la-merveille-de-soumar", title: "La merveille de Soumar", description: "Au bord de la mer, Soumar découvre un secret merveilleux qui lui apprend à écouter la nature et à croire en ses rêves.", imageSrc: "/stories/la merveille de soumar.png", imageAlt: "Soumar devant la mer au coucher du soleil", min: 10, category: "Fantastique" },
  { slug: "le-ballon-bleu", title: "Le ballon bleu", description: "Un ballon bleu entraîne un enfant curieux dans une aventure pleine de surprises, d’amitié et de découvertes.", imageSrc: "/stories/le ballent blue.png", imageAlt: "Une baleine bleue nage sous l’océan", min: 11, category: "Aventure" },
  { slug: "le-dragon-qui-avait-peur-du-noir", title: "Le dragon qui avait peur du noir", description: "Un petit dragon apprend à apprivoiser la nuit et comprend que même les plus courageux peuvent parfois avoir peur.", imageSrc: "/stories/le dragon qui a fait peur de noir.png", imageAlt: "Un petit dragon sous la lumière de la lune", min: 9, category: "Fantastique" },
  { slug: "le-village-sucre", title: "Le village sucré", description: "Dans un village fait de confiseries, une aventure gourmande montre que le partage rend les douceurs encore meilleures.", imageSrc: "/stories/le village sucre.png", imageAlt: "Un village coloré construit avec des sucreries", min: 14, category: "Fantastique" },
  { slug: "les-trois-freres", title: "Les trois frères", description: "Trois frères très différents unissent leurs talents pour surmonter une épreuve qu’aucun d’eux ne pouvait réussir seul.", imageSrc: "/stories/les trois frere.png", imageAlt: "Les trois frères réunis pour une aventure", min: 12, category: "Amitié" },
  { slug: "le-herisson-qui-cherchait-un-ami", title: "Le hérisson qui cherchait un ami", description: "Un petit hérisson parcourt la forêt à la recherche d’un ami et découvre que l’amitié peut naître là où on ne l’attend pas.", imageSrc: "/stories/le herisson qui cherchait un ami.png", imageAlt: "Un petit hérisson dans la forêt", min: 12, category: "Amitié" },
];

type StoryDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default async function StoryDetailsPage({ params }: StoryDetailsPageProps) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);

  if (!story) notFound();

  const similarStories = stories.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <main className="bg-[#fffdf8]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/biblioteque" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#526572] transition hover:text-[#10243a]">
          <FiArrowLeft aria-hidden="true" />
          Retour à la bibliothèque
        </Link>

        <div className="grid items-center gap-8 md:grid-cols-[minmax(260px,380px)_1fr] lg:gap-14">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
            <Image src={story.imageSrc} alt={story.imageAlt} fill preload sizes="(max-width: 768px) 100vw, 380px" className="object-cover" />
          </div>

          <div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#10243a] sm:text-5xl">
              {story.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="inline-flex rounded-full bg-[#e8f0e7] px-4 py-2 text-sm font-semibold text-[#315845]">
                {story.category}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-[#65737c]">
                <FiClock aria-hidden="true" />
                {story.min} min
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52616b]">
              {story.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/biblioteque/${story.slug}/lire/1`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10243a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c3b58]"
              >
                <FiBookOpen aria-hidden="true" className="size-5" />
                Commencer l’histoire
              </Link>

              <Link
                href={`/audio?story=${story.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ccd3d7] bg-white px-5 py-3 text-sm font-semibold text-[#10243a] transition hover:border-[#10243a]"
              >
                <FiHeadphones aria-hidden="true" className="size-5" />
                Audio
              </Link>

              <button
                type="button"
                aria-label="Ajouter aux favoris"
                className="grid size-11 place-items-center rounded-xl border border-[#ccd3d7] bg-white text-[#10243a] transition hover:border-[#d35b67] hover:bg-[#fff1f2] hover:text-[#c23c4b]"
              >
                <FiHeart aria-hidden="true" className="size-5" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ccd3d7] bg-white px-5 py-3 text-sm font-semibold text-[#10243a] transition hover:border-[#10243a]"
              >
                <FiBookmark aria-hidden="true" className="size-5" />
                Lire plus tard
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5ded2] bg-[#f5f1e8] py-12" aria-labelledby="similar-stories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 id="similar-stories-title" className="mb-7 text-2xl font-bold tracking-tight text-[#10243a]">
            Histoires similaires
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {similarStories.map((item) => (
              <StoryCard
                key={item.slug}
                title={item.title}
                href={`/biblioteque/${item.slug}`}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                min={item.min}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
