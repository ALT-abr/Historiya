import CategoryCard from "./components/ui/CategoryCard";

export default function Home() {
  return (
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
