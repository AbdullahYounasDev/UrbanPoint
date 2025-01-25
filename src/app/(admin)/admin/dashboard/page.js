/** @format */

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardCards from "@/components/DashBoardCards";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";

const UsersPage = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, propertiesRes, messagesRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/getallproperties"),
          axios.get("/api/getcontact"),
        ]);

        setUsers(usersRes.data.data);
        setProperties(propertiesRes.data.data);
        setMessages(messagesRes.data.data);

        setNotification({
          message: "Users, Property, and Messages data fetched successfully",
          type: "success",
        });
      } catch (err) {
        setNotification({
          message: "Server error in fetching data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const recentUsers = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= today && createdAt < tomorrow;
  });

  // Sold and Available Listings
  const soldProps = properties.filter((prop) => prop.status === "Sold");
  const availProps = properties.filter((prop) => prop.status === "Available");

  if (loading) return <Loader />;

  return (
    <>
      <div className="w-[100%] flex flex-row gap-4 p-3 pr-5 md:flex-nowrap flex-wrap">
        <div className="md:w-[60%] md:block w-full flex flex-col justify-center items-center">
          <div>
            <h1 className="text-3xl font-bold my-3">Analytics</h1>
          </div>
          <div className="flex gap-5 mb-5 md:flex-nowrap flex-wrap justify-center items-center">
            <DashBoardCards
              title={"Total Users"}
              numbers={users.length || "0"}
              type={"All Times"}
              width={"250px"}
            />
            <DashBoardCards
              title={"Today Signups"}
              numbers={recentUsers.length || "0"}
              type={"Our Recent Users"}
              width={"250px"}
            />
          </div>
          <div className="flex gap-5 mb-5 md:flex-nowrap flex-wrap justify-center items-center">
            <DashBoardCards
              title={"Available Listings"}
              numbers={availProps.length || "0"}
              type={"Available Listings"}
              width={"250px"}
            />
            <DashBoardCards
              title={"Finalized Listings"}
              numbers={soldProps.length || "0"}
              type={"Sold Listings"}
              width={"250px"}
            />
          </div>
        </div>

        <div className="md:w-[40%] md:block w-full flex flex-col justify-start items-center">
          <div>
            <h1 className="text-3xl font-bold my-3">Recent Messages</h1>
          </div>
          <div className="flex flex-wrap">
            {messages
              .slice(-3)
              .reverse()
              .map((message) => (
                <DashBoardCards
                  key={message._id}
                  id={message.id}
                  title={message.subject}
                  firstname={message.firstName}
                  lastname={message.lastName}
                  numbers={message.phoneNumber}
                  desc={message.message}
                  width={"100%"}
                />
              ))}
          </div>
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

export default UsersPage;
