
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

function MapComponent({ isDarkMode, setSelectedprovinceId, setSelectedCity, setNeighborhood, setLocation }) {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [mapLocation, setMapLocation] = useState({ lat: 35.6892, lng: 51.389 });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://192.168.10.224:8000/api/city/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedprovinceId(provinceId);
    setSelectedCity("");
    
    const selectedProvinceData = provinces.find(p => p.province_id.toString() === provinceId);
    if (selectedProvinceData) {
      setCities(selectedProvinceData.cities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
  };

  function MapClickHandler() {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setMapLocation({ lat, lng });
        setLocation({ lat, lng });
        console.log("Location clicked:", { lat, lng });
      },
    });
    return null;
  }

  return (
    <div className={`space-y-4`}>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">موقعیت ملک</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="province" className="block">استان</label>
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            >
              <option value="">انتخاب کنید</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="block">شهر</label>
            <select
              id="city"
              onChange={handleCityChange}
              className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
              disabled={!selectedProvince}
            >
              <option value="">انتخاب کنید</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="neighborhood" className="block">محله</label>
            <input
              id="neighborhood"
              type="text"
              placeholder="محله"
              onChange={(e) => setNeighborhood(e.target.value)}
              className={`w-full p-2 rounded-md ${isDarkMode ? "bg-[#273B09] text-white" : "bg-white text-[#283618]"}`}
            />
          </div>
        </div>
      </div>
      <MapContainer
        center={mapLocation}
        zoom={12}
        style={{ height: "50vh", width: "100%" }}
        className="rounded-md z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapLocation}>
          <Popup>اینجا مکان انتخاب شده است!</Popup>
        </Marker>
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default MapComponent;

