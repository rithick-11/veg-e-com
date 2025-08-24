import React from "react";
import { heroSectionData } from "../utils/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HeroSection = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <ul>
      <Slider {...settings}>
        {heroSectionData.map((item, i) => (
          <li
            key={i}
            className="bg-white p-4 h-72 shadow-md rounded-md mb-4 relative w-full shadow-gray-300"
          >
            <img src={item.imgUrl} className="absolute inset-0 w-full h-full object-cover"  />
            <div className="absolute inset-0 flex flex-col justify-center px-9 text-white">
              <h1 className="text-3xl">{item?.title}</h1>
              <p className="text-lg font-extralight">{item?.subtitle}</p>
            </div>
          </li>
        ))}
      </Slider>
    </ul>
  );
};

export default HeroSection;
