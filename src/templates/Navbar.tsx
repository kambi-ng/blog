import React, { useEffect, useState } from 'react';

import Link from 'next/link';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

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
        className={`md:hidden fixed top-0 left-0  w-full h-full z-20 transition-all duration-300 ease-in-out ${
          toggle ? 'translate-x-0' : '-translate-y-full'
        }`}
      >
        <ul className="grid place-content-center w-full h-full text-center bg-black-400 opacity-95 gap-8 backdrop-blur-3xl">
          <li className="text-2xl" onClick={() => setToggle(false)}>
            <Link href="/" passHref>
              Home
            </Link>
          </li>
          <li className="text-2xl" onClick={() => setToggle(false)}>
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
