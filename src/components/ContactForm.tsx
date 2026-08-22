"use client";

import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "h-11 w-full rounded-lg border border-[#ded9d0] bg-white px-4 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#4f55b5] focus:ring-4 focus:ring-[#4f55b5]/10";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !subject || !message) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    setIsSending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        subject,
        message,
      });

      if (error) {
        setErrorMessage("Le message n’a pas pu être enregistré. Veuillez réessayer.");
        return;
      }

      const notificationResponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      form.reset();

      if (!notificationResponse.ok) {
        setErrorMessage("Votre message est enregistré, mais l’e-mail n’a pas pu être envoyé.");
        return;
      }

      setSuccessMessage("Votre message a bien été envoyé. Merci !");
    } catch {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e7e0d5] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-3 text-lg font-bold text-[#18215b]">
        <FiMail aria-hidden="true" className="text-[#6266d7]" />
        Envoyez-nous un message
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-[#202951]">Nom</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Votre nom" required maxLength={80} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-[#202951]">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Votre email" required maxLength={254} className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-[#202951]">Sujet</label>
        <input id="contact-subject" name="subject" type="text" placeholder="Écrivez le sujet de votre message" required maxLength={150} className={inputClass} />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-[#202951]">Message</label>
        <textarea id="contact-message" name="message" rows={4} placeholder="Décrivez votre message..." required maxLength={3000} className="w-full resize-y rounded-lg border border-[#ded9d0] bg-white px-4 py-3 text-sm text-[#10243a] outline-none transition placeholder:text-slate-400 focus:border-[#4f55b5] focus:ring-4 focus:ring-[#4f55b5]/10" />
      </div>

      {successMessage && <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{successMessage}</p>}
      {errorMessage && <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{errorMessage}</p>}

      <button type="submit" disabled={isSending} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#5553b9] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#41409a] disabled:cursor-wait disabled:opacity-60">
        <FiSend aria-hidden="true" />
        {isSending ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}
