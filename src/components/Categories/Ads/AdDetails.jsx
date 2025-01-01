import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Car } from 'lucide-react';
import { GiFamilyHouse } from "react-icons/gi";
import { PiElevatorDuotone } from "react-icons/pi";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

const AdDetail = ({ isDarkMode }) => {
  const { file_id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await fetch(`http://192.168.10.224:8000/api/file/${file_id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAd(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAdDetails();
  }, [file_id]);

  if (!ad) {
    return <div>آگهی مورد نظر پیدا نشد.</div>;
  }

  let lat, lng;

  // بررسی و استخراج مختصات از رشته location
  try {
    const location = JSON.parse(ad.location);
    lat = location.lat;
    lng = location.lng;


  } catch (error) {
    console.error("Error parsing location:", error);
    return <div>موقعیت جغرافیایی نامعتبر است.</div>;
  }

  return (
    <div className={`pt-20 flex justify-center`}>
      <div className="flex flex-col justify-center w-1/2">
        <h2 className="text-4xl font-bold mb-4 text-center">{ad.title}</h2>
        <p className="text-xl font-bold mb-4">دسته بندی ها: {ad.category.title}</p>
        <img src={ad.image.path} alt={ad.title} className="w-full h-auto object-cover mb-4 rounded-lg shadow-lg" />
        <div>
          <p className="text-base mb-2">توضیحات:</p>
          <textarea
            className="text-base bg-[#606C38] rounded p-2 mb-4 w-full h-24 resize-none"
            value={ad.description}
            readOnly
          />
        </div>



        {/* نمایش ویژگی‌ها */}
        <div className="mb-4">
          <p className="text-base mb-2">ویژگی‌ها و امکانات:</p>
          <div className="flex justify-between">
            {ad.features.map((feature, index) => {
              const isAvailable = feature.value === "yes";
              let icon;

              // Determine the icon based on the feature
              switch (feature.feature) {
                case "پارکینگ":
                  icon = <Car className={`text-2xl ${isAvailable ? 'text-black' : 'text-gray-400 line-through'}`} />;
                  break;
                case "انباری":
                  icon = <GiFamilyHouse className={`text-2xl ${isAvailable ? 'text-black' : 'text-gray-400 line-through'}`} />;
                  break;
                case "آسانسور":
                  icon = <PiElevatorDuotone className={`text-2xl ${isAvailable ? 'text-black' : 'text-gray-400 line-through'}`} />;
                  break;
                default:
                  icon = <span className="text-2xl text-gray-400 line-through">❓</span>; // Default icon for unknown features
              }

              return (
                <div key={index} className={`flex  flex-col items-center ${isAvailable ? 'text-black' : 'text-gray-400 line-through'}`}>
                  <div className={`icon-class ${isAvailable ? 'bg-[#002400]' : 'bg-[#606C38]'} p-4 rounded-md`}>
                    {icon} {/* Display the icon */}
                  </div>
                  <p className="text-sm">{feature.feature}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* اضافه کردن نقشه */}
        <p className="text-base mb-2">شهر: {ad.city.name}</p>
        <p className="text-base mb-2">آدرس دقیق: {ad.address}</p>
        <MapContainer
          center={[lat, lng]} // استفاده از مختصات
          zoom={12}
          style={{ height: "50vh", width: "100%" }}
          className="rounded-md z-0"
          scrollWheelZoom={false} // غیرفعال کردن زوم با اسکرول
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]}>
            <Popup>اینجا مکان آگهی است!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default AdDetail;
