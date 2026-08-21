"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FiCheckCircle, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

const inputClass = "h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#5b4ff5] focus:ring-4 focus:ring-[#5b4ff5]/10";

type UpdatePasswordFormProps = {
  linkError?: boolean;
};

export default function UpdatePasswordForm({ linkError = false }: UpdatePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    linkError ? "Ce lien est invalide ou a expiré. Demandez un nouveau lien de réinitialisation." : "",
  );
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmation = String(formData.get("password-confirmation") ?? "");
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmation) {
      setErrorMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.code === "session_not_found"
        ? "Ce lien est invalide ou a expiré. Demandez un nouveau lien de réinitialisation."
        : error.message);
      return;
    }
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <FiCheckCircle aria-hidden="true" className="size-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-[#151f56]">Mot de passe modifié !</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Votre nouveau mot de passe a bien été enregistré. Vous pouvez maintenant continuer à découvrir vos histoires.</p>
        <Link href="/" className="mt-6 inline-flex rounded-xl bg-[#5b4ff5] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#5b4ff5]/20 transition hover:bg-[#493cdf]">Retour à l’accueil</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mx-auto h-32 w-60">
        <Image src="/auth/new-password-lock.png" alt="Un cadenas violet accompagné d’une clé étoilée" fill sizes="240px" className="object-contain" priority />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#151f56]">Nouveau mot de passe</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Choisissez un nouveau mot de passe pour retrouver votre espace Historiya.</p>
      </div>
      <div className="mt-7 space-y-4">
        <PasswordField id="new-password" name="password" label="Nouveau mot de passe" placeholder="Au moins 6 caractères" visible={showPassword} onToggle={() => setShowPassword((value) => !value)} />
        <PasswordField id="password-confirmation" name="password-confirmation" label="Confirmer le mot de passe" placeholder="Saisissez-le une seconde fois" visible={showConfirmation} onToggle={() => setShowConfirmation((value) => !value)} />
      </div>
      <div aria-live="polite">
        {errorMessage && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{errorMessage}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-xl bg-[#5b4ff5] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#5b4ff5]/20 transition hover:bg-[#493cdf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b4ff5] disabled:cursor-wait disabled:opacity-60">
        {isSubmitting ? "Modification en cours..." : "Modifier mon mot de passe"}
      </button>
    </form>
  );
}

type PasswordFieldProps = { id: string; name: string; label: string; placeholder: string; visible: boolean; onToggle: () => void };

function PasswordField({ id, name, label, placeholder, visible, onToggle }: PasswordFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#202951]">{label}</label>
      <div className="relative">
        <FiLock aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input id={id} name={name} type={visible ? "text" : "password"} autoComplete="new-password" minLength={6} required placeholder={placeholder} className={inputClass} />
        <button type="button" onClick={onToggle} aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="absolute right-2.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-[#5b4ff5]">
          {visible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
