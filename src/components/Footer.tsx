import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import AuthModal from "./auth/AuthModal";
const footerLinkClass =
  "w-fit text-sm text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d2338] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-10">
        <div>
          <Link href="/" className="text-2xl font-bold tracking-[-0.04em]">
            Historiya
          </Link>
          <p className="mt-2 max-w-60 text-sm leading-5 text-slate-300">
            Des histoires pour rêver, apprendre et grandir.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Historiya sur Instagram"
              className="grid size-9 place-items-center rounded-full border border-white/20 text-base transition hover:border-white hover:bg-white hover:text-[#0d2338]"
            >
              <FaInstagram aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Historiya sur TikTok"
              className="grid size-9 place-items-center rounded-full border border-white/20 text-base transition hover:border-white hover:bg-white hover:text-[#0d2338]"
            >
              <FaTiktok aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Informations</h2>
          <nav aria-label="Informations" className="mt-3 flex flex-col gap-2">
            <Link href="/a-propos" className={footerLinkClass}>À propos</Link>
            <Link href="/contact" className={footerLinkClass}>Contact</Link>
            <Link href="/faq" className={footerLinkClass}>FAQ</Link>
          </nav>
        </div>

        <div>
          <h2 className="font-semibold">Explorer</h2>
          <nav aria-label="Explorer" className="mt-3 flex flex-col gap-2">
            <Link href="/" className={footerLinkClass}>Accueil</Link>
            <Link href="/biblioteque" className={footerLinkClass}>Bibliothèque</Link>
            <Link href="/mystories" className={footerLinkClass}>Générer votre histoire</Link>
          </nav>
        </div>

        <div>
          <h2 className="text-lg font-semibold leading-7">
            Gardez vos histoires préférées
          </h2>
          <p className="mt-2 text-sm leading-5 text-slate-300">
            Créez un compte pour enregistrer vos histoires et les retrouver facilement.
          </p>
          <AuthModal />
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-5 py-3 text-center text-xs text-slate-400 sm:px-8 lg:px-10">
        © {new Date().getFullYear()} Historiya. Tous droits réservés.
      </div>
    </footer>
  );
}
