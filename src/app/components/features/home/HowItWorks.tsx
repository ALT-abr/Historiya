const steps= [
    {
        number: 1,
        title: "Entre ton email",
        description: "Un seul champ, aucune inscription compliquée. Ton compte se crée en un instant.",
    },
    {
        number: 2,
        title: "Choisis une humeur",
        description: "Aventure, magie, amitié ou animaux : pioche l’histoire qui te fait sourire aujourd’hui."
    },
    {
        number: 3,
        title: "Lis ou écoute",
        description: "Chaque conte se lit seul ou en famille, avec une version audio pour fermer les yeux.",
    },
];

export default function HowItWorks() {
    return(
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#37276f] sm:text-4xl">
                        Comment ça marche
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#443773]">
                        Trois petits pas pour commencer à rêver, aucun mot de passe à retenir.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step) => (
                        <article 
                          key={step.number}
                          className=" flex min-h-325px flex-col items-center rounded-[30px] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(55,39,111,0.18)]">
                            <div className="flex size-16 items-center justify-center rounded-full bg-[#59edbd] text-2xl text-[#37276f]">
                                {step.number}
                            </div>
                            <h3 className="mt-8 text-2xl font-semibold text-[#37276f]">
                                {step.title}
                            </h3>
                            <p className="mt-7 max-w-sm text-lg leading-8 text-[#443773]">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}