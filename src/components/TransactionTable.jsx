/** @format */

"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  faArrowRightArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "./Notification";
import ProdSearch from "./ProdSearch";
import TransDetails from "./TransDetails";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TransactionTable = () => {
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <Loader />;
  }

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const resposne = await axios.get("/api/getalltransactions");
      setTransaction(resposne.data.data.reverse());
    } catch (error) {
      setNotification({
        message: "Failed to fetch Transactions. Please try again later.",
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
      const response = await axios.get("/api/users");
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

  const filteredTrans =
    search.length > 1
      ? transaction.filter(
          (trans) =>
            trans.cardHolder.toLowerCase().includes(search.toLowerCase()) ||
            trans.amount.toString().includes(search.toString()),
        )
      : transaction;

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-[30px] font-bold">Transactions:</h1>
        <ProdSearch search={search} setSearch={setSearch} />
      </div>
      <div className="w-full flex gap-4 flex-wrap md:justify-start justify-center items-center">
        {filteredTrans.map((trans) => (
          <div className="flex flex-col border p-3 mt-2 pt-4 gap-4">
            <div className="flex justify-center items-center">
              <div className="flex justify-start items-start flex-col">
                <div className="px-3 py-1 font-bold min-h-[75px] min-w-[75px] rounded-[50px] flex gap-1 justify-center items-center bg-sky-1">
                  <h1 className="text-white font-bold text-[35px]">
                    {users
                      .find((user) => user.email == trans.buyerEmail)
                      ?.name.slice(0, 1)
                      .toUpperCase()}
                  </h1>
                </div>
                <div className="w-[115px]  py-4 text-[10px] font-bold text-gray-900 sm:pl-6">
                  {users
                    .find((user) => user.email == trans.buyerEmail)
                    ?.name.toUpperCase()}
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
                <div className="min-w-[115px] w-auto  py-4 text-[10px] font-bold text-gray-900 text-center">
                  {properties.find((prop) => prop._id == trans.property)?.title}
                </div>
              </div>
            </div>
            <div className="w-[80%] border-b self-center"></div>
            <div>
              <ul class="space-x-4 flex flex-row justify-center w-full mb-4">
                <li class="text-sm text-gray-800">
                  <strong class="text-gray-900">Amount : </strong>{" "}
                  {trans.amount}
                </li>
                <li class="text-sm text-gray-800">
                  <strong class="text-gray-900">Date : </strong>{" "}
                  {trans.createdAt.split("T")[0]}
                </li>
              </ul>
              <ul class="space-x-4 flex flex-row justify-center w-full mb-4">
                <li class="text-sm text-gray-800">
                  <strong class="text-gray-900">Card Holder : </strong>{" "}
                  {trans.cardHolder.slice(0, 6)} ...
                </li>
                <li class="text-sm text-gray-800">
                  <strong class="text-gray-900">Account No. : </strong>{" "}
                  {trans.accountNumber.slice(0, 6)} ...
                </li>
              </ul>
            </div>
            <div className="w-[80%] border-b self-center"></div>
            <button
              className="p-4 text-[14px] w-full py-4 h-[30px]"
              onClick={() => setActiveTransaction(trans)}>
              Show More Details
            </button>
            {activeTransaction && activeTransaction._id === trans._id && (
              <TransDetails
                currentUser={users.find(
                  (user) => user.email == trans.buyerEmail,
                )}
                properties={properties}
                transaction={activeTransaction}
                onClose={() => setActiveTransaction(null)}
              />
            )}
          </div>
        ))}
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

export default TransactionTable;
