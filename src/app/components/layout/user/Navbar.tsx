import Link from 'next/link'
import {
    FaBookOpen,
    FaHeadphones,
    FaHouse,
    FaWandMagicSparkles,
    FaUser,
} from "react-icons/fa6"

const Navbar = () => {
    const links =[
        { label: 'Accueil', href: '/home', icon: FaHouse},
        { label: 'Bib', href: '/biblioteque', icon: FaBookOpen,},
        { label: 'Audio', href: '/audio', icon: FaHeadphones},
        { label: 'Ma stories', href: '/storiesGenerator', icon: FaWandMagicSparkles},
        { label: 'Profil', href: '/profil', icon: FaUser}
    ]

  return (
    <nav className="border-t-4 border-[#f4df9b] bg-[#ffe4ac] px-6">
        <div 
          className='
           mx-auto grid min-h-20 max-w-7xl
           grid-cols-[1fr_auto_1fr] items-center'>
            <Link href="/dashboard" className="font-bold">
                Historiya
            </Link>

            <ul className="flex items-center justify-center gap-10">
                {links.map((link) => {
                    const Icon = link.icon;
                    return(
                        <li key={link.href}>
                            <Link 
                              href={link.href}
                              className="
                               flex items-center gap-2
                               text-sm font-semibold uppercase text-[#18233d]
                               transition hover:text-[#7a45b8]">
                                <Icon className="text-base" aria-hidden="true" />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div aria-hidden="true" />
        </div>
    </nav>
  );
}

export default Navbar
