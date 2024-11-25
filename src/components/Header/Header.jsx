import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightLogo from "../../assets/1-light.webp";
import DarkLogo from "../../assets/1-dark.webp";
import { Search, User } from 'lucide-react';

function Header({ isDarkMode }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className={`transition-all z-10 ${
        isDarkMode ? "bg-[#002400] text-white" : "bg-[#7B904B] text-black"
      }`}
    >
      <div className="w-full md:w-11/12 sm:w-11/12 flex items-center justify-between py-1 px-4">
        <div className="w-1/6 flex ">
          <Link to="/" className="w-full sm:w-1/2">
            <picture>
              <source media="(prefers-color-scheme: dark)" src={DarkLogo} />
              <img src={isDarkMode ? LightLogo : DarkLogo} alt="Logo" />
            </picture>
          </Link>
        </div>

        <nav className="w-1/5 justify-between hidden sm:flex">
          <a href="#" className="hover:scale-110 transition-all m-0">
            دسته‌بندی 1
          </a>
          <a href="#" className="hover:scale-110 transition-all m-0">
            دسته‌بندی 2
          </a>
          <a href="#" className="hover:scale-110 transition-all m-0">
            دسته‌بندی 3
          </a>
        </nav>

        <div className="sm:w-1/5 w-2/4 relative">
          <div 
            className="flex items-center justify-end cursor-pointer group"
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            <Search 
              className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'} transition-all duration-300 ease-in-out ${isSearchExpanded ? 'opacity-0' : 'opacity-100'}`} 
            />
            
            <input
              type="text"
              placeholder="جستجو..."
              className={`px-4 py-2 rounded focus:outline-none placeholder:text-[#DDA15E] transition-all duration-300 ease-in-out transform focus:scale-105 focus:ring-2 focus:ring-opacity-50 absolute right-0 ${
                isSearchExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
              } ${
                isDarkMode 
                  ? "bg-[#606C38] text-white focus:ring-[#DDA15E]" 
                  : "text-black bg-[#F3F3E0] focus:ring-[#7B904B]"
              }`}
            />
          </div>
          
        </div>
        <div>
        <User
            className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'} transition-all duration-300 ease-in-out hover:scale-110`}
            onClick={() => navigate('/login')}
          />
        </div>

        <div className="sm:w-1/6 w-2/6 flex justify-center items-center">
          <select
            className={`px-2 w-1/2 py-1 border cursor-pointer rounded transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-opacity-50 ${
              isDarkMode 
                ? "bg-[#606C38] border-[#606C38] text-white focus:ring-[#DDA15E] hover:bg-[#4a5a2a]" 
                : "bg-[#F3F3E0] text-black focus:ring-[#7B904B] hover:bg-[#e6e6d1]"
            } outline-none mr-4`}
          >
            <option value="" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>شهر</option>
            <option value="city1" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>شهر 1</option>
            <option value="city2" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>شهر 2</option>
            <option value="city3" className={isDarkMode ? "bg-[#606C38]" : "bg-[#F3F3E0]"}>شهر 3</option>
          </select>
          
        </div>
      </div>
    </header>
  );
}

export default Header;