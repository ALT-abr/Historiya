import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountTabs from "@/components/account/AccountTabs";

export default function FavoritesPage() {
  return (
    <div className="min-h-[70vh] bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101e58] sm:text-4xl">
          Mes favoris <span aria-hidden="true">{"\u2B50"}</span>
        </h1>
        <AccountTabs activeTab="favoris" />
        <AccountEmptyState
          imageSrc="/account/empty-favorites.png"
          imageAlt="Un cœur violet souriant entouré de petites étoiles"
          title="Aucune histoire dans vos favoris"
          description="Vous n’avez pas encore ajouté d’histoires à vos favoris. Ajoutez vos histoires préférées pour les retrouver facilement ici."
          buttonLabel="Explorer des histoires"
        />
      </div>
    </div>
  );
}
