import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

// RESPONSE
axiosClient.interceptors.response.use(async (response) => {
  return response.data;
});

export { axiosClient };
