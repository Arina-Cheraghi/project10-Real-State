import React, { useState } from "react";

function Features({ isDarkMode, features }) {
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (featureId, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [featureId]: value,
    }));
    // console.log(`Feature ID: ${featureId}, Value: ${value}`);
  };

  const uniqueFeatures = [
    {
      title: "آسانسور",
      yes: features.find(feature => feature.title === "آسانسور" && feature.value === "yes"),
      no: features.find(feature => feature.title === "آسانسور" && feature.value === "no"),
    },
    {
      title: "انباری",
      yes: features.find(feature => feature.title === "انباری" && feature.value === "yes"),
      no: features.find(feature => feature.title === "انباری" && feature.value === "no"),
    },
    {
      title: "پارکینگ",
      yes: features.find(feature => feature.title === "پارکینگ" && feature.value === "yes"),
      no: features.find(feature => feature.title === "پارکینگ" && feature.value === "no"),
    },
  ];

  return (
    <div
      className={`space-y-4 flex flex-col w-full mx-auto p-6 rounded-lg shadow-md ${
        isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">ویژگی ها</h2>

      {uniqueFeatures.map((feature) => (
        feature.yes && feature.no ? (
          <div key={feature.yes.feature_id} className="space-y-2 border-b pb-4">
            <h6 className="text-lg font-semibold">{feature.title}</h6>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={feature.title}
                  value="yes"
                  checked={selectedValues[feature.yes.feature_id] === "yes"}
                  onChange={() => handleChange(feature.yes.feature_id, "yes")}
                  className="mr-2"
                />
                دارد
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={feature.title}
                  value="no"
                  checked={selectedValues[feature.no.feature_id] === "no"}
                  onChange={() => handleChange(feature.no.feature_id, "no")}
                  className="mr-2"
                />
                ندارد
              </label>
            </div>
          </div>
        ) : null
      ))}
    </div>
  );
}

export default Features;

// import React, { useState } from "react";
// import data from "../../../data/data.json"; // مسیر فایل JSON

// function Features({ isDarkMode }) {
//   const [selectedValues, setSelectedValues] = useState({});

//   const handleChange = (featureId, value) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [featureId]: value,
//     }));
//     console.log(`Feature ID: ${featureId}, Value: ${value}`);
//   };

//   const uniqueFeatures = [
//     {
//       title: "آسانسور",
//       yes: data.features.find(
//         (feature) => feature.title === "elevator" && feature.value === "yes"
//       ),
//       no: data.features.find(
//         (feature) => feature.title === "elevator" && feature.value === "no"
//       ),
//     },
//     {
//       title: "انباری",
//       yes: data.features.find(
//         (feature) => feature.title === "garage" && feature.value === "yes"
//       ),
//       no: data.features.find(
//         (feature) => feature.title === "garage" && feature.value === "no"
//       ),
//     },
//     {
//       title: "پارکینگ",
//       yes: data.features.find(
//         (feature) => feature.title === "parking" && feature.value === "yes"
//       ),
//       no: data.features.find(
//         (feature) => feature.title === "parking" && feature.value === "no"
//       ),
//     },
//   ];

//   return (
//     <div
//       className={`space-y-4 flex flex-col w-full mx-auto p-6 rounded-lg shadow-md ${
//         isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-black"
//       }`}
//     >
//       <h2 className="text-2xl font-semibold mb-4">ویژگی ها</h2>

//       {uniqueFeatures.map((feature) =>
//         feature.yes && feature.no ? (
//           <div key={feature.yes.feature_id} className="space-y-2 border-b pb-4">
//             <h6 className="text-lg font-semibold">{feature.title}</h6>
//             <div className="flex items-center space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name={feature.title}
//                   value="yes"
//                   checked={selectedValues[feature.yes.feature_id] === "yes"}
//                   onChange={() => handleChange(feature.yes.feature_id, "yes")}
//                   className="mr-2"
//                 />
//                 دارد
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name={feature.title}
//                   value="no"
//                   checked={selectedValues[feature.no.feature_id] === "no"}
//                   onChange={() => handleChange(feature.no.feature_id, "no")}
//                   className="mr-2"
//                 />
//                 ندارد
//               </label>
//             </div>
//           </div>
//         ) : null
//       )}
//     </div>
//   );
// }

// export default Features;
