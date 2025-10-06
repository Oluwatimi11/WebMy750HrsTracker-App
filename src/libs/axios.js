import axios from "axios";
import { LocalStorageKeys } from "../app/constants";

const base = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

base.interceptors.request.use((config) => {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default base;
