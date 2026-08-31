import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import AuthModal from "./auth/AuthModal";
const footerLinkClass =
  "w-fit text-sm text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const footerStars = [
  { top: "14%", left: "7%", size: 3, delay: "0s", duration: "4.2s" },
  { top: "62%", left: "15%", size: 2, delay: "1.4s", duration: "5s" },
  { top: "24%", left: "29%", size: 2, delay: "0.7s", duration: "4.6s" },
  { top: "75%", left: "42%", size: 3, delay: "2.1s", duration: "5.4s" },
  { top: "12%", left: "55%", size: 2, delay: "1.1s", duration: "4.8s" },
  { top: "47%", left: "67%", size: 3, delay: "2.8s", duration: "5.2s" },
  { top: "18%", left: "79%", size: 2, delay: "1.8s", duration: "4.4s" },
  { top: "71%", left: "88%", size: 2, delay: "0.4s", duration: "5.6s" },
  { top: "36%", left: "95%", size: 3, delay: "2.4s", duration: "4.9s" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_0%,#244c6b_0%,#173751_42%,#102b43_100%)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {footerStars.map((star, index) => (
          <span
            key={index}
            className="footer-star absolute rounded-full bg-white shadow-[0_0_7px_rgba(255,255,255,0.8)]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-7 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-10">
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
            <Link href="/contact" className={footerLinkClass}>Contact</Link>
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

      <div className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-5 py-3 text-center text-xs text-slate-300 sm:px-8 lg:px-10">
        © {new Date().getFullYear()} Historiya. Tous droits réservés.
      </div>
    </footer>
  );
}
