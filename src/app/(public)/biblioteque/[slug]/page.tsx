import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiBookOpen, FiBookmark, FiClock, FiHeadphones, FiHeart } from "react-icons/fi";
import StoryCard from "@/components/StoryCard";
import { createClient } from "@/lib/supabase/server";

type StoryDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

type CategoryRelation = { category_name: string; slug: string };
type StoryCategoryRelation = { categories: CategoryRelation | CategoryRelation[] | null };

export default async function StoryDetailsPage({ params }: StoryDetailsPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select(`
      id,
      title,
      slug,
      description,
      cover_url,
      author_name,
      reading_time_minutes,
      story_categories (categories (category_name, slug))
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (storyError) throw new Error(`Impossible de charger l’histoire : ${storyError.message}`);
  if (!story) notFound();

  const [firstPageResult, similarStoriesResult] = await Promise.all([
    supabase
      .from("story_pages")
      .select("page_number")
      .eq("story_id", story.id)
      .order("page_number", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("stories")
      .select("title, slug, cover_url, reading_time_minutes")
      .eq("is_published", true)
      .neq("id", story.id)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  if (firstPageResult.error) throw new Error(`Impossible de trouver la première page : ${firstPageResult.error.message}`);
  if (similarStoriesResult.error) throw new Error(`Impossible de charger les histoires similaires : ${similarStoriesResult.error.message}`);

  const categories = (story.story_categories as StoryCategoryRelation[] | null ?? []).flatMap((relation) => {
    const category = relation.categories;
    return category ? (Array.isArray(category) ? category : [category]) : [];
  });
  const firstPageNumber = firstPageResult.data?.page_number;
  const similarStories = similarStoriesResult.data ?? [];

  return (
    <main className="bg-[#fffdf8]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/biblioteque" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#526572] transition hover:text-[#10243a]">
          <FiArrowLeft aria-hidden="true" /> Retour à la bibliothèque
        </Link>

        <div className="grid items-center gap-8 md:grid-cols-[minmax(260px,380px)_1fr] lg:gap-14">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
            <Image src={story.cover_url} alt={`Couverture de ${story.title}`} fill preload sizes="(max-width: 768px) 100vw, 380px" className="object-cover" />
          </div>

          <div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#10243a] sm:text-5xl">{story.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <Link key={category.slug} href={`/biblioteque?categorie=${category.slug}`} className="inline-flex rounded-full bg-[#e8f0e7] px-4 py-2 text-sm font-semibold text-[#315845]">
                  {category.category_name}
                </Link>
              ))}
              <span className="flex items-center gap-2 text-sm font-medium text-[#65737c]">
                <FiClock aria-hidden="true" /> {story.reading_time_minutes} min
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#52616b]">{story.description}</p>
            {story.author_name && <p className="mt-3 text-sm font-medium text-[#65737c]">Par {story.author_name}</p>}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {firstPageNumber !== undefined ? (
                <Link href={`/biblioteque/${story.slug}/lire/${firstPageNumber}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10243a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c3b58]">
                  <FiBookOpen aria-hidden="true" className="size-5" /> Commencer l’histoire
                </Link>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-600">
                  <FiBookOpen aria-hidden="true" className="size-5" /> Lecture bientôt disponible
                </span>
              )}

              <Link href={`/audio?story=${story.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ccd3d7] bg-white px-5 py-3 text-sm font-semibold text-[#10243a] transition hover:border-[#10243a]">
                <FiHeadphones aria-hidden="true" className="size-5" /> Audio
              </Link>

              <button type="button" aria-label="Ajouter aux favoris" className="grid size-11 place-items-center rounded-xl border border-[#ccd3d7] bg-white text-[#10243a] transition hover:border-[#d35b67] hover:bg-[#fff1f2] hover:text-[#c23c4b]">
                <FiHeart aria-hidden="true" className="size-5" />
              </button>

              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ccd3d7] bg-white px-5 py-3 text-sm font-semibold text-[#10243a] transition hover:border-[#10243a]">
                <FiBookmark aria-hidden="true" className="size-5" /> Lire plus tard
              </button>
            </div>
          </div>
        </div>
      </section>

      {similarStories.length > 0 && (
        <section className="border-t border-[#e5ded2] bg-[#f5f1e8] py-12" aria-labelledby="similar-stories-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <h2 id="similar-stories-title" className="mb-7 text-2xl font-bold tracking-tight text-[#10243a]">Histoires similaires</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {similarStories.map((item) => (
                <StoryCard key={item.slug} title={item.title} href={`/biblioteque/${item.slug}`} imageSrc={item.cover_url} imageAlt={`Illustration de ${item.title}`} min={item.reading_time_minutes} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
