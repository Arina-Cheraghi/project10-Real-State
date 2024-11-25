import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: import("leaflet/dist/images/marker-icon.png"),
  shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
});

function MapComponent({ isDarkMode }) {
  return (
    <div className={` space-y-4`}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">موقعیت ملک</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city" className="block">
              شهر
            </label>
            <select
              id="city"
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? "bg-[#273B09] text-white"
                  : "bg-white text-[#283618]"
              }`}
            >
              <option value="">انتخاب کنید</option>
              <option value="تهران">تهران</option>
              <option value="مشهد">مشهد</option>
              <option value="اصفهان">اصفهان</option>
              <option value="شیراز">شیراز</option>
              <option value="تبریز">تبریز</option>
              <option value="اهواز">اهواز</option>
              <option value="کرج">کرج</option>
              <option value="قم">قم</option>
              <option value="زنجان">زنجان</option>
              <option value="کرمان">کرمان</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="neighborhood" className="block">
              محله
            </label>
            <input
              id="neighborhood"
              type="text"
              placeholder="محله"
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? "bg-[#273B09] text-white"
                  : "bg-white text-[#283618]"
              }`}
            />
          </div>
        </div>
      </div>
      <MapContainer
        center={[35.6892, 51.389]}
        zoom={12}
        style={{ height: "50vh", width: "100%" }}
        className="rounded-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[35.6892, 51.389]}>
          <Popup>اینجا تهران است!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
