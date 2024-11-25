import React from "react";
import Select from "react-select";

function PropertyLocation({ isDarkMode }) {
  return (
    <div className={`my-4 flex flex-col w-1/2 sm:w-1/2 xl:w-1/3 mx-auto ${isDarkMode ? 'bg-[#002400] text-white' : 'bg-[#FEFAE0] text-black'}`}>
      <h4 className="text-xl">موقعیت ملک</h4>
      <label className="mb-2">شهر</label>
      <Select className="text-slate-800 rounded mb-4 focus:outline-none"
        style={{ zIndex: 1 }}
        options={[
          { value: "تهران", label: "تهران" },
          { value: "مشهد", label: "مشهد" },
          { value: "اصفهان", label: "اصفهان" },
          { value: "شیراز", label: "شیراز" },
          { value: "تبریز", label: "تبریز" },
          { value: "اهواز", label: "اهواز" },
          { value: "کرج", label: "کرج" },
          { value: "قم", label: "قم" },
          { value: "زنجان", label: "زنجان" },
          { value: "کرمان", label: "کرمان" },
        ]}
        placeholder="انتخاب کنید"
        menuPlacement="top"
      />
      <label>محله</label>
      <input type="text" placeholder="محله" className="bg-slate-400 text-slate-800 rounded mb-4 p-2 focus:outline-none" />
    </div>
  );
}

export default PropertyLocation;
