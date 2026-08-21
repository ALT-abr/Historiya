"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { FiArrowLeft, FiMail, FiSend } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

type ForgotPasswordFormProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onBack: () => void;
};

export default function ForgotPasswordForm({ email, onEmailChange, onBack }: ForgotPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/nouveau-mot-de-passe`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setIsSent(true);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative mx-auto h-24 w-48">
        <Image src="/auth/forgot-password-envelope.png" alt="Une enveloppe contenant une lettre étoilée" fill sizes="192px" className="object-contain" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#151f56]">Mot de passe oublié ?</h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">Pas de souci ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
      </div>
      <div className="mt-5">
        <label htmlFor="forgot-email" className="mb-1 block text-xs font-semibold text-[#202951]">Email</label>
        <div className="relative">
          <FiMail aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input id="forgot-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="votre@email.com" required className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#26347b] focus:ring-4 focus:ring-[#26347b]/10" />
        </div>
      </div>
      <div aria-live="polite">
        {isSent && <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé.</p>}
        {errorMessage && <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{errorMessage}</p>}
      </div>
      <button type="submit" disabled={isSubmitting || isSent} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#202b70] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#202b70]/20 transition hover:bg-[#17205b] disabled:cursor-wait disabled:opacity-60">
        {isSubmitting ? "Envoi en cours..." : isSent ? "Lien envoyé" : "Envoyer le lien de réinitialisation"}
        <FiSend aria-hidden="true" />
      </button>
      <div className="mt-5 border-t border-dashed border-[#e4c98e] pt-4 text-center">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-[#3344a0] transition hover:text-[#17205b]"><FiArrowLeft aria-hidden="true" /> Retour à la connexion</button>
      </div>
    </form>
  );
}
