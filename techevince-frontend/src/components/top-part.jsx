import React from "react";
import Ball from "./ball";
import GridTopDiv from "./grid-div";
import TechevinceLogoBar from "./techevince-logo";
import Raman from "../assets/raman.png";
import "./bounce.css";
import Business from "../assets/businessLogo.png";
import Software from "../assets/softwareLogo.jpg";
import { Link } from "react-router-dom";

const TopPart = () => {
  return (
    <div className='overflow-x-hidden font-ClashDisplay'>
      <section className='min-h-screen relative bg-customBlue-200'>
        {/* Absolute position grid  */}
        <div className='absolute'>
          <GridTopDiv />
        </div>
       {/* 
       <Link to="/business">
        <div className='absolute bottom-44 right-0 z-40 bounce-oppisite duration-1000'>
            <Ball image={Business}/>
        </div>
        </Link>
        <Link to="/software">
        <div className='absolute top-20 lg:left-80 md:left-40 left-20 z-40 bounce duration-1000'>
          <Ball image={Software} />
        </div>
        </Link>
        <Link to="/hardware">
        <div className='absolute top-20 left-0 z-40 duration-1000 bounce-rotate'>
          <Ball image={Raman} />
        </div>
        </Link>
  */}

        <div className='absolute flex justify-center md:justify-start top-16 md:left-20 z-20 inset-0'>
          <TechevinceLogoBar />
        </div>

        <div className='pt-48 z-20 mx-8 lg:mx-64 relative font-extrabold text-6xl lg:text-[5rem] text-white flex flex-col items-center gap-8'>
          <p className=''>A new</p>
          <div className ='flex flex-row items-center flex-wrap justify-center gap-2'  ><p>Beginning for</p>
         <p> brighter</p>
         
         </div>
          <p >tomorrow</p>
        </div>

        <div className='mx-8 md:mx-24 lg:mx-36 relative py-12 flex items-end flex-col'>
         
          <div className='top-48 right-0 border-2 w-full border-white font-bold rounded-full flex justify-around items-center py-5 px-5 text-white text-xl'>
            <div className='flex flex-col items-center'>
              <p className='md:text-6xl'>500+</p>
              <p className='md:text-xl text-sm font-GalanoGrotesque'>Students</p>
            </div>{" "}
            <div className='flex flex-col items-center'>
              <p className='md:text-6xl'>3000+</p>
              <p className='md:text-xl text-sm font-GalanoGrotesque'>Footfall</p>
            </div>{" "}
            <div className='flex flex-col items-center'>
              <p className='md:text-6xl'>14+</p>
              <p className='md:text-xl text-sm font-GalanoGrotesque'>Clubs</p>
            </div>{" "}
            <div className='flex flex-col items-center'>
              <p className='md:text-6xl font-sans'>∞</p>
              <p className='md:text-xl text-sm font-GalanoGrotesque'>Projects</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopPart;
