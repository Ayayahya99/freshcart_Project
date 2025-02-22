import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/assets/images/slider-image-3.jpeg";

import banner1 from "../../assets/assets/images/grocery-banner.png";
import banner2 from "../../assets/assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";
export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="flex  mt-8 mb-4">
        <div className="w-3/4">
        <Slider {...settings} className="h-full">
           
              <img src={slide1} className=" w-full h-[400px]  " alt="Slide 1" />
           
           
              <img src={slide2} className=" w-full h-[400px] " alt="Slide 2" />
           
           
              <img src={slide3} className=" w-full h-[400px] " alt="Slide 3" />
           
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={banner1} className=" w-full h-[200px] " alt="" />
          <img src={banner2} className=" w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
}
