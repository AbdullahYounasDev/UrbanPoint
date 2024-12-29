/** @format */
"use client";
import {
  faChevronRight,
  faEnvelope,
  faMapLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/getallproperties");
      const data = response.data.data.reverse();
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

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <footer className=" bg-[#252525] py-10">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-[80%] m-auto">
        <div className="bg-transparent-100 p-4 flex gap-[10px] flex-col">
          <h2 className="font-bold text-[24px] text-white my-5">Contact us</h2>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-white text-[14px]"
            />
            <span className="font-bold text-white text-[14px]">
              {" "}
              (+40) 74 0920 2288
            </span>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-white text-[14px]"
            />
            <span className="font-bold text-white text-[14px]">
              office@example.com
            </span>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faMapLocation}
              className="text-white text-[14px]"
            />
            <span className="text-white text-[14px]">
              8121 Sierra Lane Tampa, Florida 33604
            </span>
          </div>
        </div>
        <div className="bg-transparent-100 p-4 flex gap-[10px] flex-col">
          <h2 className="font-bold text-[24px] text-white my-5">
            Useful Links
          </h2>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#ffffffb3] text-[10px]"
            />
            <Link href="/#home" className="text-[#ffffffb3] text-[14px]">
              Home
            </Link>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#ffffffb3] text-[10px]"
            />
            <Link href="/#about" className="text-[#ffffffb3] text-[14px]">
              About Us
            </Link>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#ffffffb3] text-[10px]"
            />
            <Link href="/#contact" className="text-[#ffffffb3] text-[14px]">
              Contact Us
            </Link>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#ffffffb3] text-[10px]"
            />
            <Link href="/#listing" className="text-[#ffffffb3] text-[14px]">
              Listings
            </Link>
          </div>
        </div>
        <div className="bg-transparent-100 p-4 flex gap-[10px] flex-col">
          <h2 className="font-bold text-[24px] text-white my-5">
            Sold Properties
          </h2>
          {isLoading ? (
            <Loader />
          ) : (
            properties
              .filter((prop) => prop.status === "Sold")
              .map((prop) => (
                <div className="flex gap-4 justify-start items-center">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-[#ffffffb3] text-[10px]"
                  />
                  <Link
                    href={`/singleproperty/${prop._id}`}
                    className="text-[#ffffffb3] text-[14px]">
                    {prop.title}
                  </Link>
                </div>
              ))
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
