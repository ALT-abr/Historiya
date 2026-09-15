import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const redirectTo = (path: string) =>
    new Response(null, {
      status: 303,
      headers: {
        Location: new URL(path, request.url).toString(),
        "Cache-Control": "no-store",
      },
    });

  const { count, error: countError } = await supabase
    .from("stories")
    .select("slug", { count: "exact", head: true })
    .eq("is_published", true);

  if (countError || !count) return redirectTo("/biblioteque");

  const index = Math.floor(Math.random() * count);
  const { data: story, error } = await supabase
    .from("stories")
    .select("slug")
    .eq("is_published", true)
    .order("slug", { ascending: true })
    .range(index, index)
    .maybeSingle();

  if (error || !story) return redirectTo("/biblioteque");

  return redirectTo(`/biblioteque/${encodeURIComponent(story.slug)}`);
}
