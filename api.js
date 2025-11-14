import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use((config) => {
  const user = auth.currentUser;
  if (user) {
    config.headers["x-user-id"] = user.uid;
    config.headers["x-user-email"] = user.email;
  }
  return config;
});

export default api;