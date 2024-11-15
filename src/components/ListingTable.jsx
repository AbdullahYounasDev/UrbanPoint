/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";

const ListingTable = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/getallproperties");
        setProperties(response.data.data);
      } catch (error) {
        // Handle error by showing an alert
        alert("Failed to fetch properties. Please try again later.");
      }
    };

    fetchProperties();
  }, []);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10 mx-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="flex gap-4 px-6 py-4 whitespace-nowrap justify-center items-center">
                <div>
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="object-cover w-[100px] h-[100px] rounded-full border"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="font-medium text-gray-900">{prop.title}</h2>
                  <h2 className="">{prop.address}</h2>
                </div>
              </td>
              <td className="px-6 py-4">{prop.status}</td>
              <td className="px-6 py-4">{prop.propertyType}</td>
              <td className="px-6 py-4">{prop.price + "/- RS"}</td>
              <td className="px-6 py-4">{prop.bathrooms}</td>
              <td className="px-6 py-4">{prop.bedrooms}</td>
              <td className="px-6 py-4">
                <button className="bg-red-500 font-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
