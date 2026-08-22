"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import AuthModal from "@/components/auth/AuthModal";
import { createClient } from "@/lib/supabase/client";

type MobileMenuProps = {
  isAuthenticated: boolean;
  username: string;
};

const publicLinks = [
  { label: "Accueil", href: "/" },
  { label: "Bibliothèque", href: "/biblioteque" },
  { label: "Audio", href: "/audio" },
  { label: "Générer votre histoire", href: "/mystories" },
  { label: "Contact", href: "/contact" },
] as const;

const accountLinks = [
  { label: "Mon profil", href: "/profil" },
  { label: "Mes favoris", href: "/favoris" },
  { label: "À lire plus tard", href: "/a-lire-plus-tard" },
  { label: "Historique", href: "/historique" },
] as const;

export default function MobileMenu({ isAuthenticated, username }: MobileMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  async function handleSignOut() {
    setIsSigningOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    setIsSigningOut(false);

    if (!error) {
      setIsOpen(false);
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-[#10243a] shadow-sm transition hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      >
        {isOpen ? <FiX aria-hidden="true" className="size-6" /> : <FiMenu aria-hidden="true" className="size-6" />}
      </button>

      {isOpen && (
        <>
          <button type="button" aria-label="Fermer le menu" onClick={() => setIsOpen(false)} className="fixed inset-0 top-20 z-40 bg-black/25" />
          <div id="mobile-navigation" className="fixed right-4 top-[4.5rem] z-50 max-h-[calc(100dvh-5.5rem)] w-64 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-[#fffdf8] p-3 shadow-xl sm:right-8">
            <nav aria-label="Navigation mobile">
              <ul className="space-y-1">
                {publicLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2 font-semibold text-[#26384b] transition hover:bg-violet-50 hover:text-violet-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-2 border-t border-slate-200 pt-2">
              {isAuthenticated ? (
                <>
                  <p className="px-3 pb-1 text-xs text-slate-500">Connecté en tant que <span className="font-bold text-[#10243a]">{username}</span></p>
                  <nav aria-label="Espace utilisateur">
                    <ul className="space-y-1">
                      {accountLinks.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2 font-semibold text-[#26384b] transition hover:bg-violet-50 hover:text-violet-700">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 font-bold text-rose-500 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60">
                    <FiLogOut aria-hidden="true" />
                    {isSigningOut ? "Déconnexion..." : "Déconnexion"}
                  </button>
                </>
              ) : (
                <AuthModal buttonLabel="Se connecter" buttonClassName="w-full rounded-xl bg-[#0d2338] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173a59]" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
