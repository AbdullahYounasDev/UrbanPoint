/** @format */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCheckCircle,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

const PropertyPage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState();
  const [property, setProperty] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/property/${id}`);
        const { data } = response;

        if (!data || !data.data) {
          throw new Error("Invalid data received from the server.");
        }

        setProperty(data.data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch property data. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading || !property) {
    return <Loader />;
  }

  return (
    <div className=" m-auto w-[80%] ">
      <div className="w-full h-[100vh] flex gap-3 flex-wrap items-center justify-between">
        <div className="w-[30%]">
          <img
            src={property.image}
            className="w-full h-[400px] object-cover  rounded-md"
          />
        </div>
        <div className="w-[60%]">
          <div className="flex flex-col gap-3">
            <h3 className="flex gap-5 font-bold text-sky-1 text-[16px] items-center justify-start">
              <Link href="/property">Property</Link>{" "}
              <span className="text-[20px] text-black">/</span>{" "}
              <Link href={`preview/property/${id}`}>{property.title}</Link>
            </h3>
            <h1 className="text-[40px] font-bold text-black">
              {property.title}
            </h1>
            <h1 className="text-[24px] font-bold text-sky-1">
              {property.propertyType}
            </h1>
            <p className="text-[20px] text-black">{property.description}</p>
            <h1 className="text-[32px] font-bold text-black">
              {property.price}.00 Rs
            </h1>
          </div>
          <div className="my-7">
            <button className="p-4 text-[1.25rem] w-[150px] py-4 h-[50px]">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mb-10 flex gap-10 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center ">
          <h2 className="text-[35px] font-bold text-black text-center mb-3">
            Explore Features That Inspires
          </h2>
          <div className="w-[200px] p-[2px] bg-sky-1"></div>
        </div>
        <div className="w-full flex gap-3">
          <div className="w-[400px] border-2 flex flex-col p-5 justify-start gap-2">
            <div>
              <FontAwesomeIcon className="text-2xl text-sky-1" icon={faBed} />
            </div>
            <h3 className="font-bold text-xl">
              Comfortable {property.bedrooms} Bedroom
            </h3>
            <p>
              This Home includes {property.bedrooms} Bedroom offer spacious
              layouts, modern designs and convenient storage solutions for
              relaxation and luxury
            </p>
          </div>
          <div className="w-[400px] border-2 flex flex-col p-5 justify-start gap-2">
            <div>
              <FontAwesomeIcon className="text-2xl text-sky-1" icon={faBath} />
            </div>
            <h3 className="font-bold text-xl">
              Highly Furnished {property.bathrooms} Bathroom
            </h3>
            <p>
              This Home icludes {property.bathrooms} modern, highly furnished,
              and equipped with premium fixtures Bathroom
            </p>
          </div>
          <div className="w-[400px] border-2 flex flex-col p-5 justify-start gap-2">
            <div>
              <FontAwesomeIcon
                className="text-2xl text-sky-1"
                icon={faLocation}
              />
            </div>
            <h3 className="font-bold text-xl">Premium Location</h3>
            <p>
              Visit us at{" "}
              <span className="font-semibold text-sky-1">
                {property.address}
              </span>{" "}
              for a luxurious living experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
