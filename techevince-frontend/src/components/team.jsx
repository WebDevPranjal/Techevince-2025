import person from "../assets/raman.png";
import React, {useState, useEffect} from "react";
import Grid from "../assets/Group 6.svg";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";
import { cleanUrl } from "../service/handleImage";

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      const res = await axios.get(BACKEND_ROUTES.team);
      setTeam(res.data);
    };
    getTeam();
  }, []);

  return (
    <div>
      <div className=' flex flex-col'>
        <div className='mt-12'>
          <p className='flex flex-col items-start text-3xl md:text-4xl font-semibold self-stretch mx-14 -mb-3 top-5 left-14 z-10 font-ClashDisplay'>
            Core Team
          </p>
          <div className='rectangle bg-customBlue-100 h-3 w-36 sm:w-36 mx-14 md:mx-28 top-11 left-28'></div>
        </div>

        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 w-full mt-12 mb-24'>
          {team &&
            team.map((item) => {
              return (
                <div className='flex flex-col w-3/4 hover:scale-110 transform transition duration-500 h-[420px] mt-[120px]'>
                  <div className=' bg-customBlue-200 bg-opacity-50 hover:bg-opacity-0 transition duration-500 h-[400px]'>
                    <img
                      src={cleanUrl(item.image)}
                      alt={'image'}
                      className='relative -z-20 h-[420px] w-full'
                    />
                  </div>
                  <div className='bg-customBlue-200 relative text-white px-6 h-full z-10'>
                    <div className='absolute bottom-0 right-0 bg-gradient-to-l  from-transparent to-customBlue-200 z-[-30] w-24 h-full'></div>
                    <div className='absolute bg-customBlue-200 bottom-0 right-24 z-[-30] w-2/5 h-full'></div>
                    <div className='absolute bg-customBlue-200 bottom-0 left-0 z-[-30] w-2/5 h-full'></div>
                    <img
                      src={Grid}
                      alt=''
                      className='absolute bottom-0 right-0 z-[-40]'
                    />
                    <h1 className='font-semibold text-2xl py-3'>{item.name}</h1>
                    <p className='text-base font-bold'>Technical Board</p>
                    <p className='text-xs font-normal pb-3'>{item.designation}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
