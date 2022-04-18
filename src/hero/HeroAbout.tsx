import React from 'react';

import PeopleHeads from '../assets/PeopleHeads.svg';
import PeopleHeadsSmall from '../assets/PeopleHeadsSmall.svg';

const Hero = () => {
  return (
    <section className="h-[65vh]  flex justify-center overflow-x-clip overflow-y-visible pt-24">
      <div className="container grid grid-cols-12 grid-rows-1 relative h-full">
        <div className="circle absolute w-[612px] h-[612px] border-[5px] rounded-full border-secondary-300 bg-black-300 -top-[50%] -left-[15%] -z-20"></div>
        {/*  */}
        <h1 className="font-header text-6xl lg:text-6xl xl:text-8xl font-semibold col-span-12 lg:col-span-7 pr-6 leading-[115%] my-auto tracking-normal relative mt-auto">
          <div className="line absolute h-[90%] w-1 mt-[2.5%] -left-4 md:-left-8 bg-gray-400"></div>
          We Are <br /> Different People but All Nerds
        </h1>
        {/*  */}
        <div className="col-start-7 lg:col-start-8 col-end-13 lg:flex">
          <div className=" xl:translate-x-8 2xl:translate-x-32  my-auto -translate-y-5 ">
            <PeopleHeads className="hidden xl:inline" />
            <PeopleHeadsSmall className="hidden lg:inline xl:hidden" />
          </div>
        </div>
        <div className="circle absolute w-[600px] h-[600px] -top-[12rem] md:-top-[1.5rem] -right-[2.5rem] border-[3px] rounded-full border-secondary-300 -z-30"></div>
        <div className="circle absolute w-[670px] h-[670px] -top-[14rem] md:-top-[3.5rem] -right-[4rem] border-[3px] rounded-full border-secondary-300 -z-30 opacity-[25%]"></div>
        <div className="circle absolute w-[750px] h-[750px] -top-[16rem] md:-top-[5.5rem] -right-[6rem] border-[3px] rounded-full border-secondary-300 -z-30 opacity-[15%]"></div>
      </div>
    </section>
  );
};

export default Hero;
