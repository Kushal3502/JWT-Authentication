import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/" + "api/auth",
  withCredentials: true,
});

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log("Error :: ", error);
  }
};

export const post = async (endpoint, data = {}) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log("Error :: ", error);
  }
};
