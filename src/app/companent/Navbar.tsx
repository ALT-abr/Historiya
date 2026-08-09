import Link from 'next/link';
import { RiNextjsFill } from 'react-icons/ri';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 flex items-center justify-around py-5 px-20 border-b border-green-700 bg-black">
        <Link href="/" className="transition duration-300 hover:scale-110">
            <RiNextjsFill className='w-16 h-16'></RiNextjsFill>
        </Link>

        <ul className="flex gap-10 text-lg">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
            </Link>
            <Link href="/education" className="text-gray-300 hover:text-white transition-colors">
                Education
            </Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                Products
            </Link>
            <Link href="/expereince" className="text-gray-300 hover:text-white transition-colors">
                Experience
            </Link>
        </ul>
    </nav>
  )
}

export default Navbar