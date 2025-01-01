import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const CategoryAds = ({ isDarkMode }) => {
  const { category_id } = useParams();
  const [ads, setAds] = useState([]);
  const location = useLocation();
  const ad = location.state?.ad;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://192.168.10.224:8000/api/file/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAds(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, [category_id]);

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? "bg-[#283618] text-[#FEFAE0]" : "bg-[#FEFAE0] text-[#283618]"}`}>
      <h2 className="text-3xl font-bold mb-8 text-center">آگهی‌های املاک</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-1 ${
              isDarkMode 
                ? "bg-gradient-to-br from-[#7B904B] to-[#606C38] hover:from-[#606C38] hover:to-[#7B904B]" 
                : "bg-gradient-to-br from-white to-gray-100 hover:from-gray-100 hover:to-white"
            } ${index % 2 === 0 ? "slide-right" : "slide-left"}`}
          >
            <div className="relative">
              <img src={ad.image.path} alt="img" className="w-full h-56 object-cover" />
              <div className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-semibold ${
                isDarkMode ? "bg-[#DDA15E] text-[#283618]" : "bg-[#606C38] text-white"
              }`}>
                {ad.city.name}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 truncate">{ad.title}</h3>
              <p className="text-sm mb-4 line-clamp-2">{ad.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={{
                    pathname: `/ad-detail/${ad.file_id}`,
                    state: { ad }
                  }}
                  className={`px-4 py-2 rounded-full ${
                    isDarkMode 
                      ? "bg-[#DDA15E] text-[#283618] hover:bg-[#BC6C25]" 
                      : "bg-[#606C38] text-white hover:bg-[#283618]"
                  } transition-colors duration-300 transform hover:scale-105`}
                >
                  جزئیات بیشتر
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ad && (
        <div className={`mt-12 p-8 rounded-3xl shadow-2xl ${
          isDarkMode 
            ? "bg-gradient-to-br from-[#7B904B] to-[#606C38] text-[#FEFAE0]" 
            : "bg-gradient-to-br from-white to-gray-100 text-[#283618]"
        }`}>
          <h2 className="text-4xl font-bold mb-6 text-center">{ad.title}</h2>
          <img src={ad.image.path} alt={ad.title} className="w-full h-auto object-cover mb-6 rounded-xl shadow-lg" />
          <p className="text-lg mb-4 leading-relaxed">{ad.description}</p>
          <p className="text-right text-sm font-semibold">{ad.city.name}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryAds;

