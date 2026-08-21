import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountStoryRow from "@/components/account/AccountStoryRow";
import AccountTabs from "@/components/account/AccountTabs";
import { createClient } from "@/lib/supabase/server";

type HistoryStory = {
  title: string;
  slug: string;
  cover_url: string;
};

export default async function ReadingHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = user
    ? await supabase
        .from("reading_history")
        .select("added_at, last_page_number, stories!inner(title, slug, cover_url)")
        .eq("user_id", user.id)
        .order("added_at", { ascending: false })
    : { data: null, error: null };

  const history = (data ?? []).flatMap((historyItem) => {
    const relation = historyItem.stories as HistoryStory | HistoryStory[] | null;
    const story = Array.isArray(relation) ? relation[0] : relation;
    return story
      ? [{ ...story, addedAt: historyItem.added_at, lastPageNumber: historyItem.last_page_number }]
      : [];
  });

  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-[70vh] bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101e58] sm:text-4xl">
          Historique de lecture <span aria-hidden="true">⭐</span>
        </h1>
        <AccountTabs activeTab="historique" />

        {error ? (
          <p role="alert" className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 font-semibold text-rose-700">
            Impossible de charger votre historique pour le moment.
          </p>
        ) : history.length === 0 ? (
          <AccountEmptyState
            imageSrc="/account/empty-history.png"
            imageAlt="Un livre violet accompagné d’une petite étoile"
            title="Votre historique est vide"
            description="Vous n’avez pas encore consulté d’histoires. Commencez à lire pour retrouver ici l’historique de vos lectures."
            buttonLabel="Découvrir des histoires"
          />
        ) : (
          <div className="mt-6 space-y-3">
            {history.map((historyItem) => (
              <AccountStoryRow
                key={historyItem.slug}
                title={historyItem.title}
                slug={historyItem.slug}
                imageSrc={historyItem.cover_url}
                dateLabel="Ajoutée le"
                addedAt={dateFormatter.format(new Date(historyItem.addedAt))}
                lastPageNumber={historyItem.lastPageNumber}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
