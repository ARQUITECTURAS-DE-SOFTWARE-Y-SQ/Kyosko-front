import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8585", // Reemplaza con tu API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
