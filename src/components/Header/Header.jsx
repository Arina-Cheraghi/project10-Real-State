import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightLogo from "../../assets/1-light.webp";
import DarkLogo from "../../assets/1-dark.webp";
import { Search, User, X, ChevronDown, Power } from 'lucide-react';
import axios from 'axios';

function Header({ isDarkMode, categories = [], updateFlag }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "کاربر");

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setUserName(localStorage.getItem("userName") || "کاربر");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);


  const handleCategoryMouseEnter = (categoryId) => {
    const filteredSubCategories = categories.filter(
      (category) => category.parent_id === categoryId
    );

    setSubCategories(filteredSubCategories);
    setActiveCategoryId(categoryId);
    setActiveSubCategoryId(null);
    setSubSubCategories([]);
  };

  const handleSubCategoryMouseEnter = (subCategoryId) => {
    const filteredSubSubCategories = categories.filter(
      (category) => category.parent_id === subCategoryId
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className={`transition-all ${window.innerWidth < 640 ? "flex" : "fixed"} w-full z-10 ${isDarkMode ? "bg-[#002400] text-white" : "bg-[#7B904B] text-black"}`}>
        <div className="w-full mr-5 md:w-11/12 sm:w-11/12 flex items-center justify-between py-1 px-4">
          <div className="w-1/6 flex ">
            <Link to="/" className="w-full sm:w-1/2">
              <picture>
                <source media="(prefers-color-scheme: dark)" />
                <img src={isDarkMode ? LightLogo : DarkLogo} alt="Logo" className="transition-all duration-300 ease-in-out" />
              </picture>
            </Link>
          </div>

          <nav className="w-1/5 justify-between flex relative" ref={dropdownRef}>
            {categories
              .filter((category) => category.parent_id === null)
              .map((category) => (
                <div
                  key={category.category_id}
                  className="relative transition-all"
                  onMouseEnter={() => handleCategoryMouseEnter(category.category_id)}
                >
                  <a href="#" className="hover:scale-110 transition-all m-0 flex items-center">
                    <img src={category.image} alt={category.title} className="w-6 h-6 mr-2" />
                    {category.title}
                  </a>
                  {activeCategoryId === category.category_id && subCategories.length > 0 && (
                    <div className="absolute z-10 bg-[#e0c19d] w-32 m-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                      {subCategories.map((subCategory) => (
                        <div
                          key={subCategory.category_id}
                          onMouseEnter={() => handleSubCategoryMouseEnter(subCategory.category_id)}
                          className="relative"
                        >
                          <a
                            href="#"
                            className="flex transition-all flex-col rounded-lg p-2 hover:bg-[#606C38] hover:text-white"
                          >
                            <img src={subCategory.image} alt={subCategory.title} className="w-4 h-4 mr-2" />
                            {subCategory.title}
                          </a>
                          {activeSubCategoryId === subCategory.category_id && subSubCategories.length > 0 && (
                            <div className="absolute right-full top-0 z-20 m-1 bg-[#e0c19d] w-40 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
                              {subSubCategories.map((subSubCategory) => (
                                <a
                                  href="#"
                                  key={subSubCategory.category_id}
                                  className="flex transition-all flex-col rounded-lg p-2 hover:bg-[#606C38] hover:text-white"
                                >
                                  <img src={subSubCategory.image} alt={subSubCategory.title} className="w-4 h-4 mr-2" />
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
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Search
                className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 ease-in-out transform group-hover:scale-110`}
              />
            </div>
          </div>

          <div className="relative flex items-center">
            <User
              className={`w-6 h-6 cursor-pointer ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 ease-in-out hover:scale-110`}
              onClick={handleUserIconClick}
            />
            {isLoggedIn && (
              <span className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                {userName || "کاربر"}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 cursor-pointer ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : ''}`}
              onClick={handleUserIconClick}
            />
            {isDropdownOpen && isLoggedIn && (
              <div className={`absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg z-20 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'} ${isDarkMode ? 'bg-[#002400] text-white' : 'bg-white text-black'}`}>
                <Link
                  to="/admin"
                  className={`flex rounded-md justify-between w-full text-right px-4 py-2 text-sm hover:bg-[#7B904B] transition-colors duration-150 ${isDarkMode ? 'hover:bg-[#444444]' : ''}`}
                >
                  <span><User /></span>

                  <span className="w-full mx-2">پنل کاربری</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex rounded-md justify-between w-full text-right px-4 py-2 text-sm hover:bg-[#7B904B] transition-colors duration-150 ${isDarkMode ? 'hover:bg-[#444444]' : ''}`}
                >
                  <span><Power /></span>
                  <span className="w-full mx-2">خروج</span>
                </button>
              </div>
            )}
          </div>

          <div className="sm:w-1/6 w-2/6 flex justify-center items-center">
            <select
              className={`px-2 w-1/2 py-1 border cursor-pointer rounded transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-opacity-50 ${isDarkMode ? "bg-[#606C38] border-[#606C38] text-white focus:ring-[#DDA15E] hover:bg-[#4a5a2a]" : "bg-[#F3F3E0] text-black focus:ring-[#7B904B] hover:bg-[#e6e6d1]"} outline-none mr-4`}
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

      {/* Modal for Search */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
          <div
            ref={modalRef}
            className={`${isDarkMode ? 'bg-green-900 text-white' : 'bg-green-100 text-green-900'} p-6 rounded-lg shadow-xl w-2/3 max-w-md transform transition-all duration-300 ease-in-out ${isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">جستجو</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1 rounded-full transition-colors duration-200 ${isDarkMode
                  ? 'text-green-300 hover:bg-green-800'
                  : 'text-green-700 hover:bg-green-200'
                  }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو..."
                  className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isDarkMode
                    ? 'bg-green-800 text-white placeholder-green-300 focus:ring-green-500'
                    : 'bg-white text-green-900 placeholder-green-500 focus:ring-green-300'
                    } transition-colors duration-200`}
                />
                <Search className={`absolute right-3 top-2.5 h-5 w-5 ${isDarkMode ? 'text-green-300' : 'text-green-500'}`} />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`w-full px-4 py-2 rounded-md transition-colors duration-200 ${isDarkMode
                    ? 'bg-green-600 text-white hover:bg-green-500'
                    : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                  جستجو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

