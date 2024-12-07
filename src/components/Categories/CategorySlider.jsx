import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "./category.css";

export default function CategorySlider({ categories }) {
  return (
    <div className="w-full md:w-1/2 h-fit my-5">
      <p className="p-border w-1/3 mx-auto my-5 text-center">دسته بندی ها</p>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.category_id} className="flex flex-col justify-center rounded-lg">
            <div className="flex flex-col justify-evenly h-full w-5/6 mx-auto items-center">
              <img
                src={category.image} 
                alt={category.title}
              />
              <h2>آگهی های {category.title}</h2>
              <a className='Button text-xs' href="#">مشاهده بیشتر</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
