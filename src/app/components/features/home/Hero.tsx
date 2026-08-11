import Link from "next/link";

export default function Hero() {
    return(
        <section className="bg-white px-6 py-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col items-start">
                    <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#37276f] sm:text-5xl lg:text-6xl">
                        Des histoires qui {""}
                        <span className="text-[#ed704d]">allument des étoiles {""}</span>
                        dans les yeux des enfants
                    </h1>
                    <p className="mt-8 max-w-xl text-lg leading-8 text-[#443773]">
                       Historiya rassemble des contes doux, drôles et pleins de
                       surprises, à lire ou à écouter en famille. Pas de mot de passe
                       compliqué : juste ton email pour retrouver tes histoires
                       préférées. 
                    </p>
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link href="/histoires" className="rounded-full bg-[#ff955c] px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-[#ed704d]">
                            Voir les histoires
                        </Link>
                        <Link href="/inscription" className="rounded-full border-2 border-[#443773] bg-white px-8 py-4 text-center text-lg font-bold text-[#443773] transition hover:bg-[#f4f1ff]">
                            Créer un compte gratuit
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                    
                </div>
            </div>
        </section>
    )
}