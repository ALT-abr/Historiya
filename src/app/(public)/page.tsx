import Hero from "../components/features/home/Hero";
import HowItWorks from "../components/features/home/HowItWorks";
import Categories from "../components/features/home/Categories";
import TopStoriesSection from "../components/features/home/TopStoriesSection";
import CTA from "../components/features/home/CTA";
import CategoryCard from "../components/ui/CategoryCard";

export default function Home() {
  return (
    /**<main>
      <Hero />
      <HowItWorks />
      <Categories />
      <TopStoriesSection />
      <CTA />
    </main>**/
    <main>
      <CategoryCard 
        variant="user"
        title="Bedtime Stories"
        imageSrc="/images/categories/bedtime.png"
        imageAlt="Un ourson endormi sous la lune"
        href="/histoires?univers=histoires-du-soir"
      />
    </main>
  );
}