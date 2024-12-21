/** @format */
"use client";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Notification from "./Notification";

const Listings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getallproperties");
      setProperties(response.data.data.reverse());
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
  return (
    <div>
      <div id="listing" className="flex gap-5 flex-col">
        <h1 className="text-[36px] font-bold">Properties For Rent</h1>
        <div className=" gap-4 justify-center items-center hidden sm:flex">
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
          <FontAwesomeIcon
            icon={faLocation}
            className="text-[30px] text-[#E3E6E9]"
          />
          <div className="w-[200px] h-[0.6px] bg-[#E3E6E9]"></div>
        </div>
        <div className="para_div text-wrap w-full md:w-[700px]">
          <p className="text-center text-[#8b8b8a] font-[16px] font-extralight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
            velit, debitis, vel ullam veniam neque praesentium, sapiente modi
            saepe expedita.
          </p>
        </div>
        <div id="listing_div">
          {isLoading ? (
            <Loader />
          ) : (
            properties
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
