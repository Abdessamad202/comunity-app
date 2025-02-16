import axios from "axios";

// Get token from localStorage
const token = localStorage.getItem("token");

// Create an axios instance with default headers
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// Update token dynamically if it changes
apiClient.interceptors.request.use((config) => {
  const newToken = localStorage.getItem("token");
  if (newToken) {
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
});

export default apiClient;
