import React, { useEffect, useState } from "react";
import GridSideDiv from "./grid-side-div";
import Raman from "../assets/raman.png";
import BusinessLogo from "../assets/businessLogo.png";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";
import { cleanUrl } from "../service/handleImage";

const Judges = () => {
  const icons = {
    email: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 96' id='email' fill="#fff" className="flex items-center justify-center mt-[3px]">
        <path
          d='M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z'
          data-name='Layer 2'
        ></path>
      </svg>
    ),
    facebook: (
      <svg
        height='24px'
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
          fillOpacity: "1",
          fill: "#fff",
        }}
        version='1.1'
        viewBox='0 0 512 512'
        width='100%'
        xmlSpace='preserve'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:serif='http://www.serif.com/'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <path d='M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-106.468,0l0,-192.915l66.6,0l12.672,-82.621l-79.272,0l0,-53.617c0,-22.603 11.073,-44.636 46.58,-44.636l36.042,0l0,-70.34c0,0 -32.71,-5.582 -63.982,-5.582c-65.288,0 -107.96,39.569 -107.96,111.204l0,62.971l-72.573,0l0,82.621l72.573,0l0,192.915l-191.104,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Z' />
      </svg>
    ),
    instagram: (
      <svg
        height='24px'
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
          fillOpacity: "1",
          fill: "#fff",
        }}
        version='1.1'
        viewBox='0 0 512 512'
        width='100%'
        xmlSpace='preserve'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:serif='http://www.serif.com/'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <path d='M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-193.446,81c-47.527,0 -53.487,0.201 -72.152,1.053c-18.627,0.85 -31.348,3.808 -42.48,8.135c-11.508,4.472 -21.267,10.456 -30.996,20.184c-9.729,9.729 -15.713,19.489 -20.185,30.996c-4.326,11.132 -7.284,23.853 -8.135,42.48c-0.851,18.665 -1.052,24.625 -1.052,72.152c0,47.527 0.201,53.487 1.052,72.152c0.851,18.627 3.809,31.348 8.135,42.48c4.472,11.507 10.456,21.267 20.185,30.996c9.729,9.729 19.488,15.713 30.996,20.185c11.132,4.326 23.853,7.284 42.48,8.134c18.665,0.852 24.625,1.053 72.152,1.053c47.527,0 53.487,-0.201 72.152,-1.053c18.627,-0.85 31.348,-3.808 42.48,-8.134c11.507,-4.472 21.267,-10.456 30.996,-20.185c9.729,-9.729 15.713,-19.489 20.185,-30.996c4.326,-11.132 7.284,-23.853 8.134,-42.48c0.852,-18.665 1.053,-24.625 1.053,-72.152c0,-47.527 -0.201,-53.487 -1.053,-72.152c-0.85,-18.627 -3.808,-31.348 -8.134,-42.48c-4.472,-11.507 -10.456,-21.267 -20.185,-30.996c-9.729,-9.728 -19.489,-15.712 -30.996,-20.184c-11.132,-4.327 -23.853,-7.285 -42.48,-8.135c-18.665,-0.852 -24.625,-1.053 -72.152,-1.053Zm0,31.532c46.727,0 52.262,0.178 70.715,1.02c17.062,0.779 26.328,3.63 32.495,6.025c8.169,3.175 13.998,6.968 20.122,13.091c6.124,6.124 9.916,11.954 13.091,20.122c2.396,6.167 5.247,15.433 6.025,32.495c0.842,18.453 1.021,23.988 1.021,70.715c0,46.727 -0.179,52.262 -1.021,70.715c-0.778,17.062 -3.629,26.328 -6.025,32.495c-3.175,8.169 -6.967,13.998 -13.091,20.122c-6.124,6.124 -11.953,9.916 -20.122,13.091c-6.167,2.396 -15.433,5.247 -32.495,6.025c-18.45,0.842 -23.985,1.021 -70.715,1.021c-46.73,0 -52.264,-0.179 -70.715,-1.021c-17.062,-0.778 -26.328,-3.629 -32.495,-6.025c-8.169,-3.175 -13.998,-6.967 -20.122,-13.091c-6.124,-6.124 -9.917,-11.953 -13.091,-20.122c-2.396,-6.167 -5.247,-15.433 -6.026,-32.495c-0.842,-18.453 -1.02,-23.988 -1.02,-70.715c0,-46.727 0.178,-52.262 1.02,-70.715c0.779,-17.062 3.63,-26.328 6.026,-32.495c3.174,-8.168 6.967,-13.998 13.091,-20.122c6.124,-6.123 11.953,-9.916 20.122,-13.091c6.167,-2.395 15.433,-5.246 32.495,-6.025c18.453,-0.842 23.988,-1.02 70.715,-1.02Zm0,53.603c-49.631,0 -89.865,40.234 -89.865,89.865c0,49.631 40.234,89.865 89.865,89.865c49.631,0 89.865,-40.234 89.865,-89.865c0,-49.631 -40.234,-89.865 -89.865,-89.865Zm0,148.198c-32.217,0 -58.333,-26.116 -58.333,-58.333c0,-32.217 26.116,-58.333 58.333,-58.333c32.217,0 58.333,26.116 58.333,58.333c0,32.217 -26.116,58.333 -58.333,58.333Zm114.416,-151.748c0,11.598 -9.403,20.999 -21.001,20.999c-11.597,0 -20.999,-9.401 -20.999,-20.999c0,-11.598 9.402,-21 20.999,-21c11.598,0 21.001,9.402 21.001,21Z' />
      </svg>
    ),
    linkedin: (
      <svg
        height='24px'
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
          fillOpacity: "1",
          fill: "#fff",
        }}
        version='1.1'
        viewBox='0 0 512 512'
        width='100%'
        xmlSpace='preserve'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:serif='http://www.serif.com/'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <path d='M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-288.985,423.278l0,-225.717l-75.04,0l0,225.717l75.04,0Zm270.539,0l0,-129.439c0,-69.333 -37.018,-101.586 -86.381,-101.586c-39.804,0 -57.634,21.891 -67.617,37.266l0,-31.958l-75.021,0c0.995,21.181 0,225.717 0,225.717l75.02,0l0,-126.056c0,-6.748 0.486,-13.492 2.474,-18.315c5.414,-13.475 17.767,-27.434 38.494,-27.434c27.135,0 38.007,20.707 38.007,51.037l0,120.768l75.024,0Zm-307.552,-334.556c-25.674,0 -42.448,16.879 -42.448,39.002c0,21.658 16.264,39.002 41.455,39.002l0.484,0c26.165,0 42.452,-17.344 42.452,-39.002c-0.485,-22.092 -16.241,-38.954 -41.943,-39.002Z' />
      </svg>



    ),


    twitter:
   
    
   (
     
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="white" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>  
      
      
    ),
  };

  const [judges, setJudges] = useState([]);

  useEffect(() => {
    const fetchJudges = async () => {
      const res = await axios.get(`${BACKEND_ROUTES.judges}`);
      setJudges(res.data);
    };
    fetchJudges();
  }, []);

  return (
    <div className='mb-20'>
      <div className=' flex flex-col'>
        <div className='mt-12'>
          <p className='flex flex-col items-start text-3xl md:text-4xl font-semibold self-stretch mx-14 -mb-3 top-5 left-14 z-10 font-ClashDisplay'>
            Our Judges
          </p>
          <div className='rectangle bg-customBlue-100 h-3 w-48 sm:w-44 mx-14 sm:mx-28 top-11 left-28'></div>
        </div>
        {judges.map((judge, index) => {
          return (
            <>
              <div
                className='mx-14 mt-10 relative flex py-10 md:py-20'
                key={index}
              >
                <div className='absolute opacity-50 h-full w-full -top-0'>
                  <div className='absolute top-0 w-full h-full z-0'>
                    <div className='absolute from-transparent w-full md:w-1/2 h-[120%] bg-gradient-to-r to-white z-10'></div>
                    <div className='container h-full relative w-screen'>
                      <div className='flex w-3/5 md:w-2/5 absolute inset-0  flex-col gap-5 mt-5 justify-between items-center'>
                        {Array.from({ length: 10 }).map((_, index) => (
                          <div
                            key={index}
                            className='w-full border-b-2 border-gray-400'
                          ></div>
                        ))}
                      </div>

                      <div className='w-3/5 md:w-2/5 absolute inset-0 flex justify-between items-center'>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className='h-full border-r-2 border-gray-400'
                          ></div>
                        ))}
                        <div>
                          <div className='w-1/2 h-1/2 bg-white rounded-full'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-3/4 ml-8 md:ml-14 mr-2 md:mr-16 z-20 text-justify'>
                  <div>
                    <p className='text-base md:text-2xl font-bold'>
                      {judge.name}
                    </p>
                    <p className='text-sm md:text-xl'>
                      {judge.designation + " | " + judge.company}
                    </p>
                  </div>
                  <br />
                  <br />
                  <p className='text-base md:text-xl font-semibold'>
                    {judge.description &&
                      judge.description[0] &&
                      judge.description[0].title}
                  </p>
                  <p className='text-sm md:text-xl'>
                    {judge.description &&
                      judge.description[0] &&
                      judge.description[0].description}
                  </p>
                  <br />
                  <br />
                  <p className='text-base md:text-xl font-semibold'>
                    {judge.description &&
                      judge.description[1] &&
                      judge.description[1].title}
                  </p>
                  <p className='text-sm md:text-xl'>
                    {judge.description &&
                      judge.description[1] &&
                      judge.description[1].description}
                  </p>
                  <br />
                  <div className='mt-4 flex gap-8'>
                    {judge.socials.map((social, index) => {
                      return (
                        <a href={social.link} target='_blank' key={index}>
                          <div className='flex justify-center items-center gap-2 rounded-full bg-gray-600 h-10 md:h-12 w-10 md:w-12'>
                            <div className='w-6 h-6'>{icons[social.name]}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className='w-2/4 md:w-1/4 md:h-full -mr-6 ml-2 md:mr-0'>
                  <div className='w-full hover:scale-110 transform transition duration-500'>
                    <div className='relative hover:bg-opacity-0 transition duration-500'>
                      <img
                        src={cleanUrl(judge.image)}
                        className='relative   -z-20 h-32 md:h-[360px] w-104'
                      />
                     
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Judges;
