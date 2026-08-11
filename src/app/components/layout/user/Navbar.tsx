import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    const links =[
        { label: 'Accueil', href: '/home'},
        { label: 'Bib', href: '/biblioteque'},
        { label: 'Audio', href: '/audio'},
        { label: 'Ma stories', href: '/storiesGenerator'},
        { label: 'Profil', href: '/profil'}
    ]

  return (
    <nav>
        <Link href="/">Logo</Link>

        <ul>
            {links.map(link => 
                <Link 
                    className="text-zinc-500 hover:text-zinc-800 transition-colors"
                    key={link.href} 
                    href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default Navbar