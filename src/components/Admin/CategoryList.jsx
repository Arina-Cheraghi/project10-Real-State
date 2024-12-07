import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Trash2, Plus, Edit2, Save, X, ChevronRight, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const { isDarkMode } = useOutletContext();
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategories, setNewCategories] = useState({});
  const [inputValue, setInputValue] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://192.168.10.213:8000/api/category/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("There was a problem fetching the categories:", error);
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const handleEdit = useCallback((category) => {
    setEditingCategory(category.category_id);
    setInputValue(category.title);
  }, []);

  const handleSave = useCallback(async (category) => {
    if (!inputValue.trim()) return;
    try {
      const response = await fetch(
        `http://192.168.10.213:8000/api/category/${category.category_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...category, title: inputValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEditingCategory(null);
      setInputValue("");
      toast.success("دسته‌بندی با موفقیت به‌روزرسانی شد");
      
      // Re-fetch categories after successful update
      await fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(`خطا در به‌روزرسانی دسته‌بندی: ${error.message}`);
    }
  }, [inputValue, fetchCategories]);

  const handleDelete = useCallback(async (categoryId) => {
    try {
      const response = await fetch(
        `http://192.168.10.213:8000/api/category/${categoryId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("دسته‌بندی با موفقیت حذف شد");
      // Re-fetch categories after successful deletion
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(`خطا در حذف دسته‌بندی: ${error.message}`);
    }
  }, [fetchCategories]);

  const handleAddNew = useCallback((parentId = null) => {
    setNewCategories((prev) => ({
      ...prev,
      [parentId || "root"]: { title: "", parent_id: parentId },
    }));
  }, []);

  const handleNewCategoryChange = useCallback((parentId, title) => {
    setNewCategories((prev) => ({
      ...prev,
      [parentId || "root"]: { ...prev[parentId || "root"], title },
    }));
  }, []);

  const handleSaveNew = useCallback(async (parentId = null) => {
    const newCategory = newCategories[parentId || "root"];
    if (!newCategory || !newCategory.title.trim()) {
      toast.error("لطفاً عنوان دسته‌بندی جدید را وارد کنید");
      return;
    }

    try {
      const response = await fetch("http://192.168.10.213:8000/api/category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newCategory.title,
          parent_id: parentId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error("خطا در افزودن دسته‌بندی. جزئیات در کنسول موجود است.");
      }

      setNewCategories((prev) => {
        const updated = { ...prev };
        delete updated[parentId || "root"];
        return updated;
      });
      toast.success("دسته‌بندی با موفقیت اضافه شد");
      
      // Re-fetch categories after successful addition
      await fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(`خطا در افزودن دسته‌بندی: ${error.message}`);
    }
  }, [newCategories, fetchCategories]);

  const renderCategory = (category, depth = 0) => {
    const hasChildren = categories.some(
      (c) => c.parent_id === category.category_id.toString()
    );
    const isExpanded = expandedCategories.includes(category.category_id);
    const isEditing = editingCategory === category.category_id;
    const isAddingNew = newCategories[category.category_id];

    return (
      <div key={category.category_id} className="mb-2">
        <div className={`flex items-center p-2 rounded-md transition-colors duration-200 ${isDarkMode ? 'hover:bg-[#002400]' : 'hover:bg-[#7B904B]'}`}>
          {hasChildren && (
            <button
              className="w-6 h-6 mr-2 text-[#273B09] focus:outline-none transition-transform duration-200"
              onClick={() => toggleCategory(category.category_id)}
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
          {!hasChildren && <div className="w-6 mr-2" />}
          <div
            className="flex items-center flex-1"
            style={{ marginRight: `${depth * 20}px` }}
          >
            {isEditing ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`border p-2 flex-1 rounded-md ${
                  isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#002400]"
                }`}
                onBlur={() => handleSave(category)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSave(category);
                  }
                }}
                autoFocus
              />
            ) : (
              <span className="flex-1 font-medium">{category.title}</span>
            )}
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(category)} className="p-1 hover:text-[#58641D] transition-colors duration-200">
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(category.category_id)}
                className="p-1 hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => handleAddNew(category.category_id)}
                className="p-1 hover:text-[#58641D] transition-colors duration-200"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        {isAddingNew && (
          <div
            className="flex items-center mt-2 ml-8"
            style={{ marginLeft: `${(depth + 1) * 20 + 32}px` }}
          >
            <input
              type="text"
              value={newCategories[category.category_id].title}
              onChange={(e) =>
                handleNewCategoryChange(category.category_id, e.target.value)
              }
              className={`border p-2 flex-1 rounded-md ${
                isDarkMode ? "bg-[#002400] " : "bg-white "
              }`}
              placeholder="نام دسته‌بندی جدید"
            />
            <button
              onClick={() => handleSaveNew(category.category_id)}
              className="p-2 ml-2 text-[#58641D] hover:text-[#273B09] transition-colors duration-200"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() =>
                setNewCategories((prev) => {
                  const updated = { ...prev };
                  delete updated[category.category_id];
                  return updated;
                })
              }
              className="p-2 ml-2 text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        )}
        {isExpanded && (
          <div className="mr-6">
            {categories
              .filter((c) => c.parent_id === category.category_id.toString())
              .map((childCategory) => renderCategory(childCategory, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootCategories = categories.filter(
    (category) => category.parent_id === null
  );

  return (
    <div className={`p-6 `}>
      <h2 className="text-3xl font-bold mb-6">مدیریت دسته‌بندی‌ها</h2>
      <p className="mb-6 text-lg">
        در اینجا می‌توانید دسته‌بندی‌ها را مشاهده و مدیریت کنید.
      </p>
      <div className={`flex flex-col bg-opacity-50 rounded-lg p-4 ${isDarkMode ? 'bg-[#002400]' : 'bg-[#7B904B]'}`}>
        {rootCategories.map((category) => renderCategory(category))}
        {newCategories["root"] && (
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={newCategories["root"].title}
              onChange={(e) => handleNewCategoryChange("root", e.target.value)}
              className={`border p-2 flex-1 rounded-md ${
                isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#002400]"
              }`}
              placeholder="نام دسته‌بندی اصلی جدید"
            />
            <button 
              onClick={() => handleSaveNew()} 
              className="p-2 ml-2 text-[#58641D] hover:text-[#273B09] transition-colors duration-200"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() =>
                setNewCategories((prev) => {
                  const updated = { ...prev };
                  delete updated["root"];
                  return updated;
                })
              }
              className="p-2 ml-2 text-red-500 hover:text-red-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => handleAddNew()}
        className="mt-6 p-3 bg-[#7B904B] text-white rounded-md hover:bg-[#6A7F3A] transition-colors duration-200 font-medium"
      >
        افزودن دسته‌بندی اصلی
      </button>
    </div>
  );
};

export default CategoryList;

