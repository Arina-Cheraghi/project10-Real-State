import React from "react";
import "../../App.css";
import CategorySlider from "../Categories/CategorySlider";
import WelcomePge from "./WelcomePge"; // تغییر مسیر به این شکل
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const getAllSubCategories = (categories, parentId) => {
  const subCategories = categories.filter(category => category.parent_id === parentId);
  let allSubCategories = [...subCategories];

  subCategories.forEach(subCategory => {
    allSubCategories = [
      ...allSubCategories,
      ...getAllSubCategories(categories, subCategory.category_id),
    ];
  });

  return allSubCategories;
};

export default function Home({ isDarkMode, categories }) {
  // فیلتر کردن دسته‌بندی‌های اصلی برای فروش و اجاره
  const saleCategory = categories.find(category => category.title === "فروش");
  const rentCategory = categories.find(category => category.title === "رهن و اجاره");

  const saleSubCategories = saleCategory ? getAllSubCategories(categories, saleCategory.category_id) : [];
  const rentSubCategories = rentCategory ? getAllSubCategories(categories, rentCategory.category_id) : [];

  return (
    <div className={`flex flex-col items-center h-full relative ${isDarkMode ? "bg-[#283618]" : "bg-[#FEFAE0]"}`}>
      <WelcomePge isDarkMode={isDarkMode} />
      
      <div className="my-5">
        <h2 className="text-center text-lg font-bold">فروش</h2>
        <CategorySlider categories={saleSubCategories} />
      </div>

      <div className="my-5">
        <h2 className="text-center text-lg font-bold">اجاره</h2>
        <CategorySlider categories={rentSubCategories} />
      </div>
    </div>
  );
}


// function Home({ isDarkMode, categories }) {
//   return (
//     <div
//       className={`flex flex-col items-center h-full relative ${
//         isDarkMode ? "bg-[#283618]" : "bg-[#FEFAE0]"
//       }`}
//     >
//       <WelcomePge isDarkMode={isDarkMode} />
//       <CategorySlider categories={categories} />
     
//     </div>
//   );
// }

// export default Home;
