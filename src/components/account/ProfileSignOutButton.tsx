"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiChevronRight, BiLogOut } from "react-icons/bi";
import { createClient } from "@/lib/supabase/client";

export default function ProfileSignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsSigningOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="group flex w-full items-center gap-3 rounded-2xl border border-[#eadfd9] bg-white/75 p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md disabled:cursor-wait disabled:opacity-60 sm:p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-100 text-2xl text-rose-500"><BiLogOut aria-hidden="true" /></span>
      <span className="min-w-0 flex-1"><span className="block font-bold text-[#16245e]">{isSigningOut ? "Déconnexion..." : "Déconnexion"}</span><span className="mt-0.5 block text-sm leading-5 text-[#667085]">Se déconnecter de votre compte</span></span>
      <BiChevronRight aria-hidden="true" className="size-6 shrink-0 text-[#6672a5] transition group-hover:translate-x-1 group-hover:text-rose-500" />
    </button>
  );
}
