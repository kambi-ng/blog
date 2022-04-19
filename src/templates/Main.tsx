import React, { ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full h-full min-h-screen flex flex-col h-min-ful">
    {props.meta}
    <Navbar />
    <main>{props.children}</main>

    <div className="m-auto w-full"></div>
    <Footer />
  </div>
);

export { Main };
