import React, { useState, useEffect } from "react";
import Grid from "../assets/Group 6.svg";
import Ball from "../components/ball";
import softwareLogo from "../assets/softwarebanner.jpg";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";
import { Link } from "react-router-dom";
import { cleanUrl } from "../service/handleImage";

export default function SoftwareInfo() {
  const [images, setImages] = useState([
    softwareLogo,
    softwareLogo,
    softwareLogo,
  ]);

  useEffect(() => {
    const getImages = async () => {
      const res = await axios.get(`${BACKEND_ROUTES.project}/software`);
      let images = res.data.map((item) => {
        return item.images.map((image) => cleanUrl(image));
      });
      // deflating the array
      images = [].concat.apply([], images);
      images = images.filter((item) => item !== null);
      while (images.length < 3) {
        images.push(softwareLogo);
      }
      setImages(images);
    };
    getImages();
  }, []);
  const indices = [
    Math.floor(((Math.random() + Math.random()) / 2) * images.length),
    Math.floor(Math.random() * images.length),
    Math.floor(Math.random() * images.length),
  ];

  return (
    <div className='flex bg-white z-0'>
      <div className='w-full md:w-5/12 bg-customBlue-200 h-screen items-center text-left'>
        <div className='h-5/6 w-8/12 relative items-center mx-auto my-32 md:my-24'>
          <div className='absolute -bottom-5 overflow-hidden -left-32 w-[160%] h-2/5'>
            <div className='bg-gradient-to-t from-transparent z-20 to-customBlue-200 w-full h-full absolute bottom-0 left-0'></div>
            <div
              style={{ background: `url("${Grid}") no-repeat` }}
              className='absolute bottom-0 left-0 z-10 w-full h-full'
            />
          </div>
          <p className='text-3xl md:text-5xl font-semibold text-white -tracking-[0.01em] leading-tight font-body'>
            Software
            <br />
            Clubs
          </p>
          <br />
          <br />
          <p className='text-white text-xl md:text-base leading-6'>
            With the power of math and algorithms, IITG's software clubs have
            nursed their abilities to predict the future, analyse the present
            and reinvent the past. From simulations of the campus to complex
            artificial intelligence systems, get ready to see the true power of
            code and tenacity in Techevince 9.0.
          </p>
          <div className='relative md:invisible w-5/6 mt-8 items-center justify-center text-center z-50'>
            <div className='mr-12 self-end mb-20 bg-customBlue-200 rounded-full w-full py-8 text-white'>
              {/* <p className='font-ClashDisplay text-2xl font-bold'>
                Vote Projects
              </p> */}
              <Link to='../vote-software'>
                <div className='border-2 text-xl border-white rounded-full p-3 bg-[#333333] font-semibold'>
                  👆🏻{"  "}Click here to Vote
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='z-30 md:w-7/12 w-0 bg-white'>
        <div className='ml-12 flex h-full relative overflow-hidden'>
          <div className='absolute top-10 left-0 z-20 bounce'>
            <Ball image={images[indices[0]]} />
          </div>
          <div className='absolute top-10 right-0 z-20 bounce-dia'>
            <Ball image={images[indices[1]]} />
          </div>
          <div className='absolute top-10 left-0 z-20 bounce-rotate'>
            <Ball image={images[indices[2]]} />
          </div>
          <div className='mr-12 self-end mb-20 bg-customBlue-200 rounded-full w-full p-5 flex justify-between items-center text-white'>
            <p className='font-ClashDisplay text-2xl font-bold'>
              Vote Projects
            </p>
            <Link to='../vote-software'>
              <div className='border-2 border-white rounded-full p-3 bg-[#333333] font-semibold'>
                👆🏻{"  "}Click here to Vote
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
