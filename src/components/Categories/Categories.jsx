// import React, { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import "../../App.css";
// import img10 from "../../assets/2-8.jpg"
// import Loader from "../Loader/Loader";

// function StickyItem({ index, category, isDarkMode }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [0, index * 50]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - index * 0.1]);
//   const top = useTransform(
//     scrollYProgress,
//     [0, 0.1, 0.9, 1],
//     [
//       index === 0 ? "2rem" : "0",
//       "5rem",
//       "5rem",
//       index === 3 ? "-100%" : "5rem",
//     ]
//   );

//   const navigate = useNavigate();

//   const handleViewMore = () => {
//     navigate(`/category-ads/${category.category_id}`);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       style={{ y, scale, top }}
//       className={`flex justify-evenly ${
//         isDarkMode ? "bg-[#7B904B]" : "bg-[#ffe9cb]"
//       } rounded-lg p-4 shadow-md text-center mb-2 sticky w-2/3 mx-auto`}
//     >
//       <img
//         // src={category.path}
//         src={img10}
//         alt={category.title}
//         className="w-3/5 rounded-lg"
//       />
//       <div className="flex flex-col justify-evenly">
//         <h3 className="mt-2 text-lg font-semibold text-gray-800">
//           {category.title}
//         </h3>
//         <p className="text-gray-600">{category.description}</p>
//         <button
//           onClick={handleViewMore}
//           className="Button mt-2 text-white rounded w-full mx-auto px-4 py-2 transition duration-300"
//         >
//           مشاهده بیشتر
//         </button>
//         <div className="mt-2">
//           {category.subCategories && category.subCategories.map((subCategory) => (
//             <div key={subCategory.id} className="text-gray-500">
//               {subCategory.title}
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function StickyItems({ categories = [], isDarkMode }) { 
//   const containerRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   const filteredCategories = categories.filter(category => {
//     return category.parent_id && 
//       ([7, 9, 12, 14].includes(category.category_id));
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setLoading(false);
//     };

//     fetchData();
//   }, [categories]);

//   return (
//     <div ref={containerRef} className="relative">
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="h-[200vh] mt-10">
//           {filteredCategories.map((category, index) => (
//             <StickyItem
//               key={category.category_id}
//               index={index}
//               category={category}
//               isDarkMode={isDarkMode}
//             />
//           ))}
//         </div>
//       )}
//       <div className="xl:h-[30vh] md:h-0 sm:h-20px" />
//     </div>
//   );
// }
