import React, { ReactNode } from 'react';

import { GitHubOutline, HomeSimple, InfoEmpty } from 'iconoir-react';
import Link from 'next/link';

import { Navbar } from '../navigation/Navbar';
import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0 h-full min-h-screen bg-white">
    {props.meta}

    <div className="w-full max-w-7xl mx-auto">
      <div className="border-b border-gray-300 flex items-center justify-between py-4">
        <div className="font-semibold text-3xl text-black">
          {AppConfig.title}
        </div>
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                <a className="group flex flex-col">
                  <span>
                    <HomeSimple />
                  </span>
                  <span className="transition-all overflow-hidden w-0 rounded-sm group-hover:w-full h-0.5 bg-gray-700 mt-0.5"></span>
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                <a className="group flex flex-col">
                  <span>
                    <InfoEmpty />
                  </span>
                  <span className="transition-all overflow-hidden w-0 rounded-sm group-hover:w-full h-0.5 bg-gray-700 mt-0.5"></span>
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <a
                className="group flex flex-col"
                href="https://github.com/bukan-kambing/"
              >
                <span>
                  <GitHubOutline />
                </span>
                <span className="transition-all overflow-hidden w-0 rounded-sm group-hover:w-full h-0.5 bg-gray-700 mt-0.5"></span>
              </a>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="text-xl py-5 max-w-7xl w-full mx-auto">
        {props.children}
      </div>
    </div>
  </div>
);

export { Main };
