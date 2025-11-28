import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { router } from "expo-router";
import { AUTH_KEY, getAuth } from "../utils/authStorage";
import { showMessage } from "../utils/showMessage";

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        await AsyncStorage.removeItem(AUTH_KEY);
      } catch (e) {
        console.log("Erro ao limpar auth no 401:", e);
      }

      showMessage("Sua sessão expirou. Faça login novamente.", "error");

      router.replace("/");
    }

    return Promise.reject(error);
  }
);

export default api;
