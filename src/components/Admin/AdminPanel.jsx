

import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  Settings,
  Bookmark,
  ScrollText,
  UserIcon,
  Paperclip,
  File
} from "lucide-react";

export default function AdminPanel({ isDarkMode, categories, onUpdate }) {
  const navItems = [
    { to: "dashboard", label: "داشبورد", icon: Home },
    { to: "profile", label: "پروفایل", icon: UserIcon },
    { to: "categoryList", label: "دسته بندی ها", icon: Paperclip },
    { to: "file", label: "مدیریت فایل ", icon: File },
    { to: "users", label: "مدیریت کاربران", icon: Users },
    { to: "properties", label: "مدیریت املاک", icon: Building },
    { to: "favorites", label: "نشان شده‌ها", icon: Bookmark },
    { to: "ads", label: "آگهی‌ها", icon: ScrollText },
    { to: "settings", label: "تنظیمات سایت", icon: Settings },
  ];

  return (
    <div
      className={`transition-all flex h-screen ${
        isDarkMode
          ? "bg-[#232f15] text-[#FEFAE0]"
          : "bg-[#ffe9cbbe] text-gray-900"
      }`}
    >
      <aside
        className={`w-64 ${
          isDarkMode ? "bg-[#232f15]" : "bg-[#ffe9cb]"
        } shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-[#002400]">
          <h1 className="text-2xl font-bold">پنل ادمین</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center p-4 transition-all duration-200  ${
                isDarkMode ? "hover:bg-[#002400]" : "hover:bg-[#7B904B]"
              }`}
            >
              <item.icon className="w-5 h-5 ml-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main
        className={`flex-1 overflow-auto p-8 ${
          isDarkMode ? "bg-[#28361875]" : "bg-[#ffe9cb ]"
        }`}
      >
        <Outlet context={{ categories, isDarkMode, onUpdate }} />
      </main>
    </div>
  );
}

