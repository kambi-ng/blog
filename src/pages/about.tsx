import React from 'react';

import kambing from '../assets/Kambing.jpg';
import Hero from '../hero/HeroAbout';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <Hero />
    <section className="py-[100px] mb-[100px] lg:mt-28">
      <div className="container grid  grid-cols-1 lg:grid-cols-12 gap-4 relative overflow-x-clip 2xl:overflow-x-visible">
        <img
          src={kambing.src}
          alt="Picture of a goat"
          className="col-span-12 lg:col-span-5 rounded-3xl drop-shadow kambing h-72 lg:h-full w-[85%] lg:w-full  object-cover mx-auto"
        />

        <div className="col-start-1 col-end-13 lg:col-start-7 flex flex-col justify-center relative text-center lg:text-left px-12 lg:p-0">
          <h2 className="font-subheader text-3xl md:text-4xl lg:text-5xl italic font-medium">
            We Are Kambing
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cum
            tempora nihil! Debitis quis, explicabo modi facere eum at vel fugiat
            cupiditate omnis nemo blanditiis minima, assumenda facilis? Aut,
            sequi!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            repudiandae, nostrum ipsum velit nobis reiciendis sunt, aut sit id
            corrupti, animi deserunt ullam? Qui earum eius explicabo iure
            reprehenderit delectus.
          </p>
          <span className="hidden lg:inline absolute -right-20 top-0 lg:-top-10 text-[200px] xl:text-[256px] text-header text-black w-[800px] leading-[100%] -z-20 opacity-5 text-gray-700 select-none">
            ABOUT US
          </span>
        </div>

        <style jsx>{`
          .kambing {
            -webkit-box-shadow: -20px -16px 0px -1px #413f54;
            box-shadow: -20px -16px 0px -1px #413f54;
          }
        `}</style>
      </div>
    </section>
  </Main>
);

export default About;
