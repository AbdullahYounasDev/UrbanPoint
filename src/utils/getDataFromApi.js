import axios from "axios";

export const getDataFromApi = async (url) => {
  try {
    const response = await axios.get(`/api/${url}`);
    return response;
  } catch (error) {
    return error;
  }
};
