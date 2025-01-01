import React, { useEffect, useState } from "react";
import { Trash2, Plus, X } from 'lucide-react';

function File({ isDarkMode }) {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    title: "",
    type: "static",
    value: "no",
    values: [],
  });
  const [dynamicValue, setDynamicValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.10.224:8000/api/feature/");
        const data = await response.json();
        setFeatures(data);
        console.log(data)
      } catch (error) {
        setErrorMessage("خطا در بارگذاری ویژگی‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (newFeature.type === "dynamic") {
        for (const value of newFeature.values) {
          const response = await fetch("http://192.168.10.224:8000/api/feature/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: newFeature.title,
              type: "dynamic",
              value: value,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage("خطا در افزودن ویژگی: " + errorData.message);
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setFeatures((prevFeatures) => [...prevFeatures, data]);
        }
      } else {
        const response = await fetch("http://192.168.10.224:8000/api/feature/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newFeature,
            value: newFeature.type === "static" ? newFeature.value : newFeature.values,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage("خطا در افزودن ویژگی: " + errorData.message);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFeatures([...features, data]);
      }

      setNewFeature({ title: "", type: "static", value: "no", values: [] });
      setDynamicValue("");
    } catch (error) {
      console.error("Error adding feature:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteFeature = async (featureId) => {
    try {
      await fetch(`http://192.168.10.224:8000/api/feature/${featureId}/`, {
        method: "DELETE",
      });
      setFeatures(features.filter((feature) => feature.feature_id !== featureId));
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  const handleAddDynamicValue = () => {
    if (dynamicValue) {
      setNewFeature((prev) => ({
        ...prev,
        values: [...prev.values, dynamicValue],
      }));
      setDynamicValue("");
    }
  };

  const removeDynamicValue = (index) => {
    setNewFeature((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={`${isDarkMode ? "bg-[#4f5b33] text-[#FEFAE0]" : "bg-[#FEFAE0] text-[#002400]"} p-8 rounded-lg w-full h-fit mt-10 shadow-lg`}>
      <h2 className="text-4xl font-bold mb-6 text-center">مدیریت فایل ها</h2>
      {loading && <p className="text-center mb-4">در حال بارگذاری...</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className={`${isDarkMode ? "bg-[#002400]" : "bg-[#606C38]"} text-[#FEFAE0]`}>
              <th className="p-3 text-center">عنوان</th>
              <th className="p-3 text-center">نوع</th>
              <th className="p-3 text-center">مقدار</th>
              <th className="p-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature.feature_id} className={`${isDarkMode ? " hover:bg-[#606C38]" : "bg-[#FEFAE0] hover:bg-[#E9E7D1]"} w-full transition-colors duration-200`}>
                <td className="p-3 border-b border-[#7B904B]">{feature.title}</td>
                <td className="p-3 text-center  border border-[#7B904B]">{feature.type}</td>
                <td className="p-3 text-center border border-[#7B904B]">{feature.value}</td>
                <td className="p-3 text-center border-y border-[#7B904B]">
                  <button onClick={() => handleDeleteFeature(feature.feature_id)} className="text-red-700 hover:text-red-900 transition-colors duration-200">
                    <Trash2 size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">افزودن ویژگی جدید</h3>
        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="عنوان" 
            value={newFeature.title} 
            onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })} 
            className={`border rounded p-2 w-full ${isDarkMode ? "bg-[#606C38] border-[#7B904B] text-[#FEFAE0] placeholder:text-[#fefae091]" : "bg-white border-[#606C38]"}`}
          />
          <select 
            value={newFeature.type} 
            onChange={(e) => {
              setNewFeature({ ...newFeature, type: e.target.value, values: [], value: e.target.value === "static" ? "no" : newFeature.value });
              setDynamicValue("");
            }} 
            className={`border rounded p-2 w-full ${isDarkMode ? "bg-[#606C38] border-[#7B904B] text-[#FEFAE0]" : "bg-white border-[#606C38]"}`}
          >
            <option value="static">استاتیک</option>
            <option value="dynamic">داینامیک</option>
          </select>
        </div>

        {newFeature.type === "static" ? (
          <div className="mt-4">
            <span className="font-semibold">مقدار: </span>
            <select 
              value={newFeature.value} 
              onChange={(e) => setNewFeature({ ...newFeature, value: e.target.value })} 
              className={`border rounded p-2 ${isDarkMode ? "bg-[#606C38] border-[#7B904B] text-[#FEFAE0]" : "bg-white border-[#606C38]"}`}
            >
              <option value="yes">دارد</option>
              <option value="no">ندارد</option>
            </select>
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="مقدار داینامیک" 
                value={dynamicValue} 
                onChange={(e) => setDynamicValue(e.target.value)} 
                className={`border rounded p-2 flex-grow ${isDarkMode ? "bg-[#606C38] border-[#7B904B] text-[#FEFAE0]" : "bg-white border-[#606C38]"}`}
              />
              <button 
                onClick={handleAddDynamicValue} 
                className={`${isDarkMode ? "bg-[#7B904B] hover:bg-[#6A7F3E]" : "bg-[#606C38] hover:bg-[#4F5B2E]"} text-[#FEFAE0] p-2 rounded transition-colors duration-200`}
              >
                <Plus size={20} />
              </button>
            </div>
            {newFeature.values.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold mb-2">مقادیر اضافه شده:</h4>
                <div className="flex flex-wrap gap-2">
                  {newFeature.values.map((val, index) => (
                    <div key={index} className={`flex items-center ${isDarkMode ? "bg-[#7B904B]" : "bg-[#606C38]"} text-[#FEFAE0] p-2 rounded`}>
                      <span>{val}</span>
                      <button onClick={() => removeDynamicValue(index)} className="ml-2 text-red-300 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button 
          onClick={handleAddFeature} 
          className={`${isDarkMode ? "bg-[#7B904B] hover:bg-[#6A7F3E]" : "bg-[#606C38] hover:bg-[#4F5B2E]"} text-[#FEFAE0] p-3 mt-6 rounded w-full font-semibold transition-colors duration-200`}
        >
          افزودن
        </button>
      </div>
    </div>
  );
}

export default File;

