import React from 'react';

import Link from 'next/link';

// type IFooterProps = {
//   isMinimal: boolean;
// };

import GithubIcon from '../assets/Github-Icon.svg';

const Footer = () => {
  return (
    <footer className="bg-secondary-300 text-primary-50 py-8 static w-full bottom-0 mt-a">
      <div className="container grid grid-cols-6 gap-y-8 lg:grid-cols-12">
        <div className="col-span-6 text-center lg:col-span-4 lg:text-left">
          <span className="text-3xl font-header font-semibold">
            We are Kambing
          </span>
          <p className="text-base mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            voluptatem, corporis enim officia suscipit quis pariatur distinctio
            est, eligendi, dignissimos placeat aliquid.
          </p>
        </div>
        <div className="col-span-3 text-center md:col-span-2 lg:text-left lg:col-start-6">
          <span className="text-2xl font-header font-semibold">Some Links</span>
          <ul className="mt-4">
            <li className="mb-2">
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/">
                <a>Home Page</a>
              </Link>
            </li>
            <li className="">
              <Link href="/random">
                <a>Random Article</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3 text-center lg:text-left md:col-span-2">
          <span className="text-2xl font-header font-semibold">
            See Our Work
          </span>
          <a
            href="https://github.com/bukan-kambing"
            className="grid place-items-center lg:place-content-start mt-4"
          >
            <GithubIcon />
          </a>
        </div>
        <form
          action=""
          className="col-span-6 flex flex-col text-center md:col-span-2 lg:col-span-3 lg:text-left"
        >
          <span className="font-header font-semibold text-2xl">Newsletter</span>
          <input
            type="text"
            placeholder="Your email here"
            className="mt-4 h-10 rounded placeholder:text-primary-200 text-black-200 text-center"
          />
          <button
            type="submit"
            className="mt-4 bg-tertiary-400 h-10 rounded text-bleach"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
