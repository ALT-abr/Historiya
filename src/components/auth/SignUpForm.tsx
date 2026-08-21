"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

type SignUpFormProps = {
  onSwitchToSignIn?: () => void;
};

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#26347b] focus:ring-4 focus:ring-[#26347b]/10";

export default function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    form.reset();
    setSuccessMessage(
      data.session
        ? "Votre compte a bien été créé."
        : "Compte créé. Consultez votre e-mail pour confirmer votre inscription.",
    );
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative mx-auto h-24 w-48">
        <Image
          src="/auth/signup-reader.png"
          alt="Une enfant lit un livre entourée d'étoiles"
          fill
          sizes="192px"
          className="object-contain"
        />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#151f56]">
          Créer un compte
        </h2>
        <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
          Rejoignez Historiya et vivez des aventures extraordinaires.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="signup-username" className="mb-1 block text-xs font-semibold text-[#202951]">
            Nom d’utilisateur
          </label>
          <div className="relative">
            <FiUser aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-username"
              name="username"
              type="text"
              autoComplete="username"
              maxLength={40}
              placeholder="ex. PetitLecteur"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1 block text-xs font-semibold text-[#202951]">
            Email
          </label>
          <div className="relative">
            <FiMail aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="votre@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1 block text-xs font-semibold text-[#202951]">
            Mot de passe
          </label>
          <div className="relative">
            <FiLock aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={6}
              placeholder="Au moins 6 caractères"
              required
              className={`${inputClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-[#26347b]"
            >
              {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div aria-live="polite">
        {errorMessage && (
          <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {successMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-lg bg-[#202b70] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#202b70]/20 transition hover:bg-[#17205b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202b70] disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Création en cours..." : "Créer un compte"}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 border-t border-dashed border-[#e4c98e] pt-4 text-xs text-slate-600">
        <span>Déjà un compte ?</span>
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-bold text-[#3344a0] transition hover:text-[#17205b]"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
}
