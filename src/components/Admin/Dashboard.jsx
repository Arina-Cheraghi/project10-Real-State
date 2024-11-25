import React from "react";
import { Users, Building, Eye } from "lucide-react";

export default function Dashboard({ isDarkMode }) {
  const stats = [
    { label: "تعداد کاربران", value: 150, icon: Users },
    { label: "تعداد املاک", value: 75, icon: Building },
    { label: "تعداد بازدیدها", value: 1200, icon: Eye },
  ];
  
  return (
    <div className={`${isDarkMode?"text-[#FEFAE0]":"text-[#002400]"} space-y-6`}>
      <h2 className="text-3xl font-semibold">داشبورد</h2>
      <p className="transition-all">
        اینجا می‌توانید آمار و اطلاعات کلی را مشاهده کنید.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={` ${
              isDarkMode ? "bg-[#002400]" : "bg-[#7B904B]"
            } transition-all p-6 rounded-lg shadow-md hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-12 h-12 text-[#FEFAE0] opacity-80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
