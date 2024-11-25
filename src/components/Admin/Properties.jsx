import React from "react"
import { Search, PlusSquare, Trash2 } from 'lucide-react'

export default function Properties({isDarkMode}) {
  const properties = [
    { id: 1, name: "ملک 1" },
    { id: 2, name: "ملک 2" },
    { id: 3, name: "ملک 3" },
  ]

  return (
    <div className={`${isDarkMode?"text-[#FEFAE0]":"text-[#002400]"} space-y-6`}>
      <h2 className="text-3xl font-semibold">مدیریت املاک</h2>
      <p>اینجا می‌توانید لیست املاک را مشاهده و مدیریت کنید.</p>
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-[#7B904B]  rounded-md hover:bg-[#606C38] transition-colors duration-200 flex items-center">
          <PlusSquare className="w-5 h-5 ml-2" />
          افزودن ملک جدید
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی ملک..."
            className="px-4 py-2 pr-10 bg-[#FEFAE0] placeholder:text-[#283618aa] border border-[#606C38] dark:border-[#283618] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B904B]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
        </div>
      </div>
      <div className={`${isDarkMode ? "bg-[#606C38]" : "bg-[#FEFAE0]"} rounded-lg shadow-md overflow-hidden`}>
        <table className="w-full">
          <thead className="bg-[#FEFAE0] dark:bg-[#002400] ">
            <tr>
              <th className="py-3 px-4 text-[#FEFAE0] text-right">نام ملک</th>
              <th className="py-3 px-4 text-[#FEFAE0] text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t">
                <td className="py-3 px-4">{property.name}</td>
                <td className="py-3 px-4">
                  <button className="text-[#a43234] hover:scale-110 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}