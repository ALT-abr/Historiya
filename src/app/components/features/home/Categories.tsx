import Image from "next/image";
import Link from "next/link";

const universes = [
  {
    name: "Aventure",
    slug: "aventure",
    image: "/images/universes/aventure.png",
  },
  {
    name: "Amitié",
    slug: "amitie",
    image: "/images/universes/amitie.png",
  },
  {
    name: "Histoires du soir",
    slug: "histoires-du-soir",
    image: "/images/universes/bedtime.png",
  },
  {
    name: "Animaux",
    slug: "animaux",
    image: "/images/universes/animaux.png",
  },
  {
    name: "Magie",
    slug: "magie",
    image: "/images/universes/magie.png",
  },
];

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
          {universes.map((universe) => (
            <Link
              key={universe.slug}
              href={`/histoires?univers=${universe.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="relative aspect-4/5 w-full max-w-[220px] overflow-hidden rounded-[30px] bg-[#f4f1ff] shadow-[0_16px_30px_rgba(55,39,111,0.22)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_22px_40px_rgba(55,39,111,0.3)]">
                <Image
                  src={universe.image}
                  alt={`Univers ${universe.name}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-center text-xl font-bold text-[#37276f] sm:text-2xl">
                {universe.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
