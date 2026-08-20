import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountTabs from "@/components/account/AccountTabs";

export default function ReadLaterPage() {
  return (
    <div className="min-h-[70vh] bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101e58] sm:text-4xl">
          Mes histoires <span aria-hidden="true">{"\u2B50"}</span>
        </h1>
        <AccountTabs activeTab="a-lire-plus-tard" />
        <AccountEmptyState
          imageSrc="/account/empty-read-later.png"
          imageAlt="Un sablier violet rempli de sable doré souriant"
          title="Votre liste est vide"
          description="Vous n’avez pas encore ajouté d’histoires à lire plus tard. Enregistrez une histoire pour la lire quand vous aurez le temps."
          buttonLabel="Explorer des histoires"
        />
      </div>
    </div>
  );
}
