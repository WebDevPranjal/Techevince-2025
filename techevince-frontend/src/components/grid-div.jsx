import React, { useMemo } from "react";
import { useState, useEffect } from "react";

const GridTopDiv = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const numberOfColumns = useMemo(() => {
    if (screenWidth > 1024) {
      return 18;
    } else if (screenWidth > 768) {
      return 12;
    } else if (screenWidth > 640) {
      return 8;
    } else {
      return 4;
    }
  }, [screenWidth]);


  return (
    <div className='relative'>
      <div className='h-screen'>
        <div className='absolute top-0 w-screen h-1/2 z-10 bg-gradient-to-b from-transparent to-customBlue-200'></div>
      </div>
      <div className='absolute top-0 w-full h-screen z-0'>
        <div className='container h-2/5 relative w-screen'>
          <div className='w-screen absolute inset-0 flex flex-col gap-5 mt-5 justify-around items-center'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className='w-full border-b-2 border-gray-400'
              ></div>
            ))}
          </div>

          <div className='w-screen absolute inset-0 px-8 flex justify-around items-center'>
            {Array.from({ length: numberOfColumns }).map((_, index) => (
              <div
                key={index}
                className='h-full border-r-2 border-gray-400'
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTopDiv;
