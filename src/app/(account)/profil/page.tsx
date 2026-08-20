import Link from "next/link";
import type { IconType } from "react-icons";
import {
  BiBookOpen,
  BiCalendar,
  BiCamera,
  BiChevronRight,
  BiEditAlt,
  BiHeart,
  BiHistory,
  BiLogOut,
  BiSave,
  BiTime,
} from "react-icons/bi";

type Stat = {
  label: string;
  value: number;
  description: string;
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

const stats: Stat[] = [
  {
    label: "Favoris",
    value: 24,
    description: "Histoires que vous aimez",
    icon: BiHeart,
    color: "text-rose-500",
    iconBackground: "bg-rose-100",
  },
  {
    label: "À lire plus tard",
    value: 12,
    description: "Histoires à découvrir",
    icon: BiTime,
    color: "text-violet-600",
    iconBackground: "bg-violet-100",
  },
  {
    label: "Générées",
    value: 8,
    description: "Vos histoires personnalisées",
    icon: BiEditAlt,
    color: "text-emerald-600",
    iconBackground: "bg-emerald-100",
  },
];

const spaceLinks: ProfileLink[] = [
  {
    title: "Historique de lecture",
    description: "Retrouvez toutes les histoires que vous avez lues",
    href: "/historique",
    icon: BiHistory,
    color: "text-violet-600",
    iconBackground: "bg-violet-100",
  },
  {
    title: "Mes favoris",
    description: "Vos histoires préférées enregistrées",
    href: "/favoris",
    icon: BiHeart,
    color: "text-rose-500",
    iconBackground: "bg-rose-100",
  },
  {
    title: "À lire plus tard",
    description: "Les histoires que vous souhaitez lire plus tard",
    href: "/a-lire-plus-tard",
    icon: BiSave,
    color: "text-amber-500",
    iconBackground: "bg-amber-100",
  },
];

const settingLinks: ProfileLink[] = [
  {
    title: "Modifier le profil",
    description: "Changez votre avatar et votre nom d’utilisateur",
    href: "/profil/modifier",
    icon: BiEditAlt,
    color: "text-violet-600",
    iconBackground: "bg-violet-100",
  },
  {
    title: "Déconnexion",
    description: "Se déconnecter de votre compte",
    href: "/",
    icon: BiLogOut,
    color: "text-rose-500",
    iconBackground: "bg-rose-100",
  },
];

function ProfileMenuLink({ item }: { item: ProfileLink }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex items-center gap-3 rounded-2xl border border-[#eadfd9] bg-white/75 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md sm:p-4"
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl text-2xl ${item.color} ${item.iconBackground}`}
      >
        <Icon aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-[#16245e]">{item.title}</span>
        <span className="mt-0.5 block text-sm leading-5 text-[#667085]">
          {item.description}
        </span>
      </span>
      <BiChevronRight
        aria-hidden="true"
        className="size-6 shrink-0 text-[#6672a5] transition group-hover:translate-x-1 group-hover:text-violet-600"
      />
    </Link>
  );
}

export default function ProfilePage() {
  return (
    <div className="relative isolate overflow-hidden bg-[#fffaf7] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_8%_55%,rgba(221,201,255,0.65),transparent_24%),radial-gradient(circle_at_92%_48%,rgba(232,212,255,0.65),transparent_25%),linear-gradient(180deg,#fffaf7_0%,#fff7f5_100%)]"
      />
      <span aria-hidden="true" className="absolute left-[7%] top-24 -z-10 text-3xl text-violet-200">✦</span>
      <span aria-hidden="true" className="absolute right-[9%] top-36 -z-10 text-4xl text-violet-200">✦</span>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">Votre espace</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#101e5a] sm:text-5xl">
            Mon profil
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3 text-amber-400" aria-hidden="true">
            <span className="h-px w-14 bg-amber-200" />
            <span>★</span>
            <span className="h-px w-14 bg-amber-200" />
          </div>
        </div>

        <section className="mt-9 rounded-[2rem] border border-[#eadfd9] bg-white/85 p-5 shadow-[0_20px_60px_rgba(72,52,116,0.09)] backdrop-blur sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="grid size-36 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-violet-400 to-indigo-700 text-6xl shadow-[0_10px_28px_rgba(101,70,210,0.28)]">
                <span aria-label="Avatar étoile" role="img">⭐</span>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-extrabold text-[#111e58] sm:text-3xl">
                  Aliouat Abderrahman
                </h2>
                <p className="mt-2 break-all text-[#5c6893]">aliouat.abderrahman@gmail.com</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#5c6893]">
                  <BiCalendar aria-hidden="true" className="size-5" />
                  Membre depuis le 18 août 2026
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[#eadfd9] pt-7 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <span className={`mx-auto grid size-12 place-items-center rounded-xl text-2xl ${stat.color} ${stat.iconBackground}`}>
                      <Icon aria-hidden="true" />
                    </span>
                    <p className={`mt-2 text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                    <p className="font-bold text-[#16245e]">{stat.label}</p>
                    <p className="mt-1 text-xs leading-4 text-[#667085]">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[1.75rem] border border-[#eadfd9] bg-white/80 p-5 shadow-[0_16px_45px_rgba(72,52,116,0.07)] sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-[#111e58]">
              <BiBookOpen aria-hidden="true" className="text-2xl text-violet-600" />
              Mes espaces
            </h2>
            <div className="mt-5 space-y-3">
              {spaceLinks.map((item) => <ProfileMenuLink key={item.title} item={item} />)}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[#eadfd9] bg-white/80 p-5 shadow-[0_16px_45px_rgba(72,52,116,0.07)] sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-[#111e58]">
              <BiEditAlt aria-hidden="true" className="text-2xl text-violet-600" />
              Profil
            </h2>
            <div className="mt-5 space-y-3">
              {settingLinks.map((item) => <ProfileMenuLink key={item.title} item={item} />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
