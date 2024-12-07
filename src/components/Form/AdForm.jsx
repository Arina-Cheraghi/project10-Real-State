import React, { useEffect, useState } from "react";
import AdImages from "./AdImages";
import Features from "./Features";
import MapComponent from "./MapComponent";

export default function AdForm({ isDarkMode, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://192.168.10.213:8000/api/feature/");
        const data = await response.json();
        setFeatures(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-[#58641D] text-white" : "bg-[#dfaf78a8] text-[#283618]"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">چه چیزی آگهی میکنید؟</h1>
          <p className="text-sm">
            با جستجو در کادر زیر، دسته آگهی خود را انتخاب کنید.
          </p>
          <select
            className={`w-full p-2 rounded-md ${
              isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
            }`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <MapComponent isDarkMode={isDarkMode} />

        <AdImages images={images} setImages={setImages} />

        <Features isDarkMode={isDarkMode} features={features} />

        <div className="text-center">
          <button className="w-1/3 mx-auto bg-[#273B09] text-white hover:bg-[#002400] py-2 rounded-md">
            ثبت آگهی
          </button>
        </div>
      </div>
    </div>
  );
}
