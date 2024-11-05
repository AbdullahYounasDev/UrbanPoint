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

  useEffect(() => {
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

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/getallproperties");
        setProperties(response.data.data);
      } catch (err) {
        setNotification({
          message: "Server error in fetching properties",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/getcontact");
        setMessages(response.data.data);
      } catch (err) {
        setNotification({
          message: "Server error in fetching messages",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (users && properties && messages) {
      setNotification({
        message: "Users, Property and Messages data fetched successfully",
        type: "success",
      });
    }
  }, [users, properties, messages]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const recentUsers = users.filter((user) => {
    const createdAt = Number(user.createdAt);
    return createdAt >= today.getTime() && createdAt < tomorrow.getTime();
  });

  // Sold Listings
  const soldProps = properties.filter((prop) => prop.status == "Sold");

  if (loading) return <Loader />;

  return (
    <div className="w-[100%] flex flex-row gap-3 p-3 pr-5 lg:flex-nowrap sm:flex-wrap">
      <div className="w-[60%]">
        <div>
          <h1 className="text-3xl font-bold my-3">Analytics</h1>
        </div>
        <div className="flex gap-5 flex-wrap mb-5">
          <DashBoardCards
            title={"Total Users"}
            numbers={users.length === 0 ? "0" : users.length}
            type={"All Times"}
            width={"250px"}
          />
          <DashBoardCards
            title={"Today Signups"}
            numbers={recentUsers.length === 0 ? "0" : recentUsers.length}
            type={"Our Recent Users"}
            width={"250px"}
          />
        </div>
        <div className="flex gap-5 flex-wrap mb-5">
          <DashBoardCards
            title={"Total Listings"}
            numbers={properties.length === 0 ? "0" : properties.length}
            type={"All Listed Properties"}
            width={"250px"}
          />
          <DashBoardCards
            title={"Finalized Listings"}
            numbers={soldProps.length === 0 ? "0" : soldProps.length}
            type={"Sold Listings"}
            width={"250px"}
          />
        </div>
      </div>

      <div className="w-[40%]">
        <div>
          <h1 className="text-3xl font-bold my-3">Rescent Messages</h1>
        </div>
        <div className="flex flex-wrap">
          {messages
            .slice(-3)
            .reverse()
            .map((message) => {
              return (
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
              );
            })}
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
  );
};

export default UsersPage;
