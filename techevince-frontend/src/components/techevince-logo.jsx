import React from 'react';
import TechevinceLogo from '../assets/logoteche.png';

const TechevinceLogoBar = () => {
  return (
    <div className='rounded-full font-ClashDisplay h-14 w-72 bg-white items-center flex p-2'>
      <div className='rounded-full'>
        <img src={TechevinceLogo} className='w-[48px]' alt="TechevinceLogo" />
      </div>
      <div className='ml-3'>
        <h1 className='text-2xl font-bold text-[#333]'>Techevince 11.0</h1>
      </div>
    </div>
  );
}

export default TechevinceLogoBar;
