import Image from "next/image";
import { FiHeart, FiMail, FiMessageCircle, FiSend } from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

const inputClass =
  "h-11 w-full rounded-lg border border-[#ded9d0] bg-white px-4 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#4f55b5] focus:ring-4 focus:ring-[#4f55b5]/10";

export default function ContactePage() {
  return (
    <main className="min-h-screen bg-[#fffaf3]">
      <section className="relative isolate min-h-[360px] overflow-hidden">
        <Image
          src="/contact/contact-hero-transparent.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-contain object-right"
        />

        <div className="mx-auto flex min-h-[360px] max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
          <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#18215b] sm:text-5xl">
            On est là pour
            <br />
            <span className="text-[#6266d7]">vous aider !</span>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#46516b]">
            Une question, une suggestion ou un problème ?<br />
            Écrivez-nous, nous vous répondrons aussi vite que possible.
          </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <form className="rounded-2xl border border-[#e7e0d5] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="flex items-center gap-3 text-lg font-bold text-[#18215b]">
            <FiMail aria-hidden="true" className="text-[#6266d7]" />
            Envoyez-nous un message
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-[#202951]">Nom</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Votre nom" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-[#202951]">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Votre email" required className={inputClass} />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-[#202951]">Sujet</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Écrivez le sujet de votre message"
              required
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-[#202951]">Message</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="Décrivez votre message..." required className="w-full resize-y rounded-lg border border-[#ded9d0] bg-white px-4 py-3 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#4f55b5] focus:ring-4 focus:ring-[#4f55b5]/10" />
          </div>

          <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#5553b9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#41409a]">
            <FiSend aria-hidden="true" />
            Envoyer le message
          </button>
        </form>

        <div className="rounded-2xl border border-[#e7e0d5] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="flex items-center gap-3 text-lg font-bold text-[#18215b]">
            <FiMessageCircle aria-hidden="true" className="text-[#6266d7]" />
            Autres moyens de nous contacter
          </h2>

          <div className="mt-5 divide-y divide-[#ece6dd]">
            <div className="flex gap-4 py-4 first:pt-0">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f0eaff] text-[#6658d6]">
                <FiMail aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#202951]">Email</h3>
                <p className="mt-1 text-sm font-bold text-[#46516b]">contact@historiya.com</p>
                <p className="mt-1 text-xs text-slate-500">Nous répondons sous 24h.</p>
              </div>
            </div>

            <div className="flex gap-4 py-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e8efff] text-[#4776dc]">
                <FiMessageCircle aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#202951]">Formulaire</h3>
                <p className="mt-1 text-sm text-[#46516b]">Utilisez le formulaire de contact.</p>
                <p className="mt-1 text-xs text-slate-500">Réponse garantie.</p>
              </div>
            </div>

            <div className="flex gap-4 py-4 last:pb-0">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fff0e8] text-[#ed7a42]">
                <FiHeart aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#202951]">À votre écoute</h3>
                <p className="mt-1 text-sm text-[#46516b]">Vos questions, problèmes ou idées</p>
                <p className="mt-1 text-xs text-slate-500">sont toujours les bienvenus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
