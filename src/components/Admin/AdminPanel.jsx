

// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { Home, Users, Building, Settings, Bookmark, ScrollText, UserIcon, Paperclip, File, Menu } from 'lucide-react';

// export default function AdminPanel({ isDarkMode, categories, onUpdate }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const navItems = [
//     { to: "dashboard", label: "داشبورد", icon: Home },
//     { to: "profile", label: "پروفایل", icon: UserIcon },
//     { to: "categoryList", label: "دسته بندی ها", icon: Paperclip },
//     { to: "file", label: "مدیریت فایل ", icon: File },
//     { to: "users", label: "مدیریت کاربران", icon: Users },
//     { to: "properties", label: "مدیریت املاک", icon: Building },
//     { to: "favorites", label: "نشان شده‌ها", icon: Bookmark },
//     { to: "ads", label: "آگهی‌ها", icon: ScrollText },
//     { to: "settings", label: "تنظیمات سایت", icon: Settings },
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div
//       className={`transition-all flex h-screen ${
//         isDarkMode
//           ? "bg-[#232f15] text-[#FEFAE0]"
//           : "bg-[#ffe9cbbe] text-gray-900"
//       }`}
//     >
//       {/* Sidebar toggle button for mobile */}
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-2 right-1 z-50 md:hidden"
//         aria-label="Toggle Sidebar"
//       >
//         <Menu className="w-6 h-6" />
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`w-64 h-full fixed md:relative transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? 'right-0' : '-right-64'
//         } md:right-0 ${
//           isDarkMode ? "bg-[#232f15]" : "bg-[#ffe9cb]"
//         } shadow-lg z-40`}
//       >
//         <div className="p-4 border-b border-gray-200 dark:border-[#002400]">
//           <h1 className="text-2xl font-bold">پنل ادمین</h1>
//         </div>
//         <nav className="mt-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               className={`flex items-center p-4 transition-all duration-200  ${
//                 isDarkMode ? "hover:bg-[#002400]" : "hover:bg-[#7B904B]"
//               }`}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <item.icon className="w-5 h-5 ml-3" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main
//         className={`flex-1 pt-14 w-full md:w-3/4 p-8 overflow-auto transition-all duration-300 ${
//           isDarkMode ? "bg-[#28361875]" : "bg-[#ffe9cb]"
//         } ${isSidebarOpen ? 'mr-64' : 'mr-0'} md:mr-0`}
//       >
//         <Outlet context={{ categories, isDarkMode, onUpdate }} />
//       </main>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Home, Users, Building, Settings, Bookmark, ScrollText, UserIcon, Paperclip, File, Menu, X } from 'lucide-react';

export default function AdminPanel({ isDarkMode, categories, onUpdate }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { to: "dashboard", label: "داشبورد", icon: Home },
    { to: "profile", label: "پروفایل", icon: UserIcon },
    { to: "categoryList", label: "دسته بندی ها", icon: Paperclip },
    { to: "file", label: "مدیریت اپشن ها ", icon: File },
    { to: "users", label: "مدیریت کاربران", icon: Users },
    { to: "properties", label: "مدیریت املاک", icon: Building },
    { to: "favorites", label: "نشان شده‌ها", icon: Bookmark },
    { to: "ads", label: "آگهی‌ها", icon: ScrollText },
    { to: "settings", label: "تنظیمات سایت", icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`transition-all flex h-screen ${
        isDarkMode
          ? "bg-[#232f15] text-[#FEFAE0]"
          : "bg-[#ffe9cbbe] text-gray-900"
      }`}
    >
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 transition-all lg:hidden duration-300 ease-in-out ${
          isSidebarOpen
            ? 'right-[220px] top-4 md:hidden'
            : 'top-4 right-4'
        }`}
        aria-label="Toggle Sidebar"
      >
        <div className="relative w-6 h-6">
          <Menu className={`absolute inset-0 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-0' : 'opacity-100'
          }`} />
          <X className={`absolute inset-0 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 h-full lg:top-20 z-0 fixed md:relative transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'right-0' : '-right-64'
        } md:right-0 ${
          isDarkMode ? "bg-[#232f15]" : "bg-[#ffe9cb]"
        } shadow-lg z-40`}
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
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 ml-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 mt-14 w-full md:w-3/4 p-8 overflow-auto transition-all duration-300 ${
          isDarkMode ? "bg-[#28361875]" : "bg-[#ffe9cb]"
        } ${isSidebarOpen ? 'mr-64' : 'mr-0'} md:mr-0`}
      >
        <Outlet context={{ categories, isDarkMode, onUpdate }} />
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

