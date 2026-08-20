"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  BiChevronDown,
  BiHeart,
  BiHistory,
  BiLogOut,
  BiSave,
  BiUser,
} from "react-icons/bi";

type AccountMenuProps = {
  username: string;
  email: string;
  avatarUrl?: string | null;
  onSignOut?: () => void;
};

const accountLinks = [
  { label: "Profil", href: "/profil", icon: BiUser },
  { label: "Favoris", href: "/favoris", icon: BiHeart },
  { label: "À lire plus tard", href: "/a-lire-plus-tard", icon: BiSave },
  { label: "Historique", href: "/historique", icon: BiHistory },
];

export default function AccountMenu({
  username,
  email,
  avatarUrl,
  onSignOut,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const initial = username.trim().charAt(0).toUpperCase() || "?";

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  function handleSignOut() {
    setIsOpen(false);
    onSignOut?.();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 max-w-48 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-bold text-[#10243a] shadow-sm transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      >
        <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-violet-700 text-sm font-extrabold text-white">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="" fill sizes="32px" className="object-cover" />
          ) : (
            initial
          )}
        </span>
        <span className="min-w-0 truncate">{username}</span>
        <BiChevronDown
          aria-hidden="true"
          className={`size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(30,27,75,0.18)]"
        >
          <div className="flex items-center gap-3 border-b border-slate-200 px-2 pb-3">
            <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-violet-700 text-lg font-extrabold text-white">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="" fill sizes="44px" className="object-cover" />
              ) : (
                initial
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-extrabold text-[#10243a]">{username}</span>
              <span className="block truncate text-sm text-slate-500">{email}</span>
            </span>
          </div>

          <nav aria-label="Menu du compte" className="py-2">
            {accountLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-[#34465a] transition hover:bg-violet-50 hover:text-violet-700"
                >
                  <Icon aria-hidden="true" className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 border-t border-slate-200 px-3 pt-3 pb-1 font-bold text-rose-500 transition hover:text-rose-700"
          >
            <BiLogOut aria-hidden="true" className="size-5" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
