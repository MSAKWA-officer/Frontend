// src/utils/constants/apiClient.ts
import axios from "axios";

export const CLIENT = axios.create({
  baseURL: "https://workloaddsitribution-2.onrender.com", // Spring Boot backend URL
  headers: {
    "Content-Type": "application/json", // Do NOT set 'Origin' manually
  },
});
