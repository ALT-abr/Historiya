import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import StoryCard from "@/components/StoryCard";

const stories = [
  { title: "La fille qui partit à la lune", imageSrc: "/stories/la fille qui partie a la lune.png", slug: "la-fille-qui-partit-a-la-lune", min: 13 },
  { title: "La merveille de Soumar", imageSrc: "/stories/la merveille de soumar.png", slug: "la-merveille-de-soumar", min: 10 },
  { title: "Le ballon bleu", imageSrc: "/stories/le ballent blue.png", slug: "le-ballon-bleu", min: 11 },
  { title: "Le dragon qui avait peur du noir", imageSrc: "/stories/le dragon qui a fait peur de noir.png", slug: "le-dragon-qui-avait-peur-du-noir", min: 9 },
  { title: "Le village sucré", imageSrc: "/stories/le village sucre.png", slug: "le-village-sucre", min: 14 },
  { title: "Les trois frères", imageSrc: "/stories/les trois frere.png", slug: "les-trois-freres", min: 12 },
  { title: "Le hérisson qui cherchait un ami", imageSrc: "/stories/le herisson qui cherchait un ami.png", slug: "le-herisson-qui-cherchait-un-ami", min: 12 },
];

export default function StoriesPage() {
  return (
    <section className="min-h-screen bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
      <div className="mb-9">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#678091]">
          Notre bibliothèque
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[#10243a] sm:text-5xl">
          Toutes les histoires
        </h1>
        <p className="mt-3 max-w-2xl text-[#5d6a74]">
          Trouvez la prochaine histoire qui fera voyager votre imagination.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-4xl">
          <FiSearch aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <label htmlFor="story-search" className="sr-only">Rechercher une histoire</label>
          <input
            id="story-search"
            type="search"
            placeholder="Rechercher une histoire..."
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-[#10243a] outline-none focus:border-[#315e78]"
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="story-sort" className="whitespace-nowrap text-sm text-[#46545e]">Trier par :</label>
          <select id="story-sort" className="h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm text-[#10243a] outline-none focus:border-[#315e78]">
            <option value=""></option>
            <option value="aventure">Aventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="amitie">Amitié</option>
          </select>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {stories.map((story) => (
          <StoryCard
            key={story.slug}
            title={story.title}
            href={`/hisoires/${story.slug}`}
            imageSrc={story.imageSrc}
            imageAlt={`Illustration de ${story.title}`}
            min={story.min}
          />
        ))}
      </div>

      <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <Link
            key={page}
            href={`/hisoires?page=${page}`}
            aria-current={page === 1 ? "page" : undefined}
            className={`grid size-10 place-items-center rounded-lg text-sm font-semibold ${page === 1 ? "bg-[#10243a] text-white" : "border border-slate-300 bg-white text-[#10243a] hover:border-[#10243a]"}`}
          >
            {page}
          </Link>
        ))}
      </nav>
      </div>
    </section>
  );
}
