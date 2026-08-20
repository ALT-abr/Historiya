import Link from "next/link";
import { BiHeart, BiHistory, BiSave } from "react-icons/bi";

type AccountTab = "historique" | "favoris" | "a-lire-plus-tard";

type AccountTabsProps = {
  activeTab: AccountTab;
};

const tabs = [
  {
    id: "historique",
    label: "Historique",
    href: "/historique",
    icon: BiHistory,
  },
  {
    id: "favoris",
    label: "Favoris",
    href: "/favoris",
    icon: BiHeart,
  },
  {
    id: "a-lire-plus-tard",
    label: "À lire plus tard",
    href: "/a-lire-plus-tard",
    icon: BiSave,
  },
] as const;

export default function AccountTabs({ activeTab }: AccountTabsProps) {
  return (
    <nav aria-label="Navigation de votre bibliothèque" className="mt-8 border-b border-[#dedbe5]">
      <ul className="flex gap-2 overflow-x-auto sm:gap-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-max items-center gap-2 border-b-2 px-3 pb-4 text-sm font-bold transition sm:px-5 sm:text-base ${
                  isActive
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-[#17245c] hover:border-violet-200 hover:text-violet-600"
                }`}
              >
                <Icon aria-hidden="true" className="size-5" />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
