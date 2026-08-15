import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

const categories = [
  { title: "Aventure", imageSrc: "/categories/advanture.png", slug: "aventure" },
  { title: "Fantastique", imageSrc: "/categories/fantasy.png", slug: "fantastique" },
  { title: "Amitié", imageSrc: "/categories/amitie.png", slug: "amitie" },
  { title: "Animaux", imageSrc: "/categories/animaux.png", slug: "animaux" },
  { title: "Légende", imageSrc: "/categories/legende.png", slug: "legende" },
  { title: "Culture", imageSrc: "/categories/culture.png", slug: "culture" },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[520px] overflow-hidden bg-[#fff4de] sm:min-h-[590px] lg:min-h-[640px]">
        <Image
          src="/historiya-hero.png"
          alt="Un enfant lit une histoire avec un petit renard dans une forêt enchantée"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[68%_center] sm:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fff6e5] via-[#fff6e5]/95 to-[#fff6e5]/5 sm:via-[#fff6e5]/75 sm:to-transparent" />

        <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-16 sm:min-h-[590px] sm:px-8 lg:min-h-[640px] lg:px-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#10243a] sm:text-5xl lg:text-6xl">
              Des histoires qui
              <br />
              éveillent l’imagination
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#3d4b55] sm:text-xl">
              Découvrez des histoires merveilleuses
              <br className="hidden sm:block" /> à lire partout et à tout moment.
            </p>
            <Link
              href="/hisoires"
              className="mt-9 inline-flex rounded-xl bg-[#0d2338] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0d2338]/15 transition hover:-translate-y-0.5 hover:bg-[#173a59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d2338]"
            >
              Commencer à lire
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] py-12 sm:py-16" aria-labelledby="categories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="categories-title" className="text-2xl font-bold tracking-tight text-[#10243a]">
              Catégories populaires
            </h2>
            <Link
              href="/hisoires#categories"
              className="text-sm font-semibold text-[#315e78] transition hover:text-[#0d2338]"
            >
              Voir toutes
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 sm:justify-between sm:gap-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                href={`/hisoires?categorie=${category.slug}`}
                imageSrc={category.imageSrc}
                imageAlt={`Illustration de la catégorie ${category.title}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
