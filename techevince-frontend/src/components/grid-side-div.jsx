import React from "react";
import { useState, useEffect, useMemo } from "react";

const GridSideDiv = ({ left = true, color = "customBlue-200" }) => {
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
      return 10;
    } else if (screenWidth > 768) {
      return 6;
    } else {
      return 2;
    }
  }, [screenWidth]);

  return (
    <div className='relative'>
      <div className='h-[35vh] md:h-[60vh] w-screen'>
        <div
          className={`absolute top-0 w-3/5 h-full z-10 ${
            left ? "bg-gradient-to-r" : "bg-gradient-to-l"
          } from-transparent ${"to-" + color}`}
        ></div>
      </div>
      <div className='absolute top-0 w-full h-[35vh] md:h-[60vh] z-0'>
        <div className='container h-full relative w-screen'>
          <div className='w-3/5 absolute inset-0 flex flex-col gap-5 mt-5 justify-around items-center'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='w-full border-b-2 border-gray-400'
              ></div>
            ))}
          </div>

          <div className='w-3/5 absolute inset-0 px-8 flex justify-around items-center'>
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

export default GridSideDiv;
