import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Dark from "../../assets/1-dark.webp";
import Light from "../../assets/1-light.webp";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LoginFlow({ isDarkMode }) {
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === "login") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/login/",
          { phone_number: phoneNumber }
        );
        if (response.data.success) {
          setStep("verify");
        } else {
          setStep("signup");
        }
      } else if (step === "signup") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/register/",
          {
            phone_number: phoneNumber,
            first_name: firstName,
            verification_code: verificationCode,
          }
        );
        if (response.data.success) {
          toast.success("ثبت‌نام موفقیت‌آمیز بود!");
          // navigate('/');
        } else {
          toast.error("خطا در ثبت‌نام، لطفاً دوباره تلاش کنید.");
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("خطا در ارتباط با سرور، لطفاً دوباره تلاش کنید.");
    }
  };

  // const checkServer = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/auth/login/');
  //     console.log('Server is up:', response.data);
  //   } catch (error) {
  //     console.error('Error connecting to server:', error.message); // نمایش پیام خطا
  //     console.error('Error details:', error); // نمایش جزئیات خطا
  //   }
  // };
  // checkServer()

  const renderForm = () => {
    switch (step) {
      case "login":
        return (
          <>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="شماره تلفن"
              className={`text-right w-full p-2 mb-4 rounded ${
                isDarkMode
                  ? "bg-[#002400] text-[#F3F3E0]"
                  : "bg-[#F3F3E0] text-[#002400]"
              }`}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${
                isDarkMode
                  ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                  : "bg-[#7B904B] hover:bg-[#7B904B99]"
              } text-[#F3F3E0] transition-colors`}
            >
              ورود
            </button>
          </>
        );
      case "signup":
        return (
          <>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="نام"
              className={`w-full p-2 mb-4 rounded ${
                isDarkMode
                  ? "bg-[#002400] text-[#F3F3E0]"
                  : "bg-[#F3F3E0] text-[#002400]"
              }`}
            />
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="کد تایید"
              className={`w-full p-2 mb-4 rounded ${
                isDarkMode
                  ? "bg-[#002400] text-[#F3F3E0]"
                  : "bg-[#F3F3E0] text-[#002400]"
              }`}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${
                isDarkMode
                  ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                  : "bg-[#7B904B] hover:bg-[#7B904B99]"
              } text-[#F3F3E0] transition-colors`}
            >
              ثبت نام
            </button>
          </>
        );
      case "verify":
        return (
          <>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="کد تایید"
              className={`w-full p-2 mb-4 rounded ${
                isDarkMode
                  ? "bg-[#002400] text-[#F3F3E0]"
                  : "bg-[#F3F3E0] text-[#002400]"
              }`}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${
                isDarkMode
                  ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                  : "bg-[#7B904B] hover:bg-[#7B904B99]"
              } text-[#F3F3E0] transition-colors`}
            >
              تایید
            </button>
          </>
        );
    }
  };

  return (
    <div
      className={`transition-all min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-[#0024009a]" : "bg-[#7b904b97]"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-[#283618]" : "bg-[#606C38]"
        }`}
      >
        <Link to="/">
          <picture>
            <source media="(prefers-color-scheme: dark)" />
            <img
              className="w-1/2 mx-auto"
              src={isDarkMode ? Light : Dark}
              alt="Logo"
            />
          </picture>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {step === "login"
              ? "ورود"
              : step === "signup"
              ? "ثبت نام"
              : "تایید کد"}
          </h2>
        </Link>
        <form onSubmit={handleSubmit}>{renderForm()}</form>
      </div>
    </div>
  );
}

export default LoginFlow;
