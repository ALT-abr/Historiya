import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import StoryCard from "@/components/StoryCard";

const categories = [
  { title: "Aventure", imageSrc: "/categories/advanture.png", slug: "aventure" },
  { title: "Fantastique", imageSrc: "/categories/fantasy.png", slug: "fantastique" },
  { title: "Amitié", imageSrc: "/categories/amitie.png", slug: "amitie" },
  { title: "Animaux", imageSrc: "/categories/animaux.png", slug: "animaux" },
  { title: "Légende", imageSrc: "/categories/legende.png", slug: "legende" },
  { title: "Culture", imageSrc: "/categories/culture.png", slug: "culture" },
];

const popularStories = [
  { title: "La fille qui partit à la lune", imageSrc: "/stories/la fille qui partie a la lune.png", slug: "la-fille-qui-partit-a-la-lune", min: 13 },
  { title: "La merveille de Soumar", imageSrc: "/stories/la merveille de soumar.png", slug: "la-merveille-de-soumar", min: 10 },
  { title: "Le ballon bleu", imageSrc: "/stories/le ballent blue.png", slug: "le-ballon-bleu", min: 11 },
  { title: "Le dragon qui avait peur du noir", imageSrc: "/stories/le dragon qui a fait peur de noir.png", slug: "le-dragon-qui-avait-peur-du-noir", min: 9 },
  { title: "Le village sucré", imageSrc: "/stories/le village sucre.png", slug: "le-village-sucre", min: 14 },
  { title: "Les trois frères", imageSrc: "/stories/les trois frere.png", slug: "les-trois-freres", min: 12 },
  { title: "Le hérisson qui cherchait un ami", imageSrc: "/stories/le herisson qui cherchait un ami.png", slug: "le-herisson-qui-cherchait-un-ami", min: 12 },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[400px] overflow-hidden bg-[#fff4de]">
        <Image src="/historiya-hero.png" alt="Un enfant lit une histoire avec un petit renard dans une forêt enchantée" fill preload sizes="100vw" className="-z-20 object-cover object-[68%_center] sm:object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fff6e5] via-[#fff6e5]/95 to-[#fff6e5]/5 sm:via-[#fff6e5]/75 sm:to-transparent" />
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#10243a] sm:text-5xl lg:text-6xl">Des histoires qui<br />éveillent l’imagination</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#3d4b55] sm:text-xl">Découvrez des histoires merveilleuses<br className="hidden sm:block" /> à lire partout et à tout moment.</p>
            <Link href="/hisoires" className="mt-9 inline-flex rounded-xl bg-[#0d2338] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0d2338]/15 transition hover:-translate-y-0.5 hover:bg-[#173a59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d2338]">Commencer à lire</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] py-12 sm:py-16" aria-labelledby="categories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="categories-title" className="text-2xl font-bold tracking-tight text-[#10243a]">Catégories populaires</h2>
            <Link href="/hisoires#categories" className="text-sm font-semibold text-[#315e78] transition hover:text-[#0d2338]">Voir toutes</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 sm:justify-between sm:gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} title={category.title} href={`/hisoires?categorie=${category.slug}`} imageSrc={category.imageSrc} imageAlt={`Illustration de la catégorie ${category.title}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] py-12 sm:py-16" aria-labelledby="popular-stories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="popular-stories-title" className="text-2xl font-bold tracking-tight text-[#10243a]">Histoires populaires</h2>
            <Link href="/hisoires" className="text-sm font-semibold text-[#315e78] transition hover:text-[#0d2338]">Voir toutes</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {popularStories.map((story) => (
              <StoryCard key={story.slug} title={story.title} href={`/hisoires/${story.slug}`} imageSrc={story.imageSrc} imageAlt={`Illustration de ${story.title}`} min={story.min} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
