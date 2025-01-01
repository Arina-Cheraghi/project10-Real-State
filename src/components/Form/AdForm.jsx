

import React, { useEffect, useState } from "react";
import AdImages from "./AdImages";
import Features from "./Features";
import MapComponent from "./MapComponent";
import { CgSlack } from "react-icons/cg";

export default function AdForm({ isDarkMode, categories }) {
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({ lat: 35.6892, lng: 51.389 });
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("1");

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://192.168.10.224:8000/api/feature/");
        const data = await response.json();
        setFeatures(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  // فیلتر کردن دسته‌بندی‌ها
  const filteredCategoriesLevel1 = categories.filter(category => category.parent === null);
  const filteredCategoriesLevel2 = categories.filter(category => category.parent && category.parent.category_id == selectedCategory1);
  const filteredCategoriesLevel3 = categories.filter(category => category.parent && category.parent.category_id == selectedCategory2);

  const handleFeaturesChange = (newFeatures) => {
    setSelectedFeatures(newFeatures);
  };

  const sendSelectionToBackend = async () => {
    setError("");
    const formData = new FormData();
    
    // اضافه کردن داده‌های پایه
    formData.append("category_id", selectedCategory3);
    formData.append("province_id", selectedProvince);
    formData.append("city_id", selectedCity);
    formData.append("address", neighborhood);
    formData.append("title", adTitle);
    formData.append("description", description);
    formData.append("location", JSON.stringify({ lat: location.lat, lng: location.lng }));
    formData.append("user_id", selectedUserId);
  
    // اضافه کردن ویژگی‌ها به FormData به صورت جداگانه
    Object.entries(selectedFeatures).forEach(([featureId, value], index) => {
      formData.append(`features[${index}][feature_id]`, featureId);
      formData.append(`features[${index}][value]`, value);
    });
  
    // اضافه کردن تصویر (در صورت وجود)
    if (images.length > 0) {
      formData.append("image", images[0]);
    }
    console.log("Data being sent to backend:", Object.fromEntries(formData));

  
    try {
      const response = await fetch("http://192.168.10.224:8000/api/file/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", response.status, errorText);
        throw new Error(`Failed to submit selection: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Selection submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting selection:", error);
      setError("خطا در ثبت آگهی. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.");
    }
  };

  return (
    <div className={`min-h-screen p-4 pt-10 md:pt-24 ${isDarkMode ? "bg-[#58641D] text-white" : "bg-[#dfaf78a8] text-[#283618]"}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">چه چیزی آگهی میکنید؟</h1>
          <p className="text-sm">با جستجو در کادر زیر، دسته آگهی خود را انتخاب کنید.</p>

          <div className="space-y-2">
            <label>انتخاب کاربر</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            >
              <option value="1">کاربر 1</option>
              <option value="2">کاربر 2</option>
            </select>
          </div>

          <select
            className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            value={selectedCategory1}
            onChange={(e) => {
              setSelectedCategory1(e.target.value);
              setSelectedCategory2("");
              setSelectedCategory3("");
            }}
          >
            <option value="">انتخاب کنید</option>
            {filteredCategoriesLevel1.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            value={selectedCategory2}
            onChange={(e) => {
              setSelectedCategory2(e.target.value);
              setSelectedCategory3("");
            }}
            disabled={!selectedCategory1}
          >
            <option value="">انتخاب کنید</option>
            {filteredCategoriesLevel2.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            value={selectedCategory3}
            onChange={(e) => setSelectedCategory3(e.target.value)}
            disabled={!selectedCategory2}
          >
            <option value="">انتخاب کنید</option>
            {filteredCategoriesLevel3.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.title}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <label>عنوان آگهی</label>
            <input
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              placeholder="عنوان را وارد کنید"
              className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            />
          </div>
        </div>

        <MapComponent 
          isDarkMode={isDarkMode} 
          setSelectedprovinceId={setSelectedProvince}
          setSelectedCity={setSelectedCity}
          setNeighborhood={setNeighborhood} 
          setLocation={setLocation}
        />
        <AdImages 
          isDarkMode={isDarkMode} 
          images={images} 
          setImages={setImages}
          description={description}
          setDescription={setDescription}
        />
        <Features 
          isDarkMode={isDarkMode} 
          features={features} 
          onFeaturesChange={handleFeaturesChange}
        />

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="text-center">
          <button 
            onClick={sendSelectionToBackend} 
            className="w-1/3 mx-auto bg-[#273B09] text-white hover:bg-[#002400] py-2 rounded-md"
          >
            ثبت آگهی
          </button>
        </div>
      </div>
    </div>
  );
}

