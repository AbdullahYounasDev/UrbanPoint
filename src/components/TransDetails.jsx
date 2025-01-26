/** @format */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const TransDetails = ({ currentUser, properties, transaction, onClose }) => {
  const filterdProp = properties.find((p) => p._id === transaction.property);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white min-w-[300px] w-auto p-7 rounded shadow-lg text-black text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sky-1 bg-white">
          <FontAwesomeIcon icon={faClose} size="lg" />
        </button>
        <div className="flex gap-4 flex-wrap  sm:flex-nowrap">
          <div className="sm:border-r pr-3">
            <h1 className="text-2xl font-bold text-start my-3">
              User's Payment Details:
            </h1>
            <div className="my-3 px-3 py-1 font-bold h-[75px] w-[75px] rounded-[50px] flex gap-1 justify-center items-center bg-sky-1">
              <h1 className="text-white font-bold text-[35px]">
                {currentUser?.name.slice(0, 1).toUpperCase()}
              </h1>
            </div>
            <ul className="gap-2 flex flex-col justify-start items-start w-full">
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Card Holder Name : </strong>{" "}
                {transaction.cardHolder}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Account No: : </strong>{" "}
                {transaction.accountNumber}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Amount : </strong>{" "}
                {transaction.amount}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Date : </strong>{" "}
                {transaction.createdAt.split("T")[0]}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">CVV : </strong>{" "}
                {transaction.cvv}
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-start my-3">
              Property Details:
            </h1>
            <div className="w-[75px] h-[75px] rounded-full my-3">
              <img
                src={filterdProp.image}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>
            <ul className="gap-2 flex flex-col justify-start items-start w-full">
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Title : </strong>{" "}
                {filterdProp.title}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Account No : </strong>{" "}
                {filterdProp.price}
              </li>
              <li className="text-start text-sm text-gray-800">
                <strong className=" text-gray-900">Address : </strong>{" "}
                {filterdProp.address}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Status : </strong>{" "}
                {filterdProp.status}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Bathrooms : </strong>{" "}
                {filterdProp.bathrooms}
              </li>
              <li className="text-sm text-gray-800">
                <strong className="text-gray-900">Bedrooms : </strong>{" "}
                {filterdProp.bedrooms}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransDetails;
