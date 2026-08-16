"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");

  function openModal() {
    setMode("sign-in");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        className="rounded-lg bg-[#0d2338] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#173a59]"
      >
        Sign in
      </button>

      {isOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={mode === "sign-in" ? "Connexion" : mode === "sign-up" ? "Création de compte" : "Mot de passe oublié"}
          onMouseDown={closeModal}
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm"
        >
          <div
            onMouseDown={(event) => event.stopPropagation()}
            className="relative my-5 w-full max-w-md rounded-3xl bg-[#fffdfa] p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full text-[#151f56] transition hover:bg-slate-100"
            >
              <FiX aria-hidden="true" className="size-6" />
            </button>

            {mode === "sign-in" && (
              <SignInForm
                email={email}
                onEmailChange={setEmail}
                onSwitchToSignUp={() => setMode("sign-up")}
                onForgotPassword={() => setMode("forgot-password")}
              />
            )}
            {mode === "sign-up" && (
              <SignUpForm onSwitchToSignIn={() => setMode("sign-in")} />
            )}
            {mode === "forgot-password" && (
              <ForgotPasswordForm email={email} onEmailChange={setEmail} onBack={() => setMode("sign-in")} />
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
