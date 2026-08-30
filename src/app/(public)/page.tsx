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
      <section className="relative isolate -mt-[88px] min-h-[488px] overflow-hidden pt-[88px]">
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#10243a] sm:text-5xl lg:text-6xl">Des histoires qui<br />éveillent l’imagination</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#3d4b55] sm:text-xl">Découvrez des histoires merveilleuses<br className="hidden sm:block" /> à lire partout et à tout moment.</p>
            <Link 
              href="/biblioteque" 
              className="mt-9 inline-flex rounded-xl bg-[#0d2338] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#0d2338]/15 transition hover:-translate-y-0.5 hover:bg-[#173a59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d2338]"
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
