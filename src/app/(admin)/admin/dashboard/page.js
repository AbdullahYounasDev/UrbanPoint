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

  if (loading) return "Loading....";
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mt-2 mb-4">Users Details:</h1>
      </div>
      <div>
        <DashBoardCards
          title={"Total User"}
          numbers={data.length === 0 ? "0" : data.length}
          type={"All Times"}
        />
      </div>
    </div>
  );
};

export default UsersPage;
