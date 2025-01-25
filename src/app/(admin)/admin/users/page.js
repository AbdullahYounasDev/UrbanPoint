/** @format */

"use client";

import Loader from "@/components/Loader";
import UsersCard from "@/components/UsersCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.data);
        setNotification({
          message: "Users data fetched successfully",
          type: "success",
        });
      } catch (err) {
        setNotification({
          message: "Server error in fetching users",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // Correctly invoke the function here
  }, []); // Dependency array to run only once on mount

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <div>
        <h1 className="text-3xl font-bold my-3 lg:text-start text-center">
          Our Users
        </h1>
        <div className="flex w-full flex-wrap gap-2 lg:justify-start justify-center items-center">
          {users.length > 0 ? (
            users.map((user) => (
              <UsersCard
                key={user._id}
                name={user.name}
                email={user.email}
                createdAt={user.createdAt}
              />
            ))
          ) : (
            <p className="text-lg">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
