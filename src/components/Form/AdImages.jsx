import React from "react";
import { IoImagesOutline } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";



function AdImages({ isDarkMode, images, setImages }) {
  const handleImageUpload = (event) => {
    const files = event.target.files
    if (files) {
      setImages(prevImages => [...prevImages, ...Array.from(files)].slice(0, 10))
    }
  }
  return (
    <div className="space-y-4">
          <h2 className="text-2xl font-semibold">عکس آگهی</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className={`aspect-square rounded-md overflow-hidden ${isDarkMode ? 'bg-[#273B09]' : 'bg-[#7B904B]'}`}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {images.length < 10 && (
              <label
                htmlFor="image-upload"
                className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer ${
                  isDarkMode ? 'bg-[#273B09] hover:bg-[#58641D]' : 'bg-[#7B904B] hover:bg-[#58641D]'
                }`}
              >
                <IoImagesOutline className="w-8 h-8 mb-2" />
                <FaCirclePlus className="w-6 h-6" />
                <span className="sr-only">Upload image</span>
              </label>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <p className="text-sm">تعداد عکس‌های انتخاب شده نباید بیشتر از 10 باشد.</p>
        </div>
  );
}

export default AdImages;
