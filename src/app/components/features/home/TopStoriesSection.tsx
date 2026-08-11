import Link from "next/link"
import Image from "next/image"

const stories= [
    {
        id: 1,
        slug: "dragon-peur-du-noir",
        title: "Le dragon qui avait peur du noir",
        description:
          "Un petit dragon découvre que la nuit cache aussi de belles surprises.",
        age: "4 - 7 ans",
        category: "Aventure",
        image: "/images/stories/dragon.png",
    },
    {
        id: 2,
        slug: "herisson-bonjour",
        title: "Le hérisson qui n’osait pas dire bonjour",
        description:
          "Une histoire douce sur la timidité et la joie de se faire un ami.",
        age: "3 - 7 ans",
        category: "Amitié",
        image: "/images/stories/herisson.png",
    },
    {
        id: 3,
        slug: "lampe-calins",
        title: "La lampe qui exauçait les câlins",
        description:
          "Un conte plein de tendresse où chaque câlin allume une étoile.",
        age: "5 - 8 ans",
        category: "Magie",
        image: "/images/stories/lampe.png",
    },
]

export default function TopStoriesSection() {
    return(
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#37276f] sm:text-4xl">
                        Les histoires du moment
                    </h2>
                    <p className="mt-5 text-lg text-[#443773]">
                        Une petite sélection pour donner envie d’ouvrir le livre ce soir.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {stories.map((story) => (
                        <Link
                          key={story.id}
                          href={`/histoires/${story.slug}`}
                          className="
                           group overflow-hidden rounded-[30px] bg-white
                           shadow-[0_18px_40px_rgba(55,39,111,0.2)]
                           transition duration-300
                           hover:-translate-y-2
                           hover:shadow-[0_25px_50px_rgba(55,39,111,0.28)]">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image 
                                  src={story.image}
                                  alt={story.title}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 33vw"
                                  className="object-cover transition duration-500 group-hover:scale-105"/>
                            </div>
                            <div className="flex min-h-[270px] flex-col p-6">
                                <h3 className="text-xl font-bold leading-7 text-[#37276f]">
                                    {story.title}
                                </h3>
                                <p className="mt-4 text-base leading-7 text-[#443773]">
                                    {story.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-8 text-[#443773]">
                                    <span>{story.age}</span>
                                    <span>{story.category}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}