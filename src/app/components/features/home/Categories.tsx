import CategoryCard from "../../ui/CategoryCard";

export default function Categories() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#37276f] sm:text-4xl">
            Choisis ton univers du jour
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-lg text-[#443773]">
            Chaque humeur a sa couleur, pour trouver l’histoire qui correspond à
            l’envie du moment.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <CategoryCard 
            title = "Aventure"
            imageSrc = "/images/universes/aventure.png"
            imageAlt = "Universe d'aventure"
            href = "/histoires?univers=aventure"
            variant="public"
          />
          <CategoryCard 
            title = "Amitié"
            imageSrc = "/images/universes/amitie.png"
            imageAlt = "Universe d'amitie"
            href = "/histoires?univers=amitie"
            variant="public"
          />
          <CategoryCard 
            title = "Histoires du soir"
            imageSrc = "/images/universes/bedtime.png"
            imageAlt = "Universe de bedtime"
            href = "/histoires?univers=bedtime"
            variant="public"
          />
          <CategoryCard 
            title = "Animaux"
            imageSrc = "/images/universes/animaux.png"
            imageAlt = "Universe de animaux"
            href = "/histoires?univers=animaux"
            variant="public"
          />
          <CategoryCard 
            title = "Magie"
            imageSrc = "/images/universes/magie.png"
            imageAlt = "Universe de magie"
            href = "/histoires?univers=magie"
            variant="public"

          />
        </div>
      </div>
    </section>
  );
}