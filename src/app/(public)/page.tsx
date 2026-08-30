import Image from "next/image";
import Link from "next/link";
import HomeCategoriesSection from "@/components/HomeCategoriesSection";
import StoryCard from "@/components/StoryCard";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const [categoriesResult, storiesResult] = await Promise.all([
    supabase
      .from("categories")
      .select("category_name, slug, image_url")
      .order("category_name", { ascending: true }),
    supabase
      .from("stories")
      .select("title, slug, cover_url, reading_time_minutes")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (categoriesResult.error) {
    throw new Error(`Impossible de charger les catégories : ${categoriesResult.error.message}`);
  }

  if (storiesResult.error) {
    throw new Error(`Impossible de charger les histoires : ${storiesResult.error.message}`);
  }

  const databaseCategories = categoriesResult.data ?? [];
  const databaseStories = storiesResult.data ?? [];

  return (
    <main className="bg-[linear-gradient(135deg,#fbfcff_0%,#f7f8ff_55%,#fffaf5_100%)]">
      <section className="relative isolate -mt-[88px] min-h-[860px] overflow-hidden pt-[88px] lg:min-h-[650px]">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[62%] lg:bottom-0 lg:left-auto lg:right-0 lg:top-[88px] lg:h-auto lg:w-[58%]">
          <Image
            src="/historiya-hero-illustration.png"
            alt="Un enfant lisant un livre qui donne vie à un château, un dragon et un bateau"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-contain object-bottom lg:object-right-bottom"
          />
        </div>

        <div className="mx-auto flex min-h-[772px] max-w-7xl items-start px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:min-h-[562px] lg:items-center lg:px-10 lg:py-12">
          <div className="max-w-[56rem]">
            <h1 className="max-w-[56rem] [font-family:var(--font-nunito),Arial,sans-serif] text-[clamp(2.75rem,11vw,4rem)] font-black leading-[1.08] tracking-[-0.05em] text-[#10243a] lg:text-6xl xl:text-7xl">Des histoires qui<br />éveillent l’imagination</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#3d4b55] sm:text-xl lg:mt-9 lg:text-2xl lg:leading-9">Découvrez des histoires merveilleuses<br className="hidden sm:block" /> à lire partout et à tout moment.</p>
            <Link 
              href="/biblioteque" 
              className="mt-8 inline-flex rounded-xl bg-[#0d2338] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#0d2338]/20 transition hover:-translate-y-0.5 hover:bg-[#173a59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d2338] lg:mt-10 lg:px-9 lg:py-5 lg:text-lg"
            >
              Commencer à lire
            </Link>
          </div>
        </div>
      </section>

      <HomeCategoriesSection categories={databaseCategories} />

      <section className="bg-transparent py-12 sm:py-16" aria-labelledby="popular-stories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="popular-stories-title" className="text-2xl font-bold tracking-tight text-[#10243a]">Histoires populaires</h2>
            <Link href="/biblioteque" className="text-sm font-semibold text-[#315e78] transition hover:text-[#0d2338]">Voir toutes</Link>
          </div>
          {databaseStories.length === 0 ? (
            <p className="rounded-2xl bg-white px-6 py-10 text-center text-[#52616b] shadow-sm">
              Aucune histoire publiée pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {databaseStories.map((story) => (
                <StoryCard key={story.slug} title={story.title} href={`/biblioteque/${story.slug}`} imageSrc={story.cover_url} imageAlt={`Illustration de ${story.title}`} min={story.reading_time_minutes} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
