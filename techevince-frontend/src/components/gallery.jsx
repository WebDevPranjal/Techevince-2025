import React, { useState, useEffect } from "react";
import person from "../assets/raman.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";
import axios from "axios";
import { BACKEND_ROUTES } from "../config/urls";
import { cleanUrl } from "../service/handleImage";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const getGallery = async () => {
      const res = await axios.get(`${BACKEND_ROUTES.gallery}/carousel`);
      setGallery(res.data);
    };
    getGallery();
  }, []);
  const [active, setActive] = useState(null);
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow:
      screenWidth > 640 ? 4 : screenWidth > 480 ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "10px",
    arrows: false,
    className: "slides",
    afterChange: (current) => setActive((current - 2 + gallery.length)%gallery.length),
  };

  return (
    <div>
      <div className=' flex flex-col'>
        <div className='mt-12'>
          <p className='flex flex-col items-start text-3xl md:text-4xl font-semibold self-stretch mx-14 -mb-3 top-5 left-14 z-10 font-ClashDisplay'>
            Event Gallery
          </p>
          <div className='rectangle bg-customBlue-100 h-3 w-48 sm:w-44 mx-14 sm:mx-28 top-11 left-28'></div>
        </div>
        <div className=' text-white flex  mx-0'>
          <div className='w-full mx-0 mt-12'>
            <Slider {...settings}>
              {gallery &&
                gallery.map((item, index) => {
                  return (
                    <div key={index} className='h-60 md:h-80 overflow-y-auto'>
                      <img
                        src={cleanUrl(item.link)}
                        alt={item.alt}
                        title={item.alt}
                        className='h-full w-full center'
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
