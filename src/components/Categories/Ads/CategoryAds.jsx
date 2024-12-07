import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IMG10 from "../../../assets/2-7.jpg";
import "./scrollAnimations.css";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

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
  const { category_id } = useParams();
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://192.168.10.213:8000/api/file/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        setAds(data);
      } catch (error) {
        console.error( error);
      }
    };

    fetchAds();
  }, [category_id]);

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
          آگهی‌های
          {/* {categories.find((cat) => cat.id === parseInt(categoryId)).title} */}
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
              initial={{ scale: 0.9 }}
            >
              <img
                src={selectedAd.image}
                alt="selectedAd"
                className="w-full h-auto object-cover mb-4 rounded"
              />
              <div className="flex justify-between w-full">
                <div>
                  <h3 className="text-xl font-semibold mb-3">{selectedAd.title}</h3>
                  <p className="text-sm mb-4">{selectedAd.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`px-4 py-0 rounded-full h-2/3 my-auto ${
                    isDarkMode
                      ? "bg-[#DDA15E] text-[#283618] hover:bg-[#BC6C25]"
                      : "bg-[#606C38] text-white hover:bg-[#283618]"
                  } transition-colors duration-300`}
                >
                  {isBookmarked ? (
                    <BsBookmarkCheckFill className="text-2xl" />
                  ) : (
                    <BsBookmark className="text-2xl" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
