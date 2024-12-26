/** @format */
"use client";
import { useState } from "react";

export default function ListingFilters({ setSelectedCities }) {
  const cities = [
    "Nanakana Sahib",
    "Karachi",
    "Gujranwala",
    "Bahawalpur",
    "Rawalpindi",
    "Islamabad",
  ];

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [checkedCities, setCheckedCities] = useState([]);

  const handleCityChange = (city) => {
    const updatedCities = checkedCities.includes(city)
      ? checkedCities.filter((c) => c !== city)
      : [...checkedCities, city];
    setCheckedCities(updatedCities);
    setSelectedCities(updatedCities);
  };

  return (
    <div className="flex items-center justify-center flex-col relative">
      <button onClick={() => setDropdownVisible(!dropdownVisible)}>
        Filter by Cities
      </button>

      {dropdownVisible && (
        <div className="absolute top-[62px] z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Pakistani Cities
          </h6>
          <ul className="space-y-2 text-sm">
            {cities.map((city) => (
              <li key={city} className="flex items-center">
                <input
                  id={city}
                  type="checkbox"
                  checked={checkedCities.includes(city)}
                  onChange={() => handleCityChange(city)}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={city}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {city}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
