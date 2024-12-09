
import React, { useEffect, useState } from "react";

function File({ isDarkMode }) {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    title: "",
    type: "static",
    values: [],
  });
  const [dynamicValue, setDynamicValue] = useState("");

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://192.168.10.213:8000/api/feature/");
        const data = await response.json();
        setFeatures(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    try {
      const response = await fetch("http://192.168.10.213:8000/api/feature/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newFeature,
          value:
            newFeature.type === "static"
              ? newFeature.values[0]
              : newFeature.values,
        }),
      });
      const data = await response.json();
      setFeatures([...features, data]);
      setNewFeature({ title: "", type: "static", values: [] });
      setDynamicValue("");
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };

  const handleDeleteFeature = async (featureId) => {
    try {
      await fetch(`http://192.168.10.213:8000/api/feature/${featureId}/`, {
        method: "DELETE",
      });
      setFeatures(
        features.filter((feature) => feature.feature_id !== featureId)
      );
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  const handleUpdateFeature = async (featureId, updatedValue) => {
    try {
      await fetch(`http://192.168.10.213:8000/api/feature/${featureId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValue),
      });
      setFeatures(
        features.map((feature) =>
          feature.feature_id === featureId
            ? { ...feature, value: updatedValue.value }
            : feature
        )
      );
    } catch (error) {
      console.error("Error updating feature:", error);
    }
  };

  const handleAddDynamicValue = () => {
    if (dynamicValue) {
      setNewFeature((prev) => ({
        ...prev,
        values: [...prev.values, dynamicValue],
      }));
      setDynamicValue(""); // Reset input
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-[#FEFAE0]" : "bg-white text-[#002400]"
      } p-6 rounded-lg shadow-md`}
    >
      <h2 className="text-3xl font-semibold mb-4">مدیریت فایل ها</h2>
      <p className={`${isDarkMode ? "text-[#FEFAE0]" : "text-[#606C38]"} mb-6`}>
        اینجا می‌توانید لیست فایل را مشاهده و مدیریت کنید.
      </p>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <tr>
            <th className="border border-gray-300 p-2">عنوان</th>
            <th className="border border-gray-300 p-2">نوع</th>
            <th className="border border-gray-300 p-2">مقدار</th>
            <th className="border border-gray-300 p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr
              key={feature.feature_id}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="border border-gray-300 p-2">{feature.title}</td>
              <td className="border border-gray-300 p-2">{feature.type}</td>
              <td className="border border-gray-300 p-2">
                {feature.type === "static" ? (
                  <span>{feature.value === "yes" ? "دارد" : "ندارد"}</span>
                ) : (
                  <span>
                    {Array.isArray(feature.values)
                      ? feature.values.join(", ")
                      : ""}
                  </span>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDeleteFeature(feature.feature_id)}
                  className="text-red-500 hover:underline"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="text-xl mb-2">افزودن ویژگی جدید</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="عنوان"
            value={newFeature.title}
            onChange={(e) =>
              setNewFeature({ ...newFeature, title: e.target.value })
            }
            className="border border-gray-400 rounded p-2 flex-1"
          />
          <select
            value={newFeature.type}
            onChange={(e) => {
              setNewFeature({
                ...newFeature,
                type: e.target.value,
                values: [],
              });
              setDynamicValue(""); // Reset dynamic value input
            }}
            className="border border-gray-400 rounded p-2"
          >
            <option value="static">استاتیک</option>
            <option value="dynamic">داینامیک</option>
          </select>
        </div>

        {newFeature.type === "static" ? (
          <div className="mt-2">
            <span className="font-semibold">مقدار: </span>
            <span>{newFeature.values[0] === "yes" ? "دارد" : "ندارد"}</span>
          </div>
        ) : (
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="مقدار داینامیک"
              value={dynamicValue}
              onChange={(e) => setDynamicValue(e.target.value)}
              className="border border-gray-400 rounded p-2 flex-1"
            />
            <button
              onClick={handleAddDynamicValue}
              className="bg-green-600 text-white p-2 rounded ml-2"
            >
              اضافه کردن
            </button>
          </div>
        )}

        {newFeature.type === "dynamic" && newFeature.values.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold">مقادیر اضافه شده:</h4>
            <ul>
              {newFeature.values.map((val, index) => (
                <li key={index} className="border border-gray-300 p-1">
                  {val}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleAddFeature}
          className="bg-blue-600 text-white p-2 mt-4 rounded hover:bg-blue-700"
        >
          افزودن
        </button>
      </div>
    </div>
  );
}

export default File;

