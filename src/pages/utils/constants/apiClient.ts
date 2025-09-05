// src/utils/constants/apiClient.ts
import axios from "axios";

export const CLIENT = axios.create({
  baseURL: "http://localhost:8080/api", // Spring Boot backend URL
  headers: {
    "Content-Type": "application/json", // Do NOT set 'Origin' manually
  },
});
