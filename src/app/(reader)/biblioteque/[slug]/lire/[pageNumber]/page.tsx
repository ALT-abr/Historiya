import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import ReadingHistoryTracker from "@/components/ReadingHistoryTracker";
import { createClient } from "@/lib/supabase/server";

type ReaderPageProps = {
  params: Promise<{ slug: string; pageNumber: string }>;
};

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, pageNumber: pageNumberParam } = await params;
  const pageNumber = Number(pageNumberParam);

  if (!Number.isInteger(pageNumber) || pageNumber < 0) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: story, error: storyError } = await supabase
    .from("stories")
    .select("id, title, slug")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (storyError) throw new Error(`Impossible de charger l’histoire : ${storyError.message}`);
  if (!story) notFound();

  const [storyPageResult, pageNumbersResult] = await Promise.all([
    supabase.from("story_pages").select("page_number, content, image_url").eq("story_id", story.id).eq("page_number", pageNumber).maybeSingle(),
    supabase.from("story_pages").select("page_number").eq("story_id", story.id).order("page_number", { ascending: true }),
  ]);

  if (storyPageResult.error) throw new Error(`Impossible de charger cette page : ${storyPageResult.error.message}`);
  if (pageNumbersResult.error) throw new Error(`Impossible de charger la navigation : ${pageNumbersResult.error.message}`);
  if (!storyPageResult.data) notFound();

  const storyPage = storyPageResult.data;
  const pageNumbers = (pageNumbersResult.data ?? []).map((item) => item.page_number);
  const currentIndex = pageNumbers.indexOf(pageNumber);
  if (currentIndex === -1) notFound();

  const previousPage = pageNumbers[currentIndex - 1];
  const nextPage = pageNumbers[currentIndex + 1];
  const totalPages = pageNumbers.length;
  const currentPosition = currentIndex + 1;
  const progress = (currentPosition / totalPages) * 100;
  const contentLength = storyPage.content.length;
  const isLongPage = contentLength > 850;
  const isMediumPage = contentLength > 500;
  const contentSizeClass = isLongPage
    ? "lg:text-[clamp(0.78rem,0.85vw,0.95rem)] lg:leading-[1.35]"
    : isMediumPage
      ? "lg:text-[clamp(0.9rem,1vw,1.08rem)] lg:leading-[1.45]"
      : "lg:text-[clamp(1rem,1.2vw,1.25rem)] lg:leading-[1.55]";
  const contentPositionClass = isLongPage ? "lg:my-0 lg:py-2" : "lg:my-auto lg:py-3";

  return (
    <main className="min-h-dvh bg-[#fffcf8] text-[#111f55] lg:h-dvh lg:overflow-hidden">
      <ReadingHistoryTracker userId={user?.id ?? null} storyId={story.id} pageNumber={storyPage.page_number} />
      <div className="mx-auto flex min-h-dvh max-w-[1600px] flex-col px-4 py-4 sm:px-7 lg:h-dvh lg:min-h-0 lg:px-8 lg:py-4">
        <Link href={`/biblioteque/${story.slug}`} className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-[#17245c] shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 hover:text-violet-700 lg:mb-3">
          <FiArrowLeft aria-hidden="true" /> Retour à l’histoire
        </Link>

        <div className="grid flex-1 items-stretch gap-7 lg:min-h-0 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-9 xl:gap-12">
          <section className="relative min-h-[44svh] overflow-hidden rounded-[1.75rem] bg-violet-100 shadow-[0_20px_60px_rgba(48,35,92,0.12)] sm:min-h-[55svh] lg:min-h-0">
            <Image src={storyPage.image_url} alt={`Illustration de ${story.title}, page ${storyPage.page_number}`} fill priority sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover" />
          </section>

          <article className="flex min-h-0 flex-col px-1 py-1 sm:px-3 lg:py-2">
            <header className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-lg text-amber-500"><FiStar aria-hidden="true" fill="currentColor" /></span>
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl lg:text-[1.65rem]">{story.title}</h1>
            </header>

            <div className={`my-auto py-7 sm:py-9 lg:min-h-0 lg:overflow-hidden ${contentPositionClass}`}>
              <p className={`whitespace-pre-line [font-family:Georgia,'Times_New_Roman',serif] text-lg leading-[1.65] text-[#182858] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-violet-600 sm:text-xl ${contentSizeClass}`}>
                {storyPage.content}
              </p>
            </div>
          </article>
        </div>

        <nav aria-label="Navigation entre les pages" className="mt-5 shrink-0 border-t border-[#e8e2dc] pt-3 lg:mt-3 lg:pt-2">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
            {previousPage !== undefined ? (
              <Link href={`/biblioteque/${story.slug}/lire/${previousPage}`} className="group inline-flex items-center gap-3 font-bold text-[#16245e] transition hover:text-violet-700">
                <span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-xl text-violet-600 transition group-hover:bg-violet-100 sm:size-11"><FiChevronLeft aria-hidden="true" /></span><span className="hidden sm:inline">Précédent</span>
              </Link>
            ) : (
              <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-3 font-bold text-slate-300"><span className="grid size-10 place-items-center rounded-xl bg-slate-100 text-xl sm:size-11"><FiChevronLeft aria-hidden="true" /></span><span className="hidden sm:inline">Précédent</span></span>
            )}

            <div className="mx-auto w-full max-w-xl text-center">
              <p className="mb-1.5 text-sm font-extrabold leading-none text-violet-600">{currentPosition} / {totalPages}</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e9e5e2]">
                <div className="h-full rounded-full bg-violet-600" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {nextPage !== undefined ? (
              <Link href={`/biblioteque/${story.slug}/lire/${nextPage}`} className="group inline-flex items-center justify-end gap-3 font-bold text-[#16245e] transition hover:text-violet-700">
                <span className="hidden sm:inline">Suivant</span><span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-xl text-violet-600 transition group-hover:bg-violet-100 sm:size-11"><FiChevronRight aria-hidden="true" /></span>
              </Link>
            ) : (
              <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center justify-end gap-3 font-bold text-slate-300"><span className="hidden sm:inline">Suivant</span><span className="grid size-10 place-items-center rounded-xl bg-slate-100 text-xl sm:size-11"><FiChevronRight aria-hidden="true" /></span></span>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
