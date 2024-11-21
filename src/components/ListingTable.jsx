/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";

const ListingTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/getallproperties");
        setProperties(response.data.data);
      } catch (error) {
        alert("Failed to fetch properties. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      setIsLoading(true);
      await axios.post("/api/removeproperties", { id });
      // Remove the deleted property from the state
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id),
      );
      alert("Property deleted successfully!");
    } catch (error) {
      alert("Failed to delete property. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10 mx-4 z-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-sky-1 font-bold">
          <tr>
            <th scope="col" className="px-6 py-3">
              Listing
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Property Type
            </th>
            <th scope="col" className="px-6 py-3">
              Bathrooms
            </th>
            <th scope="col" className="px-6 py-3">
              Bedrooms
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr className="bg-white relative border-b" key={prop._id}>
              <td
                scope="row"
                className="flex gap-4 px-6 py-4 whitespace-nowrap justify-center items-center">
                <div className="w-[100px] h-[100px]">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="object-cover w-full h-full rounded-full border"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-medium text-gray-900">{prop.title}</h2>
                  <h2 className="">{prop.address}</h2>
                  <Link href={`/preview/property/${prop._id}`} target="_">
                    <h4 className="font-medium text-sky-1 cursor-pointer">
                      Preview
                    </h4>
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4">{prop.status}</td>
              <td className="px-6 py-4">{prop.propertyType}</td>
              <td className="px-6 py-4">{prop.price + "/- RS"}</td>
              <td className="px-6 py-4">{prop.bathrooms}</td>
              <td className="px-6 py-4">{prop.bedrooms}</td>
              <td className="px-6 py-4">
                <button
                  className="bg-red-500 font-bold text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(prop._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
