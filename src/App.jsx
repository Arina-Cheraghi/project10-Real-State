import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminPanel from "./components/Admin/AdminPanel";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Admin/Users";
import Properties from "./components/Admin/Properties";
import Settings from "./components/Admin/Settings";
import Header from "./components/Header/Header";
import { BsMoon } from "react-icons/bs";
import { GiUbisoftSun } from "react-icons/gi";
import AdForm from "./components/Form/AdForm";
import Footer from "./components/Footer/Footer";
import Home from "./components/home/Home";
import CategoryAds from "./components/Categories/Ads/CategoryAds";
import LoginFlow from "./components/Authentication/LoginFlow";
import IMG from "./assets/2-6.jpg";
import IMG1 from "./assets/2-7.jpg";
import IMG2 from "./assets/2-8.jpg";
import IMG3 from "./assets/2-9.jpg";
import Favorites from "./components/Admin/Favorites";
import Ads from "./components/Admin/Ads";
import Profile from "./components/Admin/Profile";

export const categories = [
  {
    id: 1,
    title: "رهن و اجاره اداری",
    description: "توضیحات مختصر درباره رهن و اجاره اداری.",
    imgSrc: IMG3,
    link: "/category/1",
  },
  {
    id: 2,
    title: "رهن و اجاره مسکونی",
    description: "توضیحات مختصر درباره رهن و اجاره مسکونی.",
    imgSrc: IMG1,
    link: "/category/2",
  },
  {
    id: 3,
    title: "خرید و فروش زمین",
    description: "توضیحات مختصر درباره خرید و فروش زمین.",
    imgSrc: IMG2,
    link: "/category/3",
  },
  {
    id: 4,
    title: "اجاره روزانه",
    description: "توضیحات مختصر درباره اجاره روزانه.",
    imgSrc: IMG,
    link: "/category/4",
  },
];

function App({ isDarkMode, toggleDarkMode }) {
  return (
    <div
      className={
        isDarkMode ? "bg-[#283618] text-[#FEFAE0]" : "bg-white text-black"
      }
    >
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
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
        <Route path="form" element={<AdForm isDarkMode={isDarkMode} />} />
        <Route path="/admin" element={<AdminPanel isDarkMode={isDarkMode} />}>
          <Route
            path="dashboard"
            element={<Dashboard isDarkMode={isDarkMode} />}
          />
          <Route path="users" element={<Users isDarkMode={isDarkMode} />} />
          <Route
            path="properties"
            element={<Properties isDarkMode={isDarkMode} />}
          />
          <Route
            path="settings"
            element={<Settings isDarkMode={isDarkMode} />}
          />
          <Route path="favorites" element={<Favorites />} />
          <Route path="ads" element={<Ads />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/category/:categoryId"
          element={
            <CategoryAds categories={categories} isDarkMode={isDarkMode} />
          }
        />
        <Route path="/login" element={<LoginFlow isDarkMode={isDarkMode} />} />
      </Routes>
    </div>
  );
}

function AppWrapper({ isDarkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Header isDarkMode={isDarkMode} />}
      <App isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {location.pathname !== "/login" && <Footer isDarkMode={isDarkMode} />}
    </>
  );
}

function MainApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };

  return (
    <Router>
      <AppWrapper isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}

export default MainApp;
