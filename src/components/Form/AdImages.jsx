// import React from "react";
// import { IoImagesOutline } from "react-icons/io5";
// import { FaCirclePlus } from "react-icons/fa6";



// function AdImages({ isDarkMode, images, setImages }) {
//   const handleImageUpload = (event) => {
//     const files = event.target.files
//     if (files) {
//       setImages(prevImages => [...prevImages, ...Array.from(files)].slice(0, 10))
//     }
//   }
//   return (
//     <>
//     <div className="space-y-4">
//           <h2 className="text-2xl font-semibold">عکس آگهی</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {images.map((image, index) => (
//               <div key={index} className={`aspect-square rounded-md overflow-hidden ${isDarkMode ? 'bg-[#273B09]' : 'bg-[#7B904B]'}`}>
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt={`Uploaded image ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//             {images.length < 10 && (
//               <label
//                 htmlFor="image-upload"
//                 className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer ${
//                   isDarkMode ? 'bg-[#273B09] hover:bg-[#58641D]' : 'bg-[#7B904B] hover:bg-[#58641D]'
//                 }`}
//               >
//                 <IoImagesOutline className="w-8 h-8 mb-2" />
//                 <FaCirclePlus className="w-6 h-6" />
//                 <span className="sr-only">Upload image</span>
//               </label>
//             )}
//           </div>
//           <input
//             id="image-upload"
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//           <p className="text-sm">تعداد عکس‌های انتخاب شده نباید بیشتر از 10 باشد.</p>
//         </div>
//         <div>
//           <textarea name="description" id="discription"></textarea>
//         </div>
//         </>
//   );
// }

// export default AdImages;


import React from "react";
import { IoImagesOutline } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";

function AdImages({ isDarkMode, images, setImages, description, setDescription }) {
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      setImages(prevImages => [...prevImages, ...Array.from(files)].slice(0, 5));
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">عکس آگهی</h2>
        <p className="text-sm text-yellow-600">توجه: فقط اولین عکس آپلود شده به عنوان تصویر اصلی آگهی استفاده خواهد شد.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className={`aspect-square rounded-md overflow-hidden ${isDarkMode ? 'bg-[#273B09]' : 'bg-[#7B904B]'} ${index === 0 ? 'border-4 border-yellow-500' : ''}`}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <div className="absolute top-0 left-0 bg-yellow-500 text-black px-2 py-1 text-xs">اصلی</div>
              )}
            </div>
          ))}
          {images.length < 5 && (
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
        <p className="text-sm">تعداد عکس‌های انتخاب شده نباید بیشتر از 5 باشد.</p>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-2xl font-semibold">توضیحات آگهی</h2>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
          rows={6}
          placeholder="توضیحات آگهی خود را وارد کنید"
        ></textarea>
      </div>
    </>
  );
}

export default AdImages;

