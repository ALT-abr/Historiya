import Link from "next/link";

export default function Navbar() {
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
              Biblioteque
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/audio">
              Audio
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/mystories">
              Genere voter histoire
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-[#0d2338]" href="/contacte">
              Contacte
            </Link>
          </li>
        </ul>

        <Link
          href="/sign-in"
          className="shrink-0 rounded-lg bg-[#0d2338] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173a59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2338]"
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}
