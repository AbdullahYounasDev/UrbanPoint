/** @format */
"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Notification from "./Notification";
import Loader from "./Loader";

const initialValue = {
  title: "",
  bedrooms: 0,
  bathrooms: 0,
  address: "",
  price: 0,
  propertyType: "",
  image: "",
  description: "",
};

const AddProdPage = ({ onClose }) => {
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
    formData.append("title", data.title);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("address", data.address);
    formData.append("price", data.price);
    formData.append("propertyType", data.propertyType);
    formData.append("image", data.image);
    formData.append("description", data.description);

    try {
      // Send POST request to /property
      const response = await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      if (response.status === 200) {
        onClose(); // Close modal if onClose is provided
      }
    } catch (error) {
      // Handle errors
      setNotification({
        message: "Error in uploading listing",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <div
          onClick={() => onClose()}
          className="text-sky-1 absolute right-2 top-2 cursor-pointer">
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div>
          <h1 className="text-3xl font-bold my-3">
            Let'<span className="text-sky-1">s</span> Create Your{" "}
            <span className="text-sky-1">New Listing</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="w-full flex gap-2 ">
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
          <div className="w-full flex gap-2 ">
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
          <div className="w-full flex gap-2 ">
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
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="font-semibold text-sky-1">
              Upload Image
            </label>
            <input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChangeInImage}
              required
            />
          </div>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            placeholder="Enter Description"
            required
          />
          <button type="submit">
            {isLoading ? <Loader color={"white"} /> : "Upload Listing"}
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
  );
};

export default AddProdPage;
