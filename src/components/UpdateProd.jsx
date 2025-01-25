/** @format */
"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Notification from "./Notification";
import Loader from "./Loader";

const UpdateProd = ({ onClose, propertyData, setCheckData }) => {
  console.log(propertyData);
  const initialValue = {
    title: propertyData.title,
    bedrooms: propertyData.bedrooms,
    bathrooms: propertyData.bathrooms,
    address: propertyData.address,
    price: propertyData.price,
    propertyType: propertyData.propertyType,
    image: "",
    description: propertyData.description,
  };
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInImage = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", propertyData._id); // `propertyId` comes from props
    formData.append("title", data.title);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("address", data.address);
    formData.append("price", data.price);
    formData.append("propertyType", data.propertyType);
    formData.append("image", data.image); // Handle new image or retain old
    formData.append("description", data.description);

    try {
      const response = await axios.put("/api/updateproperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setCheckData(true);
        onClose(); // Close modal after success
      }
    } catch (error) {
      setNotification({
        message: "Error updating the property.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed w-[100vw] min-h-[100vh] max-h-[105vh] h-auto inset-0 bg-black/10 bg-opacity-50 flex sm:items-center items-start justify-center z-20">
      <div className="sm:w-auto w-[100vw]">
        <div className="bg-white p-6 rounded shadow-lg relative">
          <div
            onClick={() => onClose()}
            className="text-sky-1 absolute right-2 top-2 cursor-pointer">
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div>
            <h1 className="text-3xl font-bold my-3">
              Let'<span className="text-sky-1">s</span> Update{" "}
              <span className="text-sky-1">{propertyData.title}</span>
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex sm:w-auto min-w-[300px] flex-col gap-2 sm:justify-start sm:items-start justify-center items-center">
            <div className="w-full flex sm:flex-nowrap flex-wrap gap-2 ">
              <input
                onChange={handleChange}
                value={data.title}
                name="title"
                type="text"
                placeholder="Enter Title"
                required
              />
              <input
                onChange={handleChange}
                value={data.bedrooms || ""}
                name="bedrooms"
                type="number"
                placeholder="Number of Bedrooms"
                required
              />
            </div>
            <div className="w-full flex sm:flex-nowrap flex-wrap gap-2 ">
              <input
                onChange={handleChange}
                value={data.bathrooms || ""}
                name="bathrooms"
                type="number"
                placeholder="Number of Bathrooms"
                required
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleChange}
                value={data.address}
                required
              />
            </div>
            <div className="w-full flex sm:flex-nowrap flex-wrap gap-2 ">
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                value={data.price || ""}
                required
              />
              <select
                name="propertyType"
                id="propertyType"
                onChange={handleChange}
                value={data.propertyType || ""}
                required>
                <option value="" disabled>
                  Property Type
                </option>
                <option value="Selling">Selling</option>
                <option value="Rental">Rental</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="image" className="font-semibold text-sky-1">
                Upload Image
              </label>
              <input
                name="image"
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChangeInImage}
              />
            </div>
            <textarea
              onChange={handleChange}
              value={data.description}
              name="description"
              className="w-full"
              placeholder="Enter Description"
              required
            />
            <button type="submit">
              {isLoading ? <Loader color={"white"} /> : "Update Listing"}
            </button>
          </form>
        </div>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateProd;
