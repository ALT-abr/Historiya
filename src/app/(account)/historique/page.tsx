import AccountEmptyState from "@/components/account/AccountEmptyState";
import AccountTabs from "@/components/account/AccountTabs";

export default function ReadingHistoryPage() {
  return (
    <div className="min-h-[70vh] bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101e58] sm:text-4xl">
          Historique de lecture <span aria-hidden="true">{"\u2B50"}</span>
        </h1>
        <AccountTabs activeTab="historique" />
        <AccountEmptyState
          imageSrc="/account/empty-history.png"
          imageAlt="Un livre violet endormi accompagné d’une petite étoile"
          title="Votre historique est vide"
          description="Vous n’avez pas encore consulté d’histoires. Commencez à lire pour retrouver ici l’historique de vos lectures."
          buttonLabel="Découvrir des histoires"
        />
      </div>
    </div>
  );
}
