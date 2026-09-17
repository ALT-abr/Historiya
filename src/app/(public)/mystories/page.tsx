import ComingSoonCard from "@/components/ComingSoonCard";
import LibraryBackground from "@/components/LibraryBackground";

export default function MyStoriesPage() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5.5rem)] bg-[#f7f4eb] px-5 pb-20 pt-10 sm:px-8 lg:px-[60px] lg:pb-[132px] lg:pt-[67px]">
      <LibraryBackground />

      <ComingSoonCard
        icon={
          <svg viewBox="0 0 58 58" className="size-full" fill="currentColor" focusable="false">
            <path d="M29 0C23 17 17 23 0 29C17 35 23 41 29 58C35 41 41 35 58 29C41 23 35 17 29 0Z" />
          </svg>
        }
        title="Votre imagination, notre plume"
        description="Le générateur d’histoires arrive bientôt."
      />
    </section>
  );
}
