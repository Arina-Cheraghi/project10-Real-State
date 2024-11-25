import React, { useState } from "react";
import AdImages from "./AdImages";
import Features from "./Features";
import MapComponent from "./MapComponent";

export default function AdForm({ isDarkMode }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);

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
            <option value="فروش اداری">فروش اداری</option>
            <option value="رهن و اجاره اداری">رهن و اجاره اداری</option>
            <option value="فروش مسکونی">فروش مسکونی</option>
            <option value="رهن و اجاره مسکونی">رهن و اجاره مسکونی</option>
            <option value="فروش باغ و ویلا">فروش باغ و ویلا</option>
            <option value="رهن و اجاره باغ و ویلا">
              رهن و اجاره باغ و ویلا
            </option>
          </select>
        </div>
        <MapComponent isDarkMode={isDarkMode} />

        <AdImages images={images} setImages={setImages} />

        <Features isDarkMode={isDarkMode} />

        <div className="text-center">
          <button className="w-1/3 mx-auto bg-[#273B09] text-white hover:bg-[#58641D] py-2 rounded-md">
            ثبت آگهی
          </button>
        </div>
      </div>
    </div>
  );
}
