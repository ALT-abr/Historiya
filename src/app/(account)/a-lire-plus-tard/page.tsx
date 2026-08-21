import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountStoryRow from "@/components/account/AccountStoryRow";
import AccountTabs from "@/components/account/AccountTabs";
import { createClient } from "@/lib/supabase/server";

type SavedStory = {
  title: string;
  slug: string;
  cover_url: string;
};

export default async function ReadLaterPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = user
    ? await supabase
        .from("read_later")
        .select("saved_at, stories!inner(title, slug, cover_url)")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false })
    : { data: null, error: null };

  const savedStories = (data ?? []).flatMap((savedItem) => {
    const relation = savedItem.stories as SavedStory | SavedStory[] | null;
    const story = Array.isArray(relation) ? relation[0] : relation;
    return story ? [{ ...story, savedAt: savedItem.saved_at }] : [];
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
          À lire plus tard <span aria-hidden="true">⭐</span>
        </h1>
        <AccountTabs activeTab="a-lire-plus-tard" />

        {error ? (
          <p role="alert" className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 font-semibold text-rose-700">
            Impossible de charger votre liste pour le moment.
          </p>
        ) : savedStories.length === 0 ? (
          <AccountEmptyState
            imageSrc="/account/empty-read-later.png"
            imageAlt="Un sablier violet rempli de sable doré"
            title="Votre liste est vide"
            description="Vous n’avez pas encore ajouté d’histoires à lire plus tard. Enregistrez une histoire pour la lire quand vous aurez le temps."
            buttonLabel="Explorer des histoires"
          />
        ) : (
          <div className="mt-6 space-y-3">
            {savedStories.map((story) => (
              <AccountStoryRow
                key={story.slug}
                title={story.title}
                slug={story.slug}
                imageSrc={story.cover_url}
                addedAt={dateFormatter.format(new Date(story.savedAt))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
