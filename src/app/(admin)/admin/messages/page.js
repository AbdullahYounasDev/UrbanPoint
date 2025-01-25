/** @format */

"use client";
import DashBoardCards from "@/components/DashBoardCards";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";
import axios from "axios";
import React, { useEffect, useState } from "react";

const pages = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/getcontact");
        setMessages(response.data.data);
      } catch (err) {
        setNotification({
          message: "No Messages Found Yet",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setNotification({
        message: "Messages data fetched successfully",
        type: "success",
      });
    }
  }, [messages]);

  if (loading) return <Loader />;

  return (
    <div className="w-[90%] px-3">
      <div>
        <h1 className="text-3xl font-bold my-3">Recent Messages</h1>
      </div>
      <div className="flex flex-wrap">
        {messages.length > 0
          ? messages.map((message) => (
              <DashBoardCards
                key={message._id}
                id={message._id}
                title={message.subject}
                firstname={message.firstName}
                lastname={message.lastName}
                numbers={message.phoneNumber}
                desc={message.message}
                width={"100%"}
                func={"delete"}
              />
            ))
          : null}
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

export default pages;
