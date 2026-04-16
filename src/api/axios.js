import axios from "axios";

const api = axios.create({
  // If the app is running on Vercel/Production, use the Render URL. Otherwise, use localhost.
  baseURL: import.meta.env.MODE === "production" 
    ? "https://arinya-shree-backend.onrender.com/api" 
    : "http://localhost:5000/api",
});

export default api;
