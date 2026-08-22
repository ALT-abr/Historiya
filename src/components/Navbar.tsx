import Link from "next/link";
import AccountMenu from "@/components/account/AccountMenu";
import AuthModal from "@/components/auth/AuthModal";
import MobileMenu from "@/components/MobileMenu";
import { DEFAULT_PROFILE_AVATAR, isProfileAvatar } from "@/lib/avatars";
import { createClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { username: string; avatar_url: string | null } | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .maybeSingle();

    profile = data;
  }

  const fallbackUsername = user?.email?.split("@")[0] ?? "Utilisateur";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fffdf8]/95 backdrop-blur">
      <nav
        aria-label="Navigation principale"
        className="relative mx-auto flex h-20 max-w-7xl items-center gap-5 px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="mr-auto text-xl font-bold tracking-[-0.04em] text-[#10243a] sm:text-2xl"
          aria-label="Historiya — accueil"
        >
          Historiya
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 whitespace-nowrap text-sm font-medium text-[#34465a] md:flex">
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/biblioteque">
              Bibliothèque
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/audio">
              Audio
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/mystories">
              Générer votre histoire
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/contact" className="text-sm font-medium text-[#34465a] transition hover:text-[#0d2338]">
            Contact
          </Link>

          {user ? (
            <AccountMenu
              username={profile?.username || fallbackUsername}
              email={user.email ?? ""}
              avatarUrl={profile?.avatar_url && isProfileAvatar(profile.avatar_url) ? profile.avatar_url : DEFAULT_PROFILE_AVATAR}
            />
          ) : (
            <AuthModal />
          )}
        </div>

        <MobileMenu isAuthenticated={Boolean(user)} username={profile?.username || fallbackUsername} />
      </nav>
    </header>
  );
}
