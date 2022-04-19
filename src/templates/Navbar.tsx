import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const { pathname } = router;
  useEffect(() => {}, [toggle]);
  return (
    <>
      <nav className="bg-black-600 h-20 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-full z-50">
          <Link href="/" passHref>
            <a className="font-header text-4xl font-semibold">Kambing</a>
          </Link>
          <div className="hidden md:block w-auto">
            <ul className="flex flex-col md:flex-row justify-between basis-32 md:space-x-8">
              <li
                className={`text-xl ${pathname === '/' ? 'text-gray-700' : ''}`}
              >
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li
                className={`text-xl ${
                  pathname === '/about' ? 'text-gray-700' : ''
                }`}
              >
                <Link href="/about" passHref>
                  About Us
                </Link>
              </li>
              <li className="text-xl">
                <a href="https://github.com/bukan-kambing">Github</a>
              </li>
            </ul>
          </div>
          <div
            className="hamburger flex flex-col  md:hidden relative"
            id="hamburger"
            onClick={() => setToggle(!toggle)}
          >
            <span
              className={`hamburger__line  transition-all duration-300 ease-in
              ${toggle ? 'rotate-45 translate-y-4' : ''}`}
            ></span>
            <span
              className={`hamburger__line transition-all delay-200 duration-100 ease-in-out -z-1
              ${toggle ? 'opacity-0 ' : ''}`}
            ></span>
            <span
              className={`hamburger__line transition-all duration-300 ease-in 
              ${toggle ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed top-0 left-0  w-[100vw] h-[100vh] z-30 transition-all duration-300 ease-in-out bg-black-400/90 backdrop-blur-md ${
          toggle ? 'translate-x-0' : '-translate-y-full'
        }`}
      >
        <ul className="grid place-content-center w-[100vw] h-[100vh] text-center   gap-8 ">
          <li className={`text-2xl ${pathname === '/' ? 'text-gray-700' : ''}`}>
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li
            className={`text-2xl ${
              pathname === '/about' ? 'text-gray-700' : ''
            }`}
          >
            <Link href="/about" passHref>
              About Us
            </Link>
          </li>
          <li className="text-2xl" onClick={() => setToggle(false)}>
            <a href="https://github.com/bukan-kambing">Github</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
