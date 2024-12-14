/** @format */

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Transaction = ({ onClose, price }) => {
  return (
    <div className="fixed w-[100vw] min-h-[100vh] max-h-[105vh] h-auto inset-0 bg-black bg-opacity-50 flex sm:items-center items-start justify-center z-20">
      <div class="bg-white rounded-lg shadow-lg p-6 relative">
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-sky-1 cursor-pointer"
        />
        <h2 class="text-lg font-medium mb-6">Payment Information</h2>
        <form>
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
              <label
                for="card-number"
                class="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                name="card-number"
                id="card-number"
                placeholder="0000 0000 0000 0000"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                value={price}
                type="text"
                name="amount"
                id="amount"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="cvv"
                class="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="000"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="card-holder"
                class="block text-sm font-medium text-gray-700 mb-2">
                Card Holder
              </label>
              <input
                type="text"
                name="card-holder"
                id="card-holder"
                placeholder="Full Name"
                class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div class="mt-8">
            <button type="submit" class="w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
