import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dark from "../../assets/1-dark.webp";
import Light from "../../assets/1-light.webp";
import { Link } from "react-router-dom";

function LoginFlow({ isDarkMode }) {
  const [step, setStep] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === "login" || step === "signup") {
      setStep("verify");
    } else {
      navigate("/");
    }
  };

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
            <p className="mt-4 text-center">
              <span
                className="cursor-pointer text-green-700 transition-all hover:text-green-500"
                onClick={() => setStep("signup")}
              >
                آیا ثبت نام نکرده‌اید؟
              </span>
            </p>
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="نام خانوادگی"
              className={`w-full p-2 mb-4 rounded ${
                isDarkMode
                  ? "bg-[#002400] text-[#F3F3E0]"
                  : "bg-[#F3F3E0] text-[#002400]"
              }`}
            />
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
              ثبت نام
            </button>
            <p className="mt-4 text-center">
              <span
                className="cursor-pointer text-green-700 transition-all hover:text-green-500"
                onClick={() => setStep("login")}
              >
                قبلاً ثبت نام کرده‌اید؟
              </span>
            </p>
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
            <img className="w-1/2 mx-auto" src={isDarkMode ? Light : Dark} alt="Logo" />
          </picture>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {step === "login"
              ? "ورود"
              : step === "signup"
              ? "ثبت نام"
              : "تایید کد"}
          </h2>
        </Link>
        <form onSubmit={handleSubmit}>
          {renderForm()}
        </form>
      </div>
    </div>
  );
}

export default LoginFlow;
