import React from "react";

function Features({ isDarkMode }) {
  return (
    <div
      className={`space-y-4 flex flex-col w-full mx-auto ${
        isDarkMode ? " text-white" : " text-black"
      }`}
    >
      <h2 className="text-2xl font-semibold">ویژگی ها</h2>
      <textarea
        placeholder="ویژگی های ملک را وارد کنید..."
        className={`w-full h-32 p-2 rounded-md ${
          isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"
        }`}
      />
    </div>
  );
}

export default Features;
