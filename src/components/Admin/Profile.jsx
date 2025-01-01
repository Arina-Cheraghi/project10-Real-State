import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "کاربر";
    setUserName(storedUserName);
  }, []);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("userName", e.target.value); // ذخیره تغییرات در localStorage
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">پروفایل</h2>
      <p>در اینجا اطلاعات پروفایل کاربر نمایش داده می‌شود.</p>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        className="border rounded p-2 mt-2"
      />
      {/* اینجا می‌توانید اطلاعات پروفایل را اضافه کنید */}
    </div>
  );
};

export default Profile; 