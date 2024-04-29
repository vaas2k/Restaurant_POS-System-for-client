'use client'
import React from 'react';
import Link from 'next/link'
import { Home,SquareMenu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Kazim K-POP</Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/menu" className="hover:text-gray-400">
            Menu
          </Link>
        </li>
        <li>
          <Link href="/order-history" className="hover:text-gray-400">
            Orders 
          </Link>
        </li>
        <li>
          <Link href="/add-items" className="hover:text-gray-400">
            Add Items
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
