"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  faArrowDownAZ,
  faArrowRightArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TransactionTable = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [users, setUsers] = useState([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const resposne = await axios.get(
        "http://localhost:3000/api/getalltransactions",
      );
      setTransaction(resposne.data.data.reverse());
    } catch (error) {
      setNotification({
        message: "Failed to fetch properties. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getallproperties");
      setProperties(response.data.data.reverse());
    } catch (error) {
      setNotification({
        message: "Failed to fetch properties. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/getusers");
      setUsers(response.data.data);
    } catch (err) {
      setNotification({
        message: "Server error in fetching users",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
    fetchProperties();
    fetchUsers();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="mt-6 overflow-hidden w-full rounded-xl border shadow">
      <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
        <thead className="hidden border-b lg:table-header-group">
          <tr className="">
            <td
              width="50%"
              className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
            >
              Invoice
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Date
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Amount
            </td>

            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
              Status
            </td>
          </tr>
        </thead>

        <tbody className="lg:border-gray-300">
          {transaction.map((trans) => (
            <tr className="" key={trans._id}>
              <td width="50%" className="flex gap-7 items-center justify-start">
                <div className="flex justify-start items-start flex-col">
                  <div className="w-[75px] h-[75px] sm:mx-6">
                    <img
                      src={users.find((user) => user._id == trans.buyer)?.photo}
                      alt={
                        users.find((user) => user._id == trans.buyer)?.clerkName
                      }
                      className="object-cover w-full h-full rounded-full border"
                    />
                  </div>
                  <div className="w-[115px] whitespace-no-wrap py-4 text-[10px] font-bold text-gray-900 sm:pl-6">
                    {users.find((user) => user._id == trans.buyer)?.clerkName}
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div className="w-[75px] h-[75px] sm:mx-6">
                    <img
                      src={
                        properties.find((prop) => prop._id == trans.property)
                          ?.image
                      }
                      alt={
                        properties.find((prop) => prop._id == trans.property)
                          ?.title
                      }
                      className="object-cover w-full h-full rounded-full border"
                    />
                  </div>
                  <div className="min-w-[115px] w-auto whitespace-no-wrap py-4 text-[10px] font-bold text-gray-900 text-center">
                    {
                      properties.find((prop) => prop._id == trans.property)
                        ?.title
                    }
                  </div>
                </div>
              </td>

              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                07 February, 2022
              </td>

              <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                $59.00
                <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                  Complete
                </div>
              </td>

              <button className="text-red-500 font-bold bg-white px-4 py-2 rounded">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
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

export default TransactionTable;
