/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import ProdSearch from "@/components/ProdSearch";
import TransDetails from "@/components/TransDetails";

const Page = () => {
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, transactionRes, propertyRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/getalltransactions"),
          axios.get("/api/getallproperties"),
        ]);
        setUsers(userRes.data.data);
        setTransactions(transactionRes.data.data.reverse());
        setProperties(propertyRes.data.data.reverse());
      } catch (error) {
        setNotification({
          message: "Failed to fetch data. Please try again later.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      status === "authenticated" &&
      users.length > 0 &&
      session?.user?.email
    ) {
      const foundUser = users.find((u) => u.email === session.user.email);
      setCurrentUser(foundUser || null);
    }
  }, [status, users, session]);

  useEffect(() => {
    if (currentUser && transactions.length > 0) {
      const filteredTransactions = transactions.filter(
        (t) => t.buyerEmail === currentUser.email,
      );
      setUserTransactions(filteredTransactions || []);
    }
  }, [currentUser, transactions]);

  const filteredUserTransactions =
    search.length > 1
      ? userTransactions.filter(
          (trans) =>
            trans.cardHolder.toLowerCase().includes(search.toLowerCase()) ||
            trans.amount.toString().includes(search.toString()),
        )
      : userTransactions;

  if (status === "loading" || isLoading) return <Loader />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-[30px] font-bold">Transactions:</h1>
        <ProdSearch search={search} setSearch={setSearch} />
      </div>
      <div className="w-full flex gap-4 flex-wrap md:justify-start justify-center items-center">
        {userTransactions.length > 0 ? (
          filteredUserTransactions.map((trans) => (
            <div
              key={trans._id}
              className="flex flex-col border p-3 mt-2 pt-4 gap-4">
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-start">
                  <div className="px-3 py-1 font-bold h-[75px] w-[75px] rounded-[50px] flex gap-1 justify-center items-center bg-sky-1">
                    <h1 className="text-white font-bold text-[35px]">
                      {currentUser?.name.slice(0, 1).toUpperCase()}
                    </h1>
                  </div>
                  <div className="w-[115px] py-4 text-[10px] font-bold text-gray-900">
                    {currentUser?.name.toUpperCase()}
                  </div>
                </div>
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                <div className="flex flex-col items-center">
                  <img
                    src={
                      properties.find((prop) => prop._id === trans.property)
                        ?.image
                    }
                    alt={
                      properties.find((prop) => prop._id === trans.property)
                        ?.title
                    }
                    className="w-[75px] h-[75px] rounded-full border object-cover"
                  />
                  <div className="w-auto py-4 text-[10px] font-bold text-gray-900 text-center">
                    {
                      properties.find((prop) => prop._id === trans.property)
                        ?.title
                    }
                  </div>
                </div>
              </div>
              <div className="w-[80%] border-b self-center"></div>
              <ul className="space-x-4 flex flex-row justify-center w-full mb-4">
                <li className="text-sm text-gray-800">
                  <strong className="text-gray-900">Amount: </strong>
                  {trans.amount}
                </li>
                <li className="text-sm text-gray-800">
                  <strong className="text-gray-900">Date: </strong>
                  {trans.createdAt.split("T")[0]}
                </li>
              </ul>
              <button
                className="p-4 text-[14px] w-full py-4 h-[30px]"
                onClick={() => setActiveTransaction(trans)}>
                Show More Details
              </button>
              {activeTransaction?._id === trans._id && (
                <TransDetails
                  currentUser={currentUser}
                  properties={properties}
                  transaction={activeTransaction}
                  onClose={() => setActiveTransaction(null)}
                />
              )}
            </div>
          ))
        ) : (
          <p>No Transactions Found !!</p>
        )}
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

export default Page;
