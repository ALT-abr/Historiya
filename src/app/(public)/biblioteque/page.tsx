import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import StoryCard from "@/components/StoryCard";
import { createClient } from "@/lib/supabase/server";

const STORIES_PER_PAGE = 10;

type StoriesPageProps = {
  searchParams: Promise<{
    recherche?: string | string[];
    categorie?: string | string[];
    page?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const search = firstValue(params.recherche)?.trim() ?? "";
  const category = firstValue(params.categorie) ?? "";
  const requestedPage = Number(firstValue(params.page) ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const start = (currentPage - 1) * STORIES_PER_PAGE;
  const end = start + STORIES_PER_PAGE - 1;

  const supabase = await createClient();
  const categoriesResult = await supabase
    .from("categories")
    .select("id, category_name, slug")
    .order("category_name", { ascending: true });

  if (categoriesResult.error) throw new Error(`Impossible de charger les catégories : ${categoriesResult.error.message}`);

  const categories = categoriesResult.data ?? [];
  let categoryStoryIds: string[] | null = null;

  if (category) {
    const selectedCategory = categories.find((item) => item.slug === category);
    if (selectedCategory) {
      const { data: relations, error: relationsError } = await supabase
        .from("story_categories")
        .select("story_id")
        .eq("category_id", selectedCategory.id);

      if (relationsError) throw new Error(`Impossible de filtrer les histoires : ${relationsError.message}`);
      categoryStoryIds = (relations ?? []).map((relation) => relation.story_id);
    } else {
      categoryStoryIds = [];
    }
  }

  let storiesQuery = supabase
    .from("stories")
    .select("title, slug, cover_url, reading_time_minutes", { count: "exact" })
    .eq("is_published", true);

  if (search) storiesQuery = storiesQuery.ilike("title", `%${search}%`);
  if (categoryStoryIds) {
    storiesQuery = categoryStoryIds.length > 0
      ? storiesQuery.in("id", categoryStoryIds)
      : storiesQuery.eq("id", "00000000-0000-0000-0000-000000000000");
  }

  storiesQuery = storiesQuery
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(start, end);

  const storiesResult = await storiesQuery;
  if (storiesResult.error) throw new Error(`Impossible de charger les histoires : ${storiesResult.error.message}`);

  const stories = storiesResult.data ?? [];
  const totalPages = Math.max(1, Math.ceil((storiesResult.count ?? 0) / STORIES_PER_PAGE));

  function pageHref(page: number) {
    const query = new URLSearchParams();
    if (search) query.set("recherche", search);
    if (category) query.set("categorie", category);
    query.set("page", String(page));
    return `/biblioteque?${query.toString()}`;
  }

  return (
    <section className="min-h-screen bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#678091]">Notre bibliothèque</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#10243a] sm:text-5xl">Toutes les histoires</h1>
          <p className="mt-3 max-w-2xl text-[#5d6a74]">Trouvez la prochaine histoire qui fera voyager votre imagination.</p>
        </div>

        <form action="/biblioteque" method="get" className="mt-8 flex items-center gap-2 sm:gap-3">
          <div className="relative min-w-0 flex-1">
            <FiSearch aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <label htmlFor="story-search" className="sr-only">Rechercher une histoire</label>
            <input
              id="story-search"
              name="recherche"
              type="search"
              defaultValue={search}
              placeholder="Rechercher une histoire..."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-[#10243a] outline-none focus:border-[#315e78]"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div>
              <label htmlFor="story-category" className="sr-only">Catégorie</label>
              <select id="story-category" name="categorie" defaultValue={category} className="h-11 w-24 rounded-lg border border-slate-300 bg-white px-2 text-sm text-[#10243a] outline-none focus:border-[#315e78] sm:w-40 sm:px-4">
                <option value="">Toutes</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.category_name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="h-11 rounded-lg bg-[#10243a] px-3 text-xs font-semibold text-white transition hover:bg-[#1c3b58] sm:px-5 sm:text-sm">Rechercher</button>
          </div>
        </form>

        {stories.length === 0 ? (
          <div className="mt-9 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
            <p className="font-semibold text-[#10243a]">Aucune histoire ne correspond à votre recherche.</p>
            <Link href="/biblioteque" className="mt-3 inline-block text-sm font-semibold text-violet-700 hover:underline">Voir toutes les histoires</Link>
          </div>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {stories.map((story) => (
              <StoryCard
                key={story.slug}
                title={story.title}
                href={`/biblioteque/${story.slug}`}
                imageSrc={story.cover_url}
                imageAlt={`Illustration de ${story.title}`}
                min={story.reading_time_minutes}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={pageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`grid size-10 place-items-center rounded-lg text-sm font-semibold ${page === currentPage ? "bg-[#10243a] text-white" : "border border-slate-300 bg-white text-[#10243a] hover:border-[#10243a]"}`}
              >
                {page}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
