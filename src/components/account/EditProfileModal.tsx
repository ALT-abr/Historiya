"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BiChevronRight, BiEditAlt, BiUser } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { DEFAULT_PROFILE_AVATAR, isProfileAvatar, PROFILE_AVATARS } from "@/lib/avatars";
import { createClient } from "@/lib/supabase/client";

type EditProfileModalProps = {
  initialUsername: string;
  initialAvatarUrl?: string | null;
};

export default function EditProfileModal({ initialUsername, initialAvatarUrl }: EditProfileModalProps) {
  const router = useRouter();
  const initialAvatar = initialAvatarUrl && isProfileAvatar(initialAvatarUrl) ? initialAvatarUrl : DEFAULT_PROFILE_AVATAR;
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function openModal() {
    setUsername(initialUsername);
    setSelectedAvatar(initialAvatar);
    setErrorMessage("");
    setIsOpen(true);
  }

  function closeModal() {
    if (!isSubmitting) setIsOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanUsername = username.trim();

    if (cleanUsername.length < 2) {
      setErrorMessage("Le nom d’utilisateur doit contenir au moins 2 caractères.");
      return;
    }
    if (!isProfileAvatar(selectedAvatar)) {
      setErrorMessage("Choisissez un avatar proposé dans la liste.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("Votre session a expiré. Reconnectez-vous.");
      setIsSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username: cleanUsername, avatar_url: selectedAvatar, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (updateError) {
      setErrorMessage(updateError.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsOpen(false);
    router.refresh();
  }

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, isSubmitting]);

  return (
    <>
      <button type="button" onClick={openModal} className="group flex w-full items-center gap-3 rounded-2xl border border-[#eadfd9] bg-white/75 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-2xl text-violet-600"><BiEditAlt aria-hidden="true" /></span>
        <span className="min-w-0 flex-1"><span className="block font-bold text-[#16245e]">Modifier le profil</span><span className="mt-0.5 block text-sm leading-5 text-[#667085]">Changez votre avatar et votre nom d’utilisateur</span></span>
        <BiChevronRight aria-hidden="true" className="size-6 shrink-0 text-[#6672a5] transition group-hover:translate-x-1 group-hover:text-violet-600" />
      </button>

      {isOpen && createPortal(
        <div role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onMouseDown={closeModal} className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#101426]/50 p-4 backdrop-blur-sm">
          <div onMouseDown={(event) => event.stopPropagation()} className="relative my-5 w-full max-w-lg rounded-3xl border border-violet-100 bg-[#fffdfa] p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={closeModal} disabled={isSubmitting} aria-label="Fermer" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#151f56] transition hover:bg-violet-50 disabled:opacity-50"><FiX aria-hidden="true" className="size-6" /></button>
            <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-500">Mon compte</p><h2 id="edit-profile-title" className="mt-1 text-2xl font-extrabold text-[#151f56]">Modifier le profil</h2><p className="mt-2 text-sm leading-6 text-slate-500">Choisissez votre avatar et modifiez votre nom d’utilisateur.</p></div>

            <form onSubmit={handleSubmit} className="mt-6">
              <fieldset>
                <legend className="mb-3 text-sm font-bold text-[#202951]">Choisir un avatar</legend>
                <div className="grid grid-cols-5 gap-x-2 gap-y-3">
                  {PROFILE_AVATARS.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.src;
                    return (
                      <label key={avatar.id} className="group cursor-pointer text-center">
                        <input type="radio" name="avatar" value={avatar.src} checked={isSelected} onChange={() => setSelectedAvatar(avatar.src)} className="sr-only" />
                        <span className="relative mx-auto block aspect-square w-full max-w-16 sm:max-w-[4.5rem]">
                          <span className={`absolute inset-0 overflow-hidden rounded-full border-4 transition ${isSelected ? "border-violet-600 shadow-lg shadow-violet-500/25" : "border-transparent group-hover:border-violet-200"}`}>
                            <Image src={avatar.src} alt={avatar.label} fill sizes="72px" className="object-cover" />
                          </span>
                        </span>
                        <span className={`mt-1.5 block text-xs font-semibold ${isSelected ? "text-violet-700" : "text-slate-500"}`}>{avatar.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6">
                <label htmlFor="profile-username" className="mb-2 block text-sm font-bold text-[#202951]">Nom d’utilisateur</label>
                <div className="relative"><BiUser aria-hidden="true" className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input id="profile-username" name="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required minLength={2} maxLength={40} autoComplete="username" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#10243a] outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" /></div>
              </div>

              <div aria-live="polite">{errorMessage && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{errorMessage}</p>}</div>
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-[#34465a] transition hover:bg-slate-50 disabled:opacity-50">Annuler</button>
                <button type="submit" disabled={isSubmitting} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Enregistrement..." : "Enregistrer"}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
