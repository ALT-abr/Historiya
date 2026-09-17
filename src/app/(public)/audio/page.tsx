import ComingSoonCard from "@/components/ComingSoonCard";
import LibraryBackground from "@/components/LibraryBackground";

export default function AudioPage() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5.5rem)] bg-[#f7f4eb] px-5 pb-20 pt-10 sm:px-8 lg:px-[60px] lg:pb-[132px] lg:pt-[67px]">
      <LibraryBackground />

      <ComingSoonCard
        title="Les histoires vont prendre voix"
        description="Historiya Audio est en préparation. Revenez bientôt pour écouter vos récits préférés."
      />
    </section>
  );
}
