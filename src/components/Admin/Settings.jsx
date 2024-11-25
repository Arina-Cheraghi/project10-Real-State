import React from "react";
import { Save } from "lucide-react";

export default function Settings({isDarkMode}) {
  return (
    <div className={`${isDarkMode?"text-[#FEFAE0]":"text-[#002400]"} space-y-6`}>
      <h2 className="text-3xl font-semibold">تنظیمات</h2>
      <p>
        اینجا می‌توانید تنظیمات سایت را ویرایش کنید.
      </p>
      <div className={`${isDarkMode ? "bg-[#606C38]" : "bg-[#FEFAE0]"} rounded-lg shadow-md overflow-hidden p-6`}>
        <h3 className="text-2xl mb-4">تنظیمات عمومی</h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="siteName"
              className="block text-sm font-medium  mb-1"
            >
              نام سایت:
            </label>
            <input
              type="text"
              id="siteName"
              className={`w-full px-3 py-2 placeholder:text-[#002400] border ${isDarkMode? "bg-[#7B904B]": "bg-[#FEFAE0]"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B904B]`}
              placeholder="نام سایت"
            />
          </div>
          <div>
            <label
              htmlFor="supportEmail"
              className="block text-sm font-medium  mb-1"
            >
              ایمیل پشتیبانی:
            </label>
            <input
              type="email"
              id="supportEmail"
              className={`w-full px-3 placeholder:text-[#002400] py-2 border ${isDarkMode? "bg-[#7B904B]": "bg-[#FEFAE0]"} rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B904B] `}
              placeholder="ایمیل پشتیبانی"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#7B904B] text-white rounded-md hover:bg-[#002400] transition-colors duration-200 flex items-center"
          >
            <Save className="w-5 h-5 ml-2" />
            ذخیره تنظیمات
          </button>
        </form>
      </div>
    </div>
  );
}
