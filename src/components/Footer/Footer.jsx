import React from "react";
import { GrInstagram } from "react-icons/gr";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";

function Footer({ isDarkMode }) {
  return (
    <footer
      className={`${
        isDarkMode ? "z-10 bg-[#142400] text-white" : "bg-[#7B904B] text-black"
      } py-8 transition-all sticky`}
    >
      <hr className="w-full" />

      <div className=" w-full mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 w-5/6 mx-auto">
          <div className="about">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-opacity-20 border-current">
              درباره ما
            </h3>
            <p className="mb-2">
              ما یک تیم متعهد هستیم که به ارائه بهترین خدمات و محصولات به
              مشتریان خود می‌پردازیم. هدف ما ایجاد تجربه‌ای منحصر به فرد و
              رضایت‌بخش برای شماست.
            </p>
          </div>

          {/* بخش تیم ما */}
          <div className="team">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-opacity-20 border-current">
              تیم ما
            </h3>
            <p className="mb-2">
              تیم ما متشکل از متخصصان با تجربه در زمینه‌های مختلف است. ما به
              همکاری و نوآوری اعتقاد داریم و همواره در تلاش برای بهبود خدمات خود
              هستیم.
            </p>
          </div>
        </div>
        <hr className="w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10 w-5/6 mx-auto">
          <div className="contact-info">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-opacity-20 border-current">
              تماس با ما
            </h3>
            <p className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              ۰۱۲۳۴۵۶۷۸۹
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@example.com
            </p>
          </div>
          <div className="address">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-opacity-20 border-current">
              آدرس
            </h3>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              تهران، خیابان ولیعصر، پلاک ۱۰۰
            </p>
          </div>
          <div className="social-media">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 border-opacity-20 border-current">
              شبکه‌های اجتماعی
            </h3>
            <div className="flex justify-between">
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <GrInstagram className="w-6 h-6" />
                <span className="sr-only">اینستاگرام</span>
              </a>
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <FaFacebook className="w-6 h-6" />
                <span className="sr-only">فیسبوک</span>
              </a>
              <a
                href="#"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <IoLogoTwitter className="w-6 h-6" />
                <span className="sr-only">توییتر</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-opacity-20 border-current mt-8 pt-4">
        <p className="text-center text-sm">کلیه حقوق محفوظ است &copy; ۲۰۲۳</p>
      </div>
    </footer>
  );
}

export default Footer;
