/** @format */
"use client";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Notification from "./Notification";
import ListingFilters from "./listingFilters";
import ProdSearch from "./ProdSearch";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [selectedCities, setSelectedCities] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getallproperties");
      const data = response.data.data.reverse();
      setProperties(data);
      setFilteredProperties(data); // Initially, show all properties
    } catch (error) {
      setNotification({
        message: "Failed to fetch properties. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties when selected cities change
  useEffect(() => {
    if (selectedCities.length === 0) {
      setFilteredProperties(properties); // Show all properties if no filter applied
    } else {
      setFilteredProperties(
        properties.filter((prop) =>
          selectedCities.some((city) =>
            prop.address.toLowerCase().includes(city.toLowerCase()),
          ),
        ),
      );
    }
  }, [selectedCities, properties]);

  // Filter properties when search query changes
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProperties(properties); // Show all properties if no search query
    } else {
      setFilteredProperties(
        properties.filter((prop) =>
          prop.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, properties]);

  return (
    <div>
      <div id="listing" className="flex gap-5 flex-col">
        <h1 className="text-[36px] font-bold">Properties For Rent</h1>
        <div className="gap-4 justify-center items-center hidden sm:flex">
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
          <FontAwesomeIcon
            icon={faLocation}
            className="text-[30px] text-[#E3E6E9]"
          />
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
        </div>
        <div className="para_div text-wrap w-full md:w-[700px]">
          <p className="text-center text-[#8b8b8a] font-[16px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
            velit, debitis, vel ullam veniam neque praesentium, sapiente modi
            saepe expedita.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ProdSearch search={search} setSearch={setSearch} />
          <ListingFilters setSelectedCities={setSelectedCities} />
        </div>
        <div id="listing_div">
          {isLoading ? (
            <Loader />
          ) : (
            filteredProperties
              .filter((props) => props.status === "Available")
              .map((prop) => (
                <Link href={`/singleproperty/${prop._id}`} key={prop._id}>
                  <div className="list">
                    <div className="shine"></div>
                    <img
                      src={prop.image}
                      alt={prop}
                      style={{ width: "350px", height: "250px" }}
                      className="object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="list_class flex justify-between items-center font-light">
                        <h3>{prop.title}</h3>
                        <p>{prop.propertyType}</p>
                      </div>
                      <div className="list_class flex justify-between items-center font-light">
                        <h3>{prop.bathrooms} bathrooms</h3>
                        <p>{prop.price} -/RS</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Listings;
