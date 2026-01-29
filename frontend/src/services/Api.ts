import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:5000/api/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});
