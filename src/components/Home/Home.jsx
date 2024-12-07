import React from "react";
import "../../App.css";
import CategorySlider from "../Categories/CategorySlider";
import WelcomePge from "./WelcomePge"; // تغییر مسیر به این شکل
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

function Home({ isDarkMode, categories }) {
  return (
    <div
      className={`flex flex-col items-center h-full relative ${
        isDarkMode ? "bg-[#283618]" : "bg-[#FEFAE0]"
      }`}
    >
      <WelcomePge />
      <CategorySlider categories={categories} />
     
    </div>
  );
}

export default Home;
