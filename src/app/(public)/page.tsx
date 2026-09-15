import Link from "next/link";
import HomeCategoriesSection from "@/components/HomeCategoriesSection";
import StoryCard from "@/components/StoryCard";
import { createClient } from "@/lib/supabase/server";

const STORY_INITIALS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ..."0123456789"];

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
      <div className="px-5 pb-10 pt-5 sm:px-8 lg:px-10">
      <section className="relative isolate mx-auto max-w-[1800px] overflow-hidden rounded-[32px] border border-[#10243a]/10 bg-[#0b172e] shadow-sm sm:rounded-[48px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {[
            [8, 12], [24, 8], [42, 17], [59, 9], [76, 14], [92, 8],
            [54, 38], [88, 37], [96, 57], [7, 79], [31, 90], [56, 81],
            [74, 91], [91, 83], [16, 26], [35, 6], [67, 29], [82, 5],
            [4, 49], [47, 65], [63, 62], [84, 71], [19, 94], [96, 25],
          ].map(([left, top], index) => (
            <span
              key={`${left}-${top}`}
              className={`hero-star absolute rounded-full ${index % 4 === 0 ? "bg-[#ffe19a] shadow-[0_0_7px_1px_#ffd36b45]" : "bg-[#e3edff] shadow-[0_0_6px_1px_#d4e4ff30]"}`}
              style={{
                left: `${left}%`, top: `${top}%`,
                width: index % 3 === 0 ? 3 : 2,
                height: index % 3 === 0 ? 3 : 2,
                animationDuration: `${4 + index % 5}s`,
                animationDelay: `${-index * 0.7}s`,
              }}
            />
          ))}
        </div>
        <div className="mx-auto flex max-w-non flex-col items-start gap-12 px-5 py-5 sm:px-8 sm:py-12 lg:min-h-[550px] lg:flex-row lg:items-center lg:gap-10 lg:px-20 lg:py-12">
          <div className="min-w-0 lg:w-[60%]">
            <h1 className="max-w-[56rem] [font-family:var(--font-nunito),Arial,sans-serif] text-[clamp(2.75rem,11vw,4rem)] font-black leading-[1.08] tracking-[-0.05em] text-[#f5f7fb] lg:text-6xl xl:text-7xl">Et si votre prochaine aventure commençait ici ?</h1>
            <p className="mt-5 max-w-xl text-lg leading-7 text-[#cbd5e1] lg:mt-6 lg:text-xl lg:leading-8">Des récits courts ou merveilleux à lire librement, selon votre humeur et le temps que vous avez.</p>
            <Link 
              href="/biblioteque" 
              className="mt-6 inline-flex rounded-full bg-[#D4A72C] px-6 py-3 text-base font-bold text-[#111827] shadow-lg shadow-[#0d2338]/20 transition hover:-translate-y-0.5 hover:bg-[#E0B63F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d2338] lg:mt-7 lg:px-7 lg:py-3 lg:text-lg"
            >
              Explorer les histoires
            </Link>
          </div>
          <div className="relative mx-auto h-[340px] w-full max-w-[420px] shrink-0 sm:h-[400px] lg:ml-auto lg:w-[38%]">
            {databaseStories.slice(0, 2).map((story, index) => (
              <Link
                key={story.slug}
                href={`/biblioteque/${story.slug}`}
                className={`absolute flex h-[260px] w-[57%] flex-col rounded-l-[12px] rounded-r-[30px] border border-[#10243a]/15 p-5 shadow-xl transition hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10243a] sm:h-[310px] sm:p-6 ${index === 0 ? "left-[5%] top-4 -rotate-9 bg-[#f7f8ff] text-[#10243a]" : "right-[3%] top-16 rotate-9 bg-[#0d2338] text-white"}`}
              >
                <span className="[font-family:var(--font-lora),Georgia,serif] text-xl font-bold leading-tight sm:text-2xl">{story.title}</span>
                <span className="mt-auto pt-5 text-sm opacity-80">{story.reading_time_minutes} min de lecture</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </div>

      <HomeCategoriesSection categories={databaseCategories} />

      <section className="bg-transparent py-12 sm:py-16" aria-labelledby="popular-stories-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-7">
            <h2 id="popular-stories-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243a]">Histoires à découvrir</h2>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-[#52616b]">Une sélection pour commencer votre voyage</p>
              <Link href="/biblioteque" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#10243a] hover:underline">
                Découvrir plus <span aria-hidden="true">➺</span>
              </Link>
            </div>
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

      <section
        className="py-14 sm:py-16"
        aria-labelledby="alphabetical-index-title"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#678091]">
              Explorer la bibliothèque
            </p>
            <h2
              id="alphabetical-index-title"
              className="mt-2 text-3xl font-black tracking-tight text-[#10243a] sm:text-4xl"
            >
              Histoires de A à Z
            </h2>
            <p className="mt-3 text-[#5d6a74]">
              Choisissez une lettre ou un chiffre pour découvrir les histoires dont le titre commence ainsi.
            </p>
          </div>

          <nav aria-label="Histoires classées par lettre ou chiffre" className="mx-auto mt-8 max-w-4xl">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {STORY_INITIALS.map((initial) => (
                <li
                  key={initial}
                  className="w-[calc(16.6667%_-_0.4167rem)] sm:w-[calc(11.1111%_-_0.6667rem)] lg:w-[calc(5.5556%_-_0.7083rem)]"
                >
                  <Link
                    href={{ pathname: "/biblioteque", query: { initiale: initial } }}
                    aria-label={`Voir les histoires commençant par ${initial}`}
                    className="grid aspect-square place-items-center rounded-lg border border-[#10243a]/15 bg-white text-sm font-black text-[#10243a] shadow-sm transition hover:-translate-y-0.5 hover:border-[#f3eee6] hover:bg-[#315e78] hover:text-[#F2C94C] hover:shadow-[0_0_10px_rgba(242,201,76,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10243a] sm:text-base"
                  >
                    {initial}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
