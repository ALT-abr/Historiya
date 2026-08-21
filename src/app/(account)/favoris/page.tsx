import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountStoryRow from "@/components/account/AccountStoryRow";
import AccountTabs from "@/components/account/AccountTabs";
import { createClient } from "@/lib/supabase/server";

type FavoriteStory = {
  title: string;
  slug: string;
  cover_url: string;
};

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = user
    ? await supabase
        .from("favorites")
        .select("created_at, stories!inner(title, slug, cover_url)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: null, error: null };

  const favorites = (data ?? []).flatMap((favorite) => {
    const relation = favorite.stories as FavoriteStory | FavoriteStory[] | null;
    const story = Array.isArray(relation) ? relation[0] : relation;
    return story ? [{ ...story, addedAt: favorite.created_at }] : [];
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
          Mes favoris <span aria-hidden="true">⭐</span>
        </h1>
        <AccountTabs activeTab="favoris" />

        {error ? (
          <p role="alert" className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 font-semibold text-rose-700">
            Impossible de charger vos favoris pour le moment.
          </p>
        ) : favorites.length === 0 ? (
          <AccountEmptyState
            imageSrc="/account/empty-favorites.png"
            imageAlt="Un cœur violet souriant entouré de petites étoiles"
            title="Aucune histoire dans vos favoris"
            description="Vous n’avez pas encore ajouté d’histoires à vos favoris. Ajoutez vos histoires préférées pour les retrouver facilement ici."
            buttonLabel="Explorer des histoires"
          />
        ) : (
          <div className="mt-6 space-y-3">
            {favorites.map((favorite) => (
              <AccountStoryRow
                key={favorite.slug}
                title={favorite.title}
                slug={favorite.slug}
                imageSrc={favorite.cover_url}
                addedAt={dateFormatter.format(new Date(favorite.addedAt))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
