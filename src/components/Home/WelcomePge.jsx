import React, { useEffect, useState } from "react";
import DarkImg from "../../assets/img-dark.jpg";
import LightImg from "../../assets/img-light.jpg";
import { Link } from "react-router-dom";

function WelcomePge({isDarkMode}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [imageOpacity, setImageOpacity] = useState(1);
  useEffect(() => {
    const items = ["h1", "p", "adminLink", "formLink"];
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item]);
      }, index * 200);
    });
  }, []);

  useEffect(() => {
    setImageOpacity(0);
    const timer = setTimeout(() => {
      setImageOpacity(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [isDarkMode]);
  return (
    <>
      <div
        className="transition-opacity duration-500 w-full"
        style={{ opacity: imageOpacity }}
      >
        <img
          src={isDarkMode ? DarkImg : LightImg}
          alt="Background"
          className="w-full"
        />
      </div>
      <div className="absolute xl:top-40 top-10 transform text-center">
        <h1
          className={`text-xl xl:text-3xl font-bold rounded p-2 mb-4 transition-all duration-500 ${
            visibleItems.includes("h1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          } ${isDarkMode ? "bg-[#0024009a]" : "bg-[#7b904b97]"}`}
        >
          خوش آمدید به وب‌سایت ما!
        </h1>
        <p
          className={`text-sm xl:text-md p-2 mb-4 rounded transition-all duration-500 ${
            visibleItems.includes("p")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          } ${isDarkMode ? "bg-[#0024009a]" : "bg-[#7b904b97]"}`}
        >
          لطفاً از منوی کناری برای دسترسی به پنل ادمین استفاده کنید.
        </p>
        <div className="flex justify-between">
          <Link
            to="/admin"
            className={`px-4 sm:text-sm py-2 my-2 bg-[#7B904B] transition-all text-white rounded hover:bg-[#002400] duration-500 ${
              visibleItems.includes("adminLink")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            ورود به پنل ادمین
          </Link>
          <Link
            to="/form"
            className={`px-4 sm:text-sm py-2 my-2 bg-[#7B904B] transition-all text-white rounded hover:bg-[#002400] duration-500 ${
              visibleItems.includes("formLink")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            افزودن آگهی جدید
          </Link>
        </div>
      </div>
    </>
  );
}

export default WelcomePge;
