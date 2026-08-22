"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type ReadingHistoryTrackerProps = {
  userId: string | null;
  storyId: string;
  pageNumber: number;
};

export default function ReadingHistoryTracker({ userId, storyId, pageNumber }: ReadingHistoryTrackerProps) {
  useEffect(() => {
    if (!userId) return;

    const supabase = createClient();

    async function saveReadingProgress() {
      const { error } = await supabase
        .from("reading_history")
        .upsert(
          {
            user_id: userId,
            story_id: storyId,
            last_page_number: pageNumber,
          },
          { onConflict: "user_id,story_id" },
        );

      if (error) console.error("Impossible d’enregistrer la progression de lecture :", error.message);
    }

    void saveReadingProgress();
  }, [pageNumber, storyId, userId]);

  return null;
}
