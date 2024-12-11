// import React, { useEffect, useState } from "react";
// import AdImages from "./AdImages";
// import Features from "./Features";
// import MapComponent from "./MapComponent";

// export default function AdForm({ isDarkMode, categories }) {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [images, setImages] = useState([]);

//   const [features, setFeatures] = useState([]);

//   useEffect(() => {
//     const fetchFeatures = async () => {
//       try {
//         const response = await fetch("http://192.168.10.213:8000/api/category/");
//         const data = await response.json();
//         setFeatures(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching features:", error);
//       }
//     };

//     fetchFeatures();
//   }, []);

//   return (
//     <div
//       className={`min-h-screen p-4 ${
//         isDarkMode ? "bg-[#58641D] text-white" : "bg-[#dfaf78a8] text-[#283618]"
//       }`}
//     >
//       <div className="max-w-3xl mx-auto space-y-8">
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold">چه چیزی آگهی میکنید؟</h1>
//           <p className="text-sm">
//             با جستجو در کادر زیر، دسته آگهی خود را انتخاب کنید.
//           </p>
//           <select
//             className={`w-full p-2 rounded-md ${
//               isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
//             }`}
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">انتخاب کنید</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>


//         <MapComponent isDarkMode={isDarkMode} />

//         <AdImages images={images} setImages={setImages} />

//         <Features isDarkMode={isDarkMode} features={features} />

//         <div className="text-center">
//           <button className="w-1/3 mx-auto bg-[#273B09] text-white hover:bg-[#002400] py-2 rounded-md">
//             ثبت آگهی
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import AdImages from "./AdImages";
import Features from "./Features";
import MapComponent from "./MapComponent";

export default function AdForm({ isDarkMode, categories }) {
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://192.168.10.213:8000/api/feature/");
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const filteredCategoriesLevel1 = categories.filter(category => 
    !category.parent_id 
  );

  const filteredCategoriesLevel2 = categories.filter(category => 
    category.parent_id == selectedCategory1
  );

  const filteredCategoriesLevel3 = categories.filter(category => 
    category.parent_id == selectedCategory2 
  );

  const sendSelectionToBackend = async (categoryId) => {
    const selectionData = {
      category_id: categoryId,
    };

    try {
      const response = await fetch("http://192.168.10.213:8000/api/file/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit selection");
      }

      const data = await response.json();
      console.log("Selection submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting selection:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory3) {
      sendSelectionToBackend(selectedCategory3); 
    }
  }, [selectedCategory3]);

  return (
    <div
      className={`min-h-screen p-4 pt-16 ${
        isDarkMode ? "bg-[#58641D] text-white" : "bg-[#dfaf78a8] text-[#283618]"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">چه چیزی آگهی میکنید؟</h1>
          <p className="text-sm">
            با جستجو در کادر زیر، دسته آگهی خود را انتخاب کنید.
          </p>

          {/* Select اول برای لایه اول */}
          <select
            className={`w-full p-2 rounded-md ${
              isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
            }`}
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

          {/* Select دوم برای لایه دوم */}
          <select
            className={`w-full p-2 rounded-md ${
              isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
            }`}
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

          {/* Select سوم برای لایه سوم */}
          <select
            className={`w-full p-2 rounded-md ${
              isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
            }`}
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
