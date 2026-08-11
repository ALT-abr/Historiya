import Hero from "./components/features/home/Hero";
import HowItWorks from "./components/features/home/HowItWorks";
import Categories from "./components/features/home/Categories";
import TopStoriesSection from "./components/features/home/TopStoriesSection";
import CTA from "./components/features/home/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Categories />
      <TopStoriesSection />
      <CTA />
    </main>
  );
}
