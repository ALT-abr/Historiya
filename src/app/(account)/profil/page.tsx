import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { IconType } from "react-icons";
import {
  BiBookOpen,
  BiCalendar,
  BiChevronRight,
  BiEditAlt,
  BiHeart,
  BiHistory,
  BiSave,
  BiTime,
} from "react-icons/bi";
import EditProfileModal from "@/components/account/EditProfileModal";
import ProfileSignOutButton from "@/components/account/ProfileSignOutButton";
import { DEFAULT_PROFILE_AVATAR, isProfileAvatar } from "@/lib/avatars";
import { createClient } from "@/lib/supabase/server";

type Stat = {
  label: string;
  value: number;
  icon: IconType;
  color: string;
  iconBackground: string;
};

type ProfileLink = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  color: string;
  iconBackground: string;
};

const spaceLinks: ProfileLink[] = [
  { title: "Historique de lecture", description: "Retrouvez toutes les histoires que vous avez lues", href: "/historique", icon: BiHistory, color: "text-violet-600", iconBackground: "bg-violet-100" },
  { title: "Mes favoris", description: "Vos histoires préférées enregistrées", href: "/favoris", icon: BiHeart, color: "text-rose-500", iconBackground: "bg-rose-100" },
  { title: "À lire plus tard", description: "Les histoires que vous souhaitez lire plus tard", href: "/a-lire-plus-tard", icon: BiSave, color: "text-amber-500", iconBackground: "bg-amber-100" },
];

function ProfileMenuLink({ item }: { item: ProfileLink }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className="group flex items-center gap-3 rounded-2xl border border-[#eadfd9] bg-white/75 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:p-4">
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-2xl ${item.color} ${item.iconBackground}`}><Icon aria-hidden="true" /></span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-[#16245e]">{item.title}</span>
        <span className="mt-0.5 block text-sm leading-5 text-[#667085]">{item.description}</span>
      </span>
      <BiChevronRight aria-hidden="true" className="size-6 shrink-0 text-[#6672a5] transition group-hover:translate-x-1 group-hover:text-violet-600" />
    </Link>
  );
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const [profileResult, favoritesResult, readLaterResult, historyResult] = await Promise.all([
    supabase.from("profiles").select("username, avatar_url, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("favorites").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("read_later").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("reading_history").select("*", { count: "exact", head: true }).eq("user_id", user.id),
  ]);

  const profile = profileResult.data;
  const username = profile?.username?.trim() || user.user_metadata.username || user.email?.split("@")[0] || "Utilisateur";
  const avatarUrl = profile?.avatar_url && isProfileAvatar(profile.avatar_url)
    ? profile.avatar_url
    : DEFAULT_PROFILE_AVATAR;
  const memberSince = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(profile?.created_at ?? user.created_at));
  const stats: Stat[] = [
    { label: "Favoris", value: favoritesResult.count ?? 0, icon: BiHeart, color: "text-rose-500", iconBackground: "bg-rose-100" },
    { label: "À lire plus tard", value: readLaterResult.count ?? 0, icon: BiTime, color: "text-violet-600", iconBackground: "bg-violet-100" },
    { label: "Histoires lues", value: historyResult.count ?? 0, icon: BiHistory, color: "text-emerald-600", iconBackground: "bg-emerald-100" },
  ];

  return (
    <div className="relative isolate overflow-hidden bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_8%_55%,rgba(221,201,255,0.65),transparent_24%),radial-gradient(circle_at_92%_48%,rgba(232,212,255,0.65),transparent_25%),linear-gradient(180deg,#fffaf7_0%,#fff7f5_100%)]" />
      <span aria-hidden="true" className="absolute left-[7%] top-24 -z-10 text-3xl text-violet-200">✦</span>
      <span aria-hidden="true" className="absolute right-[9%] top-36 -z-10 text-4xl text-violet-200">✦</span>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">Votre espace</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#101e5a] sm:text-5xl">Mon profil</h1>
          <div className="mt-3 flex items-center justify-center gap-3 text-amber-400" aria-hidden="true"><span className="h-px w-14 bg-amber-200" /><span>★</span><span className="h-px w-14 bg-amber-200" /></div>
        </div>

        <section className="mt-9 rounded-[2rem] border border-[#eadfd9] bg-white/85 p-5 shadow-[0_20px_60px_rgba(72,52,116,0.09)] backdrop-blur sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="relative grid size-36 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-violet-400 to-indigo-700 text-5xl font-extrabold text-white shadow-[0_10px_28px_rgba(101,70,210,0.28)]">
                <Image src={avatarUrl} alt={`Avatar de ${username}`} fill sizes="144px" className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-extrabold text-[#111e58] sm:text-3xl">{username}</h2>
                <p className="mt-2 break-all text-[#5c6893]">{user.email}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#5c6893]"><BiCalendar aria-hidden="true" className="size-5" />Membre depuis le {memberSince}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[#eadfd9] pt-7 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return <div key={stat.label} className="text-center"><span className={`mx-auto grid size-12 place-items-center rounded-xl text-2xl ${stat.color} ${stat.iconBackground}`}><Icon aria-hidden="true" /></span><p className={`mt-2 text-3xl font-extrabold ${stat.color}`}>{stat.value}</p><p className="font-bold text-[#16245e]">{stat.label}</p></div>;
              })}
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[1.75rem] border border-[#eadfd9] bg-white/80 p-5 shadow-[0_16px_45px_rgba(72,52,116,0.07)] sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-[#111e58]"><BiBookOpen aria-hidden="true" className="text-2xl text-violet-600" />Mes espaces</h2>
            <div className="mt-5 space-y-3">{spaceLinks.map((item) => <ProfileMenuLink key={item.title} item={item} />)}</div>
          </section>

          <section className="rounded-[1.75rem] border border-[#eadfd9] bg-white/80 p-5 shadow-[0_16px_45px_rgba(72,52,116,0.07)] sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-[#111e58]"><BiEditAlt aria-hidden="true" className="text-2xl text-violet-600" />Profil</h2>
            <div className="mt-5 space-y-3">
              <EditProfileModal initialUsername={username} initialAvatarUrl={avatarUrl} />
              <ProfileSignOutButton />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
