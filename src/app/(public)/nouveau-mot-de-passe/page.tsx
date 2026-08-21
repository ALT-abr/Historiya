import type { Metadata } from "next";
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";

export const metadata: Metadata = {
  title: "Nouveau mot de passe | Historiya",
  description: "Choisissez un nouveau mot de passe pour votre compte Historiya.",
};

type NewPasswordPageProps = {
  searchParams: Promise<{ erreur?: string }>;
};

export default async function NewPasswordPage({ searchParams }: NewPasswordPageProps) {
  const { erreur } = await searchParams;

  return (
    <section className="relative isolate flex min-h-[680px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#fffdfb_0%,#fff8f5_48%,#f6f1ff_100%)] px-4 py-16 sm:px-6">
      <div aria-hidden="true" className="absolute -left-24 top-16 size-72 rounded-full bg-[#eadcff]/55 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-10 size-80 rounded-full bg-[#ffe2d7]/55 blur-3xl" />
      <span aria-hidden="true" className="absolute left-[12%] top-[18%] text-3xl text-[#f7bd32]">✦</span>
      <span aria-hidden="true" className="absolute right-[15%] top-[25%] text-2xl text-[#a99cff]">✦</span>
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_24px_70px_rgba(67,46,126,0.13)] backdrop-blur sm:p-10">
        <UpdatePasswordForm linkError={erreur === "lien-invalide"} />
      </div>
    </section>
  );
}
