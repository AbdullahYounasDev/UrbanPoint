/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import UpdateProd from "./UpdateProd";

const ListingTable = ({ searchResult }) => {
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Function to fetch properties
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      setIsLoading(true);
      await axios.post("/api/removeproperties", { id });
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== id),
      );
      setNotification({
        message: "Property deleted successfully!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message: "Failed to delete property. Please try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties =
    searchResult.length > 1
      ? properties.filter((prop) =>
          prop.title.toLowerCase().includes(searchResult.toLowerCase()),
        )
      : properties;

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="relative">
        <table className="w-[90%] lg:absolute text-sm text-left rtl:text-right text-gray-500 shadow-md  my-10 mx-2 z-10">
          <thead className="text-xs text-white uppercase bg-sky-1 font-bold">
            <tr>
              <th scope="col" className="px-6 py-3">
                Listing
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Type
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
              <th
                scope="col"
                className="px-6 py-3 flex justify-between items-center">
                Action
                <FontAwesomeIcon
                  icon={faRefresh}
                  className=" text-white text-center cursor-pointer hover:text-gray-200"
                  onClick={fetchProperties} // Trigger refresh
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((prop) => (
              <tr className="bg-white relative border-b" key={prop._id}>
                <td
                  scope="row"
                  className="flex gap-4 px-6 py-4 whitespace-nowrap justify-start items-center">
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
                  <div>
                    <button
                      className="text-red-500 font-bold bg-white px-4 py-2 rounded"
                      onClick={() => handleDelete(prop._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {show && activePropertyId && (
                      <UpdateProd
                        onClose={() => {
                          setShow(false);
                          setActivePropertyId(null);
                        }}
                        propertyId={activePropertyId}
                      />
                    )}

                    <button
                      className="text-sky-1 font-bold bg-white px-4 py-2 rounded"
                      onClick={() => {
                        setActivePropertyId(prop._id);
                        setShow(true);
                      }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </>
  );
};

export default ListingTable;
