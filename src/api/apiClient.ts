import axios from 'axios';
import { getAuth } from "../utils/authStorage";

const api = axios.create({
  baseURL: 'https://simple-api-ngvw.onrender.com',
});

api.interceptors.request.use(async (config) => {
  const auth = await getAuth();
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default api;
