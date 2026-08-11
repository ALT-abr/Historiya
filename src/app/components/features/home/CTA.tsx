export default function CTA() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[48px] bg-[#a85ce6] px-6 py-14 text-center text-white shadow-[0_22px_45px_rgba(55,39,111,0.28)] sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Rejoins Historiya en 10 secondes
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/85 sm:text-xl">
          Juste ton email, rien d’autre. Tes histoires préférées t’attendront à
          chaque visite.
        </p>

        <form
          action="/inscription"
          method="get"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row"
        >
          <label htmlFor="cta-email" className="sr-only">
            Ton adresse email
          </label>
          <input
            id="cta-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ton-email@exemple.com"
            className="min-w-0 flex-1 rounded-full bg-white px-8 py-5 text-lg text-[#37276f] outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-white/35"
          />
          <button
            type="submit"
            className="rounded-full bg-[#ffa45f] px-10 py-5 text-lg font-bold text-white transition hover:bg-[#ff9147] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Commencer
          </button>
        </form>

        <p className="mt-7 text-base text-white/80 sm:text-lg">
          Sans mot de passe. Sans publicité. Annulable à tout moment.
        </p>
      </div>
    </section>
  );
}
