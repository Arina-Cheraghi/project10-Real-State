import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsMoon } from "react-icons/bs";
import { GiUbisoftSun } from "react-icons/gi";

// Import all necessary components
import AdminPanel from "./components/Admin/AdminPanel";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Admin/Users";
import Properties from "./components/Admin/Properties";
import Settings from "./components/Admin/Settings";
import Header from "./components/Header/Header";
import AdForm from "./components/Form/AdForm";
import Footer from "./components/Footer/Footer";
import Home from "./components/home/Home";
import CategoryAds from "./components/Categories/Ads/CategoryAds";
import LoginFlow from "./components/Authentication/LoginFlow";
import Favorites from "./components/Admin/Favorites";
import Ads from "./components/Admin/Ads";
import Profile from "./components/Admin/Profile";
import CategoryList from "./components/Admin/CategoryList";

function AppContent({ isDarkMode, toggleDarkMode, categories, updateFlag, onUpdate }) {
  const location = useLocation();

  return (
    <div className={isDarkMode ? "bg-[#283618] text-[#FEFAE0]" : "bg-white text-black"}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-5 left-4 px-4 py-2 rounded bg-[#41414194] z-10"
      >
        {isDarkMode ? (
          <GiUbisoftSun className="active:outline-none text-yellow-500 text-2xl" />
        ) : (
          <BsMoon className="active:outline-none text-gray-700 text-2xl" />
        )}
      </button>
      {location.pathname !== "/login" && (
        <Header isDarkMode={isDarkMode} categories={categories} updateFlag={updateFlag} />
      )}
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} categories={categories} />} />
        <Route path="form" element={<AdForm isDarkMode={isDarkMode} categories={categories} />} />
        <Route path="/admin" element={<AdminPanel categories={categories} isDarkMode={isDarkMode} onUpdate={onUpdate} />}>
          <Route path="dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
          <Route path="users" element={<Users isDarkMode={isDarkMode} />} />
          <Route path="categoryList" element={<CategoryList isDarkMode={isDarkMode} onUpdate={onUpdate} />} />
          <Route path="properties" element={<Properties isDarkMode={isDarkMode} />} />
          <Route path="settings" element={<Settings isDarkMode={isDarkMode} />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="ads" element={<Ads />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/category-ads/:category_id" element={<CategoryAds categories={categories} isDarkMode={isDarkMode} />} />
        <Route path="/login" element={<LoginFlow isDarkMode={isDarkMode} />} />
      </Routes>
      {location.pathname !== "/login" && <Footer isDarkMode={isDarkMode} />}
      <ToastContainer position="bottom-right" rtl={true} />
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [categories, setCategories] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://192.168.10.213:8000/api/category/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
      console.log(data)
    } catch (error) {
      console.error("There was a problem fetching the categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onUpdate = useCallback(() => {
    setUpdateFlag((prev) => !prev);
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Router>
      <AppContent
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        categories={categories}
        updateFlag={updateFlag}
        onUpdate={onUpdate}
      />
    </Router>
  );
}

export default App;
