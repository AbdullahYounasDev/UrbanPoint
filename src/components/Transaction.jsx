"use client";
import { useAuth } from "@clerk/nextjs";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Notification from "./Notification";
import Loader from "./Loader";

const Transaction = ({ onClose, price, id, setIsTransaction }) => {
  const { isSignedIn, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyerId: userId,
    propertyId: id,
    accountNumber: "",
    amount: price,
    cvv: "",
    cardHolder: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isSignedIn) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/createtransaction",
          formData,
        );
        setIsTransaction(true);
        onClose();
      } catch (error) {
        console.error("Error creating transaction:", error);
        setNotification({
          message: "Transaction failed. Please try again.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setNotification({
        message: "Please Sign in first !!!",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed w-[100vw] min-h-[100vh] max-h-[105vh] h-auto inset-0 bg-black bg-opacity-50 flex sm:items-center items-start justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-sky-1 cursor-pointer"
        />
        <h2 className="text-lg font-medium mb-6">Payment Information</h2>
        <form onSubmit={handleClick}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label
                for="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                placeholder="0000 0000 0000 0000"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                for="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount
              </label>
              <input
                value={price}
                type="text"
                name="amount"
                id="amount"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                for="cvv"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="***"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                for="cardHolder"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Card Number
              </label>
              <input
                type="text"
                name="cardHolder"
                id="cardHolder"
                placeholder="e.g John Doe"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="w-full">
              {isLoading ? <Loader color={"white"} /> : "Submit"}
            </button>
          </div>
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

export default Transaction;
