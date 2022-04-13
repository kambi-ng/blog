import React from 'react';

import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-black-600 h-28 sticky top-0 z-50">
    <div className="container flex items-center justify-between h-full">
      <Link href="/" passHref>
        <a className="font-header text-4xl font-semibold">Kambing</a>
      </Link>
      <div className="hidden md:block w-auto">
        <ul className="flex justify-between basis-32 space-x-8">
          <li className="text-xl">
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/about" passHref>
              About Us
            </Link>
          </li>
          <li className="text-xl">
            <a href="https://github.com/bukan-kambing">Github</a>
          </li>
        </ul>
      </div>
      <div className="hamburger flex flex-col justify-between md:hidden">
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
      </div>
    </div>
  </nav>
);

export default Navbar;
