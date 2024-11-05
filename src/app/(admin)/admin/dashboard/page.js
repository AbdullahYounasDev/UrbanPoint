"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DashBoardCards from "@/components/DashBoardCards";

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getusers");
        setData(response.data.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
   
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of today

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to the start of tomorrow

  const rescentUsers = data.filter((item) => {
    const createdDate = new Date(item.createdAt);
    return createdDate >= today && createdDate < tomorrow; // Check if created today
  });

  console.log(rescentUsers);
  if (loading) return "Loading....";
  if (error) return <p>{error}</p>;

  return (
    <div className="w-[100%]">
      <div className="flex gap-5 flex-wrap">
        <DashBoardCards
          title={"Total Users"}
          numbers={data.length === 0 ? "0" : data.length}
          type={"All Times"}
        />
        <DashBoardCards
          title={"Rescent Signups"}
          numbers={rescentUsers.length === 0 ? "0" : rescentUsers.length}
          type={"All Times"}
        />
      </div>
    </div>
  );
};

export default UsersPage;
