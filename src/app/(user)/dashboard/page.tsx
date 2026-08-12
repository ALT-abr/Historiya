import CategoryCard from "@/app/components/ui/CategoryCard"
import CollectionCard from "@/app/components/features/collections/CollectionCard"
import StoryCard from "@/app/components/features/stories/StoryCard"

export default function DashboardPage() {
    return(
        <main className="mx-auto w-full max-w-7xl px-6 py-12">
            <section>
                <h1 className="text-4xl font-semibold">
                    Bounjour Sarah!👋
                </h1>
                <p> Préte pour une nouvelle histoire aujourd hui ? </p>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold">
                    Categories
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-9">
                    <CategoryCard 
                        variant="user"
                        title="advanture"
                        imageSrc="/images/categories/advanture.png"
                        imageAlt="Universe d'aventure"
                        href="/histoires?univers=advanture"/>
                    <CategoryCard 
                        variant="user"
                        title="bedtime"
                        imageSrc="/images/categories/bedtime.png"
                        imageAlt="Universe de bedtime stories"
                        href="/histoires?univers=bedtime"/>
                    <CategoryCard 
                        variant="user"
                        title="magie"
                        imageSrc="/images/categories/magie.png"
                        imageAlt="Universe de magie"
                        href="/histoires?univers=magie"/>
                    <CategoryCard 
                        variant="user"
                        title="amitie"
                        imageSrc="/images/categories/amitie.png"
                        imageAlt="Universe d'amitie"
                        href="/histoires?univers=amitie"/>
                    <CategoryCard 
                        variant="user"
                        title="fantastique"
                        imageSrc="/images/categories/fantasy.png"
                        imageAlt="Universe de fantasy"
                        href="/histoires?univers=fantasy"/>
                    <CategoryCard 
                        variant="user"
                        title="animaux"
                        imageSrc="/images/categories/animaux.png"
                        imageAlt="Universe d'animaux"
                        href="/histoires?univers=animaux"/>
                    <CategoryCard 
                        variant="user"
                        title="legende"
                        imageSrc="/images/categories/legende.png"
                        imageAlt="Universe de legendes"
                        href="/histoires?univers=legende"/>
                    <CategoryCard 
                        variant="user"
                        title="educatif"
                        imageSrc="/images/categories/educatif.png"
                        imageAlt="Universe d'education"
                        href="/histoires?univers=educatif"/>
                    <CategoryCard 
                        variant="user"
                        title="culture"
                        imageSrc="/images/categories/culture.png"
                        imageAlt="Universe de culture"
                        href="/histoires?univers=culture"/>
                </div>
            </section>
            
            <section className="mt-12">
                <h2 className="text-2xl font-semibold">
                    Reprendre la lecteur
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                    <StoryCard 
                    title="L’Île aux Étoiles"
                    imageSrc="/images/stories/herisson.png"
                    imageAlt="Un hérisson tenant une pancarte Bonjour"
                    href="/histoires/herisson-bonjour"
                    />
                    <StoryCard 
                    title="L’Île aux Étoiles"
                    imageSrc="/images/stories/herisson.png"
                    imageAlt="Un hérisson tenant une pancarte Bonjour"
                    href="/histoires/herisson-bonjour"
                    />
                    <StoryCard 
                    title="L’Île aux Étoiles"
                    imageSrc="/images/stories/herisson.png"
                    imageAlt="Un hérisson tenant une pancarte Bonjour"
                    href="/histoires/herisson-bonjour"
                    />
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold">
                    Collection magique
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                    <CollectionCard 
                        imageSrc="/images/collection/histoires-pour-dormir.png"
                        imageAlt="Colletion des histoires pour dormir"
                        href="/histoires?univers=bedtime"/>
                    <CollectionCard 
                        imageSrc="/images/collection/petites-aventures.png"
                        imageAlt="Colletion petites aventures"
                        href="/histoires?univers=advanturs"/>
                    <CollectionCard 
                        imageSrc="/images/collection/mond-magique.png"
                        imageAlt="Colletion de mond magique"
                        href="/histoires?univers=magie"/>
                </div>
            </section>
        </main>
    )
}
