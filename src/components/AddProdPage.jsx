import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AddProdPage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <div
          onClick={() => onClose()}
          className="text-sky-1 absolute right-2 top-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div>
          <h1 className="text-3xl font-bold my-3">
            Let'<span className="text-sky-1">s</span> Create Your{" "}
            <span className="text-sky-1">New Listing</span>
          </h1>
        </div>
        <form action="" className="flex flex-col gap-2">
          <div className="w-full flex gap-2 ">
            <input type="text" placeholder="Enter Title" required />
            <input type="number" placeholder="Number of Bedrooms" required />
          </div>
          <div className="w-full flex gap-2 ">
            <input type="number" placeholder="Number of Bathrooms" required />
            <input type="text" placeholder="Address" required />
          </div>
          <div className="w-full flex gap-2 ">
            <input type="number" placeholder="Price" required />
            <select id="property-type" required>
              <option value="" selected disabled>
                Property Type{" "}
              </option>
              <option value="">Selling </option>
              <option value="">Rental </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="uploadImage" className="font-semibold text-sky-1">
              Upload Image
            </label>
            <input
              name="uploadImage"
              id="uploadImage"
              type="file"
              accept="image/*"
              required
            />
          </div>
          <textarea
            name=""
            id=""
            placeholder="Enter Description"
            required
          ></textarea>
          <button>Upload Listing</button>
        </form>
      </div>
    </div>
  );
};

export default AddProdPage;
