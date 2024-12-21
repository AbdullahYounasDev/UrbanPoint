/** @format */

"use client";
import Loader from "@/components/Loader";
import UsersCard from "@/components/UsersCard";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  if (!user) {
    return <Loader />;
  }

  useEffect(() => {
    if (
      !isSignedIn ||
      !user?.emailAddresses?.[0]?.emailAddress ||
      user.emailAddresses[0].emailAddress !==
        process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      router.push("/");
    }
  }, [isSignedIn, user, router]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [users, setUsers] = useState([]);
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
    if (users) {
      setNotification({
        message: "Users data fetched successfully",
        type: "success",
      });
    }
  }, [users]);
  if (loading) return <Loader />;
  return (
    <div className="w-[100%]">
      <div>
        <h1 className="text-3xl font-bold my-3 lg:text-start text-center">
          Our Users
        </h1>
        <div className="flex w-100 flex-wrap gap-2 lg:justify-start justify-center items-center">
          {users.map((user) => {
            return (
              <UsersCard
                key={user._id}
                id={user.clerkId}
                name={user.clerkName}
                email={user.clerkEmail}
                photoSrc={user.photo}
                createdAt={user.createdAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
