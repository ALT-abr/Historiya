import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex space-x-5 mb-5 px-5 h-14 items-center">
        <Link href="/">Logo</Link>

        <ul className="flex space-x-5">
          <li><Link href="/comment ca marche">comment ca marche</Link></li>
          <li><Link href="/categories">categories</Link></li>
          <li><Link href="/histoires">histoires</Link></li>
          <li><Link href="/contact">contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar