"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BiCamera, BiChevronRight, BiEditAlt, BiUser } from "react-icons/bi";
import { FiX } from "react-icons/fi";

type EditProfileModalProps = {
  initialUsername: string;
  initialAvatarUrl?: string | null;
};

export default function EditProfileModal({
  initialUsername,
  initialAvatarUrl,
}: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl ?? "");

  function openModal() {
    setUsername(initialUsername);
    setAvatarPreview(initialAvatarUrl ?? "");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // L'enregistrement dans profiles et Storage sera ajouté avec Supabase.
    closeModal();
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="group flex w-full items-center gap-3 rounded-2xl border border-[#eadfd9] bg-white/75 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:p-4"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-2xl text-violet-600">
          <BiEditAlt aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-[#16245e]">Modifier le profil</span>
          <span className="mt-0.5 block text-sm leading-5 text-[#667085]">
            Changez votre avatar et votre nom d’utilisateur
          </span>
        </span>
        <BiChevronRight
          aria-hidden="true"
          className="size-6 shrink-0 text-[#6672a5] transition group-hover:translate-x-1 group-hover:text-violet-600"
        />
      </button>

      {isOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
          onMouseDown={closeModal}
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#101426]/50 p-4 backdrop-blur-sm"
        >
          <div
            onMouseDown={(event) => event.stopPropagation()}
            className="relative my-5 w-full max-w-md rounded-3xl border border-violet-100 bg-[#fffdfa] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Fermer"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#151f56] transition hover:bg-violet-50"
            >
              <FiX aria-hidden="true" className="size-6" />
            </button>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-500">
                Mon compte
              </p>
              <h2 id="edit-profile-title" className="mt-1 text-2xl font-extrabold text-[#151f56]">
                Modifier le profil
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Personnalisez le nom et l’avatar affichés sur Historiya.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex flex-col items-center">
                <div className="relative grid size-28 place-items-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-violet-400 to-indigo-700 text-5xl text-white shadow-lg shadow-violet-500/20">
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Aperçu du nouvel avatar"
                      fill
                      unoptimized
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <span aria-label="Avatar étoile" role="img">{"\u2B50"}</span>
                  )}
                </div>

                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-100">
                  <BiCamera aria-hidden="true" className="size-5" />
                  Choisir un avatar
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </label>
                <p className="mt-2 text-xs text-slate-400">PNG, JPG ou WebP</p>
              </div>

              <div className="mt-6">
                <label htmlFor="profile-username" className="mb-2 block text-sm font-bold text-[#202951]">
                  Nom d’utilisateur
                </label>
                <div className="relative">
                  <BiUser aria-hidden="true" className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="profile-username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    minLength={2}
                    maxLength={40}
                    autoComplete="username"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#10243a] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-[#34465a] transition hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
