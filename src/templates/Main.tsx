import React, { ReactNode } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full h-full min-h-screen">
    {props.meta}
    <Navbar />
    <main>{props.children}</main>
    <Footer />
  </div>
);

export { Main };
