"use client";

import Image from "next/image";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

type SignInFormProps = {
  onSwitchToSignUp?: () => void;
  onForgotPassword?: () => void;
  email?: string;
  onEmailChange?: (email: string) => void;
};

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#26347b] focus:ring-4 focus:ring-[#26347b]/10";

export default function SignInForm({ onSwitchToSignUp, onForgotPassword, email, onEmailChange }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="w-full" method="post">
      <div className="relative mx-auto h-24 w-48">
        <Image
          src="/auth/signin-reader.png"
          alt="Un enfant lit un livre bleu entouré d’étoiles"
          fill
          sizes="192px"
          className="object-contain"
        />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#151f56]">
          Se connecter
        </h2>
        <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-500">
          Retrouvez vos histoires, vos favoris et votre progression.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="signin-email" className="mb-1 block text-xs font-semibold text-[#202951]">
            Email
          </label>
          <div className="relative">
            <FiMail aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => onEmailChange?.(event.target.value)}
              placeholder="votre@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signin-password" className="mb-1 block text-xs font-semibold text-[#202951]">
            Mot de passe
          </label>
          <div className="relative">
            <FiLock aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Votre mot de passe"
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

      <button type="button" onClick={onForgotPassword} className="mt-3 text-xs font-bold text-[#4a5bc0] transition hover:text-[#17205b]">
        Mot de passe oublié ?
      </button>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-[#202b70] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#202b70]/20 transition hover:bg-[#17205b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202b70]"
      >
        Se connecter
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 border-t border-dashed border-[#e4c98e] pt-4 text-xs text-slate-600">
        <span>Pas encore de compte ?</span>
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-bold text-[#3344a0] transition hover:text-[#17205b]"
        >
          Créer un compte
        </button>
      </div>
    </form>
  );
}
