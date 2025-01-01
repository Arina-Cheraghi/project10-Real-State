


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import "swiper/css/navigation"; 
// import { EffectCards, Navigation } from "swiper/modules";
// import "./category.css"; // اطمینان از بارگذاری CSS

// const getImageUrl = (imageId) => {
//   return imageId ? `https://your-image-server.com/images/${imageId}.jpg` : 'default-image-url.jpg';
// };

// export default function CategorySlider({ categories: categoryList }) {
//   const updatedCategories = categoryList.map(category => ({
//     ...category,
//     image: getImageUrl(category.image_id),
//   }));

//   return (
//     <div className="w-full md:w-1/2 h-fit my-5">
//       <p className="p-border w-1/3 mx-auto my-5 text-center">دسته بندی ها</p>
//       <Swiper
//         effect={"cards"}
//         grabCursor={true}
//         navigation
//         modules={[EffectCards, Navigation]}
//         className="mySwiper"
//         loop={true}
//       >
//         {updatedCategories.map((category) => (
//           <SwiperSlide key={category.category_id} className="flex flex-col justify-center rounded-lg">
//             <div className="flex flex-col justify-evenly h-full w-5/6 mx-auto items-center">
//               <img
//                 src={category.image} 
//                 alt={category.title}
//               />
//               <h2>آگهی های {category.title}</h2>
//               <a className='Button text-xs' href="#">مشاهده بیشتر</a>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation"; 
import { EffectCards, Navigation } from "swiper/modules";
import { Link } from "react-router-dom"; // Import Link
import "./category.css"; // اطمینان از بارگذاری CSS

const getImageUrl = (imageId) => {
  return imageId ? `https://your-image-server.com/images/${imageId}.jpg` : 'default-image-url.jpg';
};

export default function CategorySlider({ categories: categoryList }) {
  const updatedCategories = categoryList.map(category => ({
    ...category,
    image: getImageUrl(category.image_id),
  }));

  return (
    <div className="w-full md:w-1/2 h-fit my-5">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        navigation
        modules={[EffectCards, Navigation]}
        className="mySwiper"
        loop={true}
      >
        {updatedCategories.map((category) => (
          <SwiperSlide key={category.category_id} className="flex flex-col justify-center rounded-lg">
            <div className="flex flex-col justify-evenly h-full w-5/6 mx-auto items-center">
              <img
                src={category.image} 
                alt={category.title}
              />
              <h2>آگهی های {category.title}</h2>
              <Link to={`/category-ads/${category.category_id}`} className='Button text-xs'>
                مشاهده بیشتر
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
