/** @format */
"use client";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import ProdSearch from "@/components/ProdSearch";
import TransDetails from "@/components/TransDetails";
import { useUser } from "@clerk/nextjs";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { status, data } = useSession();
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [userTransaction, setUserTransaction] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  useEffect(() => {
    const showSession = () => {
      if (status === "authenticated") {
        setUser(data?.user);
      } else if (status === "loading") {
        setUser(null);
      }
    };
    showSession();
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const resposne = await axios.get(
        "http://localhost:3000/api/getalltransactions",
      );
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.data);
    } catch (err) {
      setNotification({
        message: "Failed to fetch Users. Please try again later.",
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

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
    fetchProperties();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && user && users.length > 0) {
      const foundUser = users.find((u) => u.email === user?.email);
      setCurrentUser(foundUser || null);
    }
  }, [status === "authenticated", user, users]);

  useEffect(() => {
    if (currentUser && transaction.length > 0) {
      const foundTransaction = transaction.filter(
        (t) => t.buyer === currentUser._id,
      );
      setUserTransaction(foundTransaction || []);
    }
  }, [currentUser, transaction]);

  const filteredUserTrans =
    search.length > 1
      ? userTransaction.filter(
          (trans) =>
            trans.cardHolder.toLowerCase().includes(search.toLowerCase()) ||
            trans.amount.toString().includes(search.toString()),
        )
      : userTransaction;

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-[30px] font-bold">Transactions:</h1>
          <ProdSearch search={search} setSearch={setSearch} />
        </div>
        <div className="w-full flex gap-4 flex-wrap md:justify-start justify-center items-center">
          {userTransaction.length > 0
            ? filteredUserTrans.map((trans) => (
                <div
                  className="flex flex-col border p-3 mt-2 pt-4 gap-4"
                  key={trans._id}>
                  <div className="flex justify-center items-center">
                    <div className="flex justify-start items-start flex-col">
                      <div className="w-[75px] h-[75px] sm:mx-6">
                        <img
                          src={currentUser.photo}
                          alt={currentUser.name}
                          className="object-cover w-full h-full rounded-full border"
                        />
                      </div>
                      <div className="w-[115px] py-4 text-[10px] font-bold text-gray-900 sm:pl-6">
                        {currentUser.name}
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    </div>
                    <div className="flex justify-center items-center flex-col">
                      <div className="w-[75px] h-[75px] sm:mx-6">
                        <img
                          src={
                            properties.find(
                              (prop) => prop._id == trans.property,
                            )?.image
                          }
                          alt={
                            properties.find(
                              (prop) => prop._id == trans.property,
                            )?.title
                          }
                          className="object-cover w-full h-full rounded-full border"
                        />
                      </div>
                      <div className="min-w-[115px] w-auto py-4 text-[10px] font-bold text-gray-900 text-center">
                        {
                          properties.find((prop) => prop._id == trans.property)
                            ?.title
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-[80%] border-b self-center"></div>
                  <div>
                    <ul className="space-x-4 flex flex-row justify-center w-full mb-4">
                      <li className="text-sm text-gray-800">
                        <strong className="text-gray-900">Amount : </strong>{" "}
                        {trans.amount}
                      </li>
                      <li className="text-sm text-gray-800">
                        <strong className="text-gray-900">Date : </strong>{" "}
                        {trans.createdAt.split("T")[0]}
                      </li>
                    </ul>
                    <ul className="space-x-4 flex flex-row justify-center w-full mb-4">
                      <li className="text-sm text-gray-800">
                        <strong className="text-gray-900">
                          Card Holder :{" "}
                        </strong>{" "}
                        {trans.cardHolder.slice(0, 6)} ...
                      </li>
                      <li className="text-sm text-gray-800">
                        <strong className="text-gray-900">
                          Account No. :{" "}
                        </strong>{" "}
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
                      currentUser={currentUser}
                      properties={properties}
                      transaction={activeTransaction}
                      onClose={() => setActiveTransaction(null)}
                    />
                  )}
                </div>
              ))
            : "No Transactions Found !!"}
        </div>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}
      </div>
    </>
  );
};

export default Page;
