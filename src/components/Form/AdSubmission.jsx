import React from "react";

function AdSubmission({ isDarkMode }) {
  return (
    <div className="space-y-4">
    <h2 className="text-2xl font-semibold">ثبت آگهی</h2>
    <div className="relative">
      <input
        type="text"
        placeholder="عنوان آگهی"
        className={`w-full p-2 rounded-md ${
          isDarkMode
            ? "bg-[#273B09] text-white"
            : "bg-white text-[#283618]"
        }`}
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#273B09] text-white hover:bg-[#58641D] px-4 py-2 rounded-md">
        تغییر دسته بندی
      </button>
    </div>
  </div>
  );
}

export default AdSubmission;
