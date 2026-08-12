import CategoryCard from "@/app/components/ui/CategoryCard"

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
                    Reorendre la lecteur
                </h2>
                <div>

                </div>
            </section>
        </main>
    )
}
