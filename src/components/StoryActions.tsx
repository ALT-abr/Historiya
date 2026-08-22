"use client";

import { useState } from "react";
import { FiBookmark, FiHeart, FiX } from "react-icons/fi";
import AuthModal from "@/components/auth/AuthModal";
import { createClient } from "@/lib/supabase/client";

type StoryActionsProps = {
  storyId: string;
  userId: string | null;
  initialFavorite: boolean;
  initialReadLater: boolean;
};

export default function StoryActions({ storyId, userId, initialFavorite, initialReadLater }: StoryActionsProps) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isReadLater, setIsReadLater] = useState(initialReadLater);
  const [pendingAction, setPendingAction] = useState<"favorite" | "read-later" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showAuthNotice, setShowAuthNotice] = useState(false);

  async function toggleFavorite() {
    if (!userId) {
      setShowAuthNotice(true);
      return;
    }

    setPendingAction("favorite");
    setMessage(null);
    const supabase = createClient();
    const { error } = isFavorite
      ? await supabase.from("favorites").delete().eq("user_id", userId).eq("story_id", storyId)
      : await supabase.from("favorites").insert({ user_id: userId, story_id: storyId });

    if (error) setMessage(error.message);
    else setIsFavorite((value) => !value);
    setPendingAction(null);
  }

  async function toggleReadLater() {
    if (!userId) {
      setShowAuthNotice(true);
      return;
    }

    setPendingAction("read-later");
    setMessage(null);
    const supabase = createClient();
    const { error } = isReadLater
      ? await supabase.from("read_later").delete().eq("user_id", userId).eq("story_id", storyId)
      : await supabase.from("read_later").insert({ user_id: userId, story_id: storyId });

    if (error) setMessage(error.message);
    else setIsReadLater((value) => !value);
    setPendingAction(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isFavorite}
          disabled={pendingAction !== null}
          onClick={toggleFavorite}
          className={`grid size-11 place-items-center rounded-xl border transition disabled:cursor-wait disabled:opacity-60 ${isFavorite ? "border-rose-300 bg-rose-50 text-rose-500" : "border-[#ccd3d7] bg-white text-[#10243a] hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"}`}
        >
          <FiHeart aria-hidden="true" className="size-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          aria-pressed={isReadLater}
          disabled={pendingAction !== null}
          onClick={toggleReadLater}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${isReadLater ? "border-violet-300 bg-violet-50 text-violet-700" : "border-[#ccd3d7] bg-white text-[#10243a] hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"}`}
        >
          <FiBookmark aria-hidden="true" className="size-5" fill={isReadLater ? "currentColor" : "none"} />
          {isReadLater ? "Enregistrée" : "Lire plus tard"}
        </button>
      </div>

      {message && <p role="status" className="mt-3 text-sm font-semibold text-rose-600">{message}</p>}

      {showAuthNotice && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="auth-required-title" onMouseDown={() => setShowAuthNotice(false)}>
          <div className="relative w-full max-w-sm rounded-3xl bg-[#fffdfa] p-7 text-center shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setShowAuthNotice(false)} aria-label="Fermer" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#151f56] transition hover:bg-slate-100">
              <FiX aria-hidden="true" className="size-6" />
            </button>
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-violet-100 text-2xl text-violet-600">
              <FiBookmark aria-hidden="true" />
            </div>
            <h2 id="auth-required-title" className="mt-4 text-2xl font-extrabold text-[#10243a]">Connectez-vous pour enregistrer</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Créez un compte pour conserver vos favoris et vos histoires à lire plus tard.</p>
            <div className="mt-6 flex justify-center">
              <AuthModal
                defaultMode="sign-up"
                buttonLabel="Créer un compte"
                buttonClassName="rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
