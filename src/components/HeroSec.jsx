/** @format */

"use client";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import SearchResult from "./SearchResult";
import { fetchProperties } from "@/utils/properties/fetchProperties";

const HeroSec = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setshow] = useState(false);
  const [properties, setProperties] = useState();
  const [searchProperties, setSearchProp] = useState();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    location: "",
    bathrooms: "",
    bedrooms: "",
  });

  const fetchPropertiesData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch (error) {
      setNotification({
        message: "Failed to fetch properties. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    fetchPropertiesData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { location, bathrooms, bedrooms } = formData;

    const filteredProperties = properties.filter((property) => {
      return (
        property.address.toLowerCase().includes(location.toLowerCase()) &&
        property.bathrooms === parseInt(bathrooms) &&
        property.bedrooms === parseInt(bedrooms)
      );
    });
    if (filteredProperties.length === 0) {
      setshow(false);
      setNotification({
        message: "No properties found. With these details.",
        type: "error",
      });
    } else {
      setSearchProp(filteredProperties);
      setshow(true);
    }
  };

  return (
    <div
      id="home"
      className="w-full min-h-[80vh] h-auto py-10"
      style={{
        backgroundImage: "url('/herosec.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="w-full min-h-[80vh] h-auto flex flex-col justify-center items-center my-10 gap-5">
        <h1 className="text-white text-[36px] font-bold text-center">
          Find your property
        </h1>
        <div className="gap-4 justify-center items-center hidden sm:flex">
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
          <FontAwesomeIcon
            icon={faLocation}
            className="text-[30px] text-[#E3E6E9]"
          />
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
        </div>
        <p className="text-center text-[#E3E6E9] w-[70%] text-[15px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic amet
          distinctio adipisci molestiae, quas quos nemo neque quo delectus quia,
          alias modi eligendi eveniet expedita nobis doloribus, perspiciatis
          aperiam laudantium!
        </p>
        <form
          className="w-[80%] bg-white rounded-md grid grid-cols-1 md:grid-cols-3 gap-3 gap-y-5 p-10"
          onSubmit={handleSubmit}>
          {/* First Row */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="location"
                className="text-[15px] text-black font-medium">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="w-full border-2 border-[#E3E6E9] rounded-md p-2"
                placeholder="Location"
                required
                onChange={handleInputChange}
                value={formData.location} // Add value binding
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="bathrooms"
                className="text-[15px] text-black font-medium">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                className="w-full border-2 border-[#E3E6E9] rounded-md p-2"
                placeholder="Bathrooms"
                required
                onChange={handleInputChange}
                value={formData.bathrooms} // Add value binding
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="bedrooms"
                className="text-[15px] text-black font-medium">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                className="w-full border-2 border-[#E3E6E9] rounded-md p-2"
                placeholder="Bedrooms"
                required
                onChange={handleInputChange}
                value={formData.bedrooms} // Add value binding
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="col-span-1">
            <label
              htmlFor="propertyType"
              className="text-[15px] text-black font-medium">
              Property Type
            </label>
            <select name="propertyType" id="propertyType" required>
              <option value="" disabled>
                Property Type
              </option>
              <option value="Selling">Selling</option>
              <option value="Rental">Rental</option>
            </select>
          </div>
          <div className="col-span-1 flex justify-center items-end">
            <button className="w-full bg-sky-1 text-white py-2 rounded-md">
              Find Now
            </button>
          </div>
        </form>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
      {show && searchProperties && (
        <SearchResult
          close={() => setshow(false)}
          properties={searchProperties}
        />
      )}
    </div>
  );
};

export default HeroSec;
