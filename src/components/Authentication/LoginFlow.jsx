import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Dark from "../../assets/1-dark.webp";
import Light from "../../assets/1-light.webp";

function LoginFlow({ isDarkMode }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [name, setName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === "phone") {
        const response = await axios.post(
          "http://192.168.10.224:8000/api/auth/verify/",
          { phone }
        );
        console.log("Phone verification response:", response);
        if (response.data === 1111 || 1234) {
          setStep("verify");
        } else {
          toast.error("خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
          console.error("Error sending verification code:", response.data);
        }
      } else if (step === "verify") {
        const response = await axios.post(
          "http://192.168.10.224:8000/api/auth/check/",
          {
            phone,
            code: verificationCode,
          }
        );
        console.log("Verification response:", response);
        if (response.data.message === "User logged in") {
          toast.success("خوش آمدید!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userName", response.data.name);  // Store the user's name
          navigate('/');
        } else {
          toast.error("کاربر جدید است. به صفحه ثبت‌نام هدایت می‌شوید.");
          setStep("signup");
          console.error("Invalid verification code:", response.data);
        }
      } else if (step === "signup") {
        const response = await axios.post(
          "http://192.168.10.224:8000/api/auth/register/",
          {
            phone: signupPhone,
            name,
            verification_code: verificationCode,
          }
        );
        console.log("Signup response:", response);

        // بررسی موفقیت ثبت‌نام
        if (response.data && response.data.token) {
          toast.success("با موفقیت ثبت نام شدید! لطفاً وارد اکانت خود شوید.");
          localStorage.setItem("token", response.data.token); // ذخیره توکن
          localStorage.setItem("isLoggedIn", "true"); // وضعیت ورود
          localStorage.setItem("userName", response.data.name); // ذخیره نام کاربر
          setStep("phone"); // بازگشت به مرحله شماره تلفن
        } else {
          // نمایش پیام خطا
          const errorMessage = response.data?.message || "خطا در ثبت‌نام، لطفاً دوباره تلاش کنید.";
          toast.error(errorMessage);
          console.error("Registration error:", response.data);
        }
      }


    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("خطا در ارتباط با سرور، لطفاً دوباره تلاش کنید.");
    }
  };

  const renderForm = () => {
    switch (step) {
      case "phone":
        return (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره تلفن"
              className={`text-right w-full p-2 mb-4 rounded ${isDarkMode
                ? "bg-[#002400] text-[#F3F3E0]"
                : "bg-[#F3F3E0] text-[#002400]"
                }`}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${isDarkMode
                ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                : "bg-[#7B904B] hover:bg-[#7B904B99]"
                } text-[#F3F3E0] transition-colors`}
            >
              ارسال کد تایید
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
              className={`w-full p-2 mb-4 rounded ${isDarkMode
                ? "bg-[#002400] text-[#F3F3E0]"
                : "bg-[#F3F3E0] text-[#002400]"
                }`}
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${isDarkMode
                ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                : "bg-[#7B904B] hover:bg-[#7B904B99]"
                } text-[#F3F3E0] transition-colors`}
            >
              تایید
            </button>
          </>
        );
      case "signup":
        return (
          <>
            <input
              type="tel"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              placeholder="شماره تلفن"
              className={`w-full p-2 mb-4 rounded ${isDarkMode
                ? "bg-[#002400] text-[#F3F3E0]"
                : "bg-[#F3F3E0] text-[#002400]"}`
              }
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام"
              className={`w-full p-2 mb-4 rounded ${isDarkMode
                ? "bg-[#002400] text-[#F3F3E0]"
                : "bg-[#F3F3E0] text-[#002400]"}`
              }
            />
            <button
              type="submit"
              className={`w-full p-2 rounded ${isDarkMode
                ? "bg-[#7B904B] hover:bg-[#7B904B99]"
                : "bg-[#7B904B] hover:bg-[#7B904B99]"} text-[#F3F3E0] transition-colors`}
            >
              ثبت نام
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`transition-all min-h-screen flex items-center justify-center ${isDarkMode ? "bg-[#0024009a]" : "bg-[#7b904b97]"
        }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${isDarkMode ? "bg-[#283618]" : "bg-[#606C38]"
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
            {step === "phone"
              ? "ورود"
              : step === "verify"
                ? "تایید کد"
                : "ثبت نام"}
          </h2>
        </Link>
        <form onSubmit={handleSubmit}>{renderForm()}</form>
      </div>
    </div>
  );
}

export default LoginFlow;

