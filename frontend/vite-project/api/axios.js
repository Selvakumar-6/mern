import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-backend-ubj0.onrender.com/",
});

export default api;
