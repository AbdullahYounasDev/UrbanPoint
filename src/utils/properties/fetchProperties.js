/** @format */

import axios from "axios";

export const fetchProperties = async () => {
  try {
    const response = await axios.get("/api/getallproperties");
    return response.data.data.reverse();
  } catch (error) {
    throw new Error("Failed to fetch properties. Please try again later.");
  }
};
