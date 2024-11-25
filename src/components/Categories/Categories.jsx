import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "../../App.css";

function StickyItem({ index, category, isDarkMode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, index * 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - index * 0.1]);
  const top = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [
      index === 0 ? "2rem" : "0",
      "5rem",
      "5rem",
      index === 3 ? "-100%" : "5rem",
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, top }}
      className={`flex justify-evenly ${
        isDarkMode ? "bg-[#7B904B]" : "bg-[#ffe9cb]"
      } rounded-lg p-4 shadow-md text-center mb-2 sticky w-2/3 mx-auto`}
    >
      <img
        src={category.imgSrc}
        alt={category.title}
        className="w-3/5 rounded-lg"
      />
      <div className="flex flex-col justify-evenly">
        <h3 className="mt-2 text-lg font-semibold text-gray-800">
          {category.title}
        </h3>
        <p className="text-gray-600">{category.description}</p>
        <Link
          to={category.link}
          className="Button mt-2 text-white rounded w-1/2 mx-auto px-4 py-2 transition duration-300"
        >
          مشاهده بیشتر
        </Link>
      </div>
    </motion.div>
  );
}

export default function StickyItems({ categories = [], isDarkMode }) { 
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative">
      <div className="h-[200vh] mt-10">
        {categories.map((category, index) => (
          <StickyItem
            key={category.id}
            index={index}
            category={category}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
      <div className="xl:h-[30vh] md:h-0 h-20vh" />
    </div>
  );
}
