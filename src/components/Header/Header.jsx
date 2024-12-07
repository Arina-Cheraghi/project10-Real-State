import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightLogo from "../../assets/1-light.webp";
import DarkLogo from "../../assets/1-dark.webp";
import { Search, User } from "lucide-react";

function Header({ isDarkMode, categories = [], updateFlag }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    const filteredSubCategories = categories.filter(
      (category) => category.parent_id === String(categoryId)
    );

    setSubCategories(filteredSubCategories);
    setActiveCategoryId(categoryId);
    setActiveSubCategoryId(null);
    setSubSubCategories([]);
  };

  const handleSubCategoryClick = (subCategoryId) => {
    const filteredSubSubCategories = categories.filter(
      (category) => category.parent_id === String(subCategoryId)
    );

    setSubSubCategories(filteredSubSubCategories);
    setActiveSubCategoryId(subCategoryId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSubCategories([]);
        setSubSubCategories([]);
        setActiveCategoryId(null);
        setActiveSubCategoryId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // این اثر هر بار که updateFlag تغییر کند اجرا می‌شود
    // می‌توانید هر منطق اضافی که نیاز دارید را اینجا اضافه کنید
  }, [updateFlag]);

  return (
    <header
      className={`transition-all z-10 ${isDarkMode ? "bg-[#002400] text-white" : "bg-[#7B904B] text-black"}`}
    >
      <div className="w-full md:w-11/12 sm:w-11/12 flex items-center justify-between py-1 px-4">
        <div className="w-1/6 flex ">
          <Link to="/" className="w-full sm:w-1/2">
            <picture>
              <source media="(prefers-color-scheme: dark)" />
              <img src={isDarkMode ? LightLogo : DarkLogo} alt="Logo" />
            </picture>
          </Link>
        </div>

        <nav
          className="w-1/5 justify-between flex relative transition-all"
          ref={dropdownRef}
        >
          {categories
            .filter((category) => category.parent_id === null)
            .map((category) => (
              <div
                key={category.category_id}
                className="relative transition-all"
                onMouseEnter={() => handleCategoryClick(category.category_id)}
              >
                <a href="#" className="hover:scale-110 transition-all m-0">
                  {category.title}
                </a>
                {activeCategoryId === category.category_id &&
                  subCategories.length > 0 && (
                    <div className="absolute z-10 bg-[#e0c19d] w-32 m-2 rounded-lg">
                      {subCategories.map((subCategory) => (
                        <div
                          key={subCategory.category_id}
                          onMouseEnter={() => handleSubCategoryClick(subCategory.category_id)}
                          className="relative"
                        >
                          <a
                            href="#"
                            className="flex transition-all flex-col rounded-lg p-2 hover:bg-[#606C38]"
                          >
                            {subCategory.title}
                          </a>
                          {activeSubCategoryId === subCategory.category_id &&
                            subSubCategories.length > 0 && (
                              <div className="absolute right-full top-0 z-20 m-1 bg-[#e0c19d] w-40 rounded-lg">
                                {subSubCategories.map((subSubCategory) => (
                                  <a
                                    href="#"
                                    key={subSubCategory.category_id}
                                    className="flex transition-all flex-col rounded-lg p-2 hover:bg-[#606C38]"
                                  >
                                    {subSubCategory.title}
                                  </a>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
        </nav>

        <div className="sm:w-1/5 w-2/4 relative">
          <div
            className="flex items-center justify-end cursor-pointer group"
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            <Search
              className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 ease-in-out ${isSearchExpanded ? "opacity-0" : "opacity-100"}`}
            />

            <input
              type="text"
              placeholder="جستجو..."
              className={`px-4 py-2 rounded focus:outline-none placeholder:text-[#DDA15E] transition-all duration-300 ease-in-out transform focus:scale-105 focus:ring-2 focus:ring-opacity-50 absolute right-0 ${isSearchExpanded ? "w-full opacity-100" : "w-0 opacity-0"} ${isDarkMode ? "bg-[#606C38] text-white focus:ring-[#DDA15E]" : "text-black bg-[#F3F3E0] focus:ring-[#7B904B]"}`}
            />
          </div>
        </div>
        <div>
          <User
            className={`w-6 h-6 cursor-pointer ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 ease-in-out hover:scale-110`}
            onClick={() => navigate("/login")}
          />
        </div>

        <div className="sm:w-1/6 w-2/6 flex justify-center items-center">
          <select
            className={`px-2 w-1/2 py-1 border cursor-pointer rounded transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-opacity-50 ${isDarkMode ? "bg-[#606C38] border-[#606C38] text-white focus:ring-[#DDA15E] hover:bg-[#4a5a2a]" : "bg-[#F3F3E0] text-black focus:ring-[#7B904B] hover:bg-[#e6e6d1]" } outline-none mr-4`}
          >
            <option value="" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>
              شهر
            </option>
            <option value="city1" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>
              شهر 1
            </option>
            <option value="city2" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>
              شهر 2
            </option>
            <option value="city3" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>
              شهر 3
            </option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;

