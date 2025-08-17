import axios from "axios"

export const httpServer = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL ?? import.meta.env.VITE_API_PROD,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000,
  timeoutErrorMessage: "Temps de chargement excédé, rechargez la page",
  withCredentials: true,
})
