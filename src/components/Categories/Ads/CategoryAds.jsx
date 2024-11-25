import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IMG10 from "../../../assets/2-7.jpg";
import "./scrollAnimations.css";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

const mockAds = {
  1: [
    {
      id: 1,
      title: "دفتر اداری مرکز شهر",
      description: "دفتر اداری 100 متری در مرکز شهر",
    },
    {
      id: 2,
      title: "مجتمع اداری مدرن",
      description: "واحد اداری 80 متری در مجتمع مدرن",
    },
    {
      id: 9,
      title: "دفتر کار اشتراکی",
      description: "فضای کار اشتراکی 50 متری در منطقه تجاری",
    },
    {
      id: 10,
      title: "ساختمان اداری لوکس",
      description: "طبقه کامل 300 متری در برج اداری",
    },
    {
      id: 11,
      title: "دفتر کار با منظره",
      description: "دفتر 120 متری با چشم‌انداز شهر",
    },
    {
      id: 12,
      title: "مرکز تجاری نوساز",
      description: "واحد 70 متری در مجتمع تجاری جدید",
    },
  ],
  2: [
    {
      id: 3,
      title: "آپارتمان دو خوابه",
      description: "آپارتمان دو خوابه 90 متری در منطقه خوش نشین",
    },
    {
      id: 4,
      title: "خانه ویلایی",
      description: "خانه ویلایی 200 متری با حیاط بزرگ",
    },
    {
      id: 13,
      title: "سوئیت مجردی",
      description: "سوئیت 40 متری مناسب برای دانشجویان",
    },
    {
      id: 14,
      title: "پنت‌هاوس لوکس",
      description: "پنت‌هاوس 180 متری با تراس اختصاصی",
    },
    {
      id: 15,
      title: "آپارتمان سه خوابه",
      description: "آپارتمان 120 متری در مجتمع مسکونی",
    },
    {
      id: 16,
      title: "خانه دوبلکس",
      description: "خانه دوبلکس 150 متری با پارکینگ اختصاصی",
    },
  ],
  3: [
    {
      id: 5,
      title: "زمین کشاورزی",
      description: "زمین کشاورزی 1000 متری با دسترسی به ب",
    },
    {
      id: 6,
      title: "زمین مسکونی",
      description: "زمین مسکونی 300 متری در بهترین منطقه شهر",
    },
    {
      id: 17,
      title: "زمین تجاری",
      description: "زمین 500 متری با کاربری تجاری در خیابان اصلی",
    },
    {
      id: 18,
      title: "باغ میوه",
      description: "باغ 2000 متری با درختان میوه متنوع",
    },
    {
      id: 19,
      title: "زمین صنعتی",
      description: "زمین 5000 متری مناسب برای احداث کارخانه",
    },
    {
      id: 20,
      title: "زمین ساحلی",
      description: "زمین 800 متری با دسترسی مستقیم به ساحل",
    },
  ],
  4: [
    {
      id: 7,
      title: "سوئیت مبله",
      description: "سوئیت مبله 50 متری برای اجاره روزانه",
    },
    {
      id: 8,
      title: "ویلای ساحلی",
      description: "ویلای ساحلی 150 متری برای اجاره روزانه",
    },
    {
      id: 21,
      title: "آپارتمان مبله",
      description: "آپارتمان مبله 80 متری در مرکز شهر",
    },
    {
      id: 22,
      title: "کلبه جنگلی",
      description: "کلبه چوبی 60 متری در دل جنگل",
    },
    {
      id: 23,
      title: "خانه روستایی",
      description: "خانه سنتی 100 متری در روستای گردشگری",
    },
    {
      id: 24,
      title: "سوئیت لوکس",
      description: "سوئیت 70 متری با امکانات رفاهی کامل",
    },
  ],
};

function ScrollCard({ ad, index, isDarkMode, openModal }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`mb-8 mx-auto px-6 py-3 rounded-lg flex flex-col items-center w-3/4 shadow-lg h-[500px] ${
        isDarkMode
          ? "bg-[#7B904B] hover:bg-[#606C38]"
          : "bg-white hover:bg-gray-50"
      } transition-all duration-300 ease-in-out transform hover:scale-105 ${
        index % 2 === 0 ? "slide-right" : "slide-left"
      }`}
    >
      <img
        src={IMG10}
        alt="img"
        className="w-full h-auto object-cover mb-4 rounded"
      />
      <div className="flex justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold mb-3">{ad.title}</h3>
          <p className="text-sm mb-4">{ad.description}</p>
        </div>
        <button
          type="button"
          onClick={() => openModal(ad)}
          className={`px-4 py-0 rounded-full h-2/3 my-auto ${
            isDarkMode
              ? "bg-[#DDA15E] text-[#283618] hover:bg-[#BC6C25]"
              : "bg-[#606C38] text-white hover:bg-[#283618]"
          } transition-colors duration-300`}
        >
          جزئیات بیشتر
        </button>
      </div>
    </div>
  );
}

export default function CategoryAds({ isDarkMode, categories }) {
  const { categoryId } = useParams();
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setAds(mockAds[categoryId] || []);
  }, [categoryId]);

  const openModal = (ad) => {
    setSelectedAd(ad);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
  };

  return (
    <div
      className={`p-4 ${
        isDarkMode
          ? "bg-[#283618] text-[#FEFAE0]"
          : "bg-[#FEFAE0] text-[#283618]"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          آگهی‌های{" "}
          {categories.find((cat) => cat.id === parseInt(categoryId)).title}
        </h2>
        <div className="mb-20">
          {ads.map((ad, index) => (
            <ScrollCard
              key={ad.id}
              ad={ad}
              index={index}
              isDarkMode={isDarkMode}
              openModal={openModal}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`w-full max-w-xl h-auto ${
                isDarkMode
                  ? "bg-[#606C38] text-[#FEFAE0]"
                  : "bg-[#FEFAE0] text-[#283618]"
              } rounded-lg shadow-xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button
                  onClick={closeModal}
                  className={`absolute top-2 right-2 ${
                    isDarkMode
                      ? "text-[#FEFAE0] hover:text-[#DDA15E]"
                      : "text-[#283618] hover:text-[#606C38]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                  }}
                  className={`absolute top-5 left-5 text-2xl ${
                    isDarkMode
                      ? isBookmarked
                        ? "text-[#DDA15E]"
                        : "text-[#FEFAE0] hover:text-[#DDA15E]"
                      : isBookmarked
                      ? "text-[#DDA15E]"
                      : "text-[#283618] hover:text-[#606C38]"
                  }`}
                >
                  {isBookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />}
                </button>
                <img
                  src={IMG10}
                  alt={selectedAd.title}
                  className="w-full h-auto mt-7 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-4">{selectedAd.title}</h3>
                <p className="text-md mb-4">{selectedAd.description}</p>

                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Adipisci corporis necessitatibus, pariatur natus aliquam
                  molestias sapiente cupiditate ea reiciendis nesciunt
                  voluptatem! Voluptatibus culpa reiciendis odit soluta. Cumque
                  mollitia eveniet laborum!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
