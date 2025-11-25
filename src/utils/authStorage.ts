import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "../services/authService";

const AUTH_KEY = "@trabalho-social:auth";

export interface AuthData {
  user: User;
  token: string; 
}

export async function saveAuth(auth: AuthData) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export async function getAuth(): Promise<AuthData | null> {
  const stored = await AsyncStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthData;
  } catch {
    return null;
  }
}

export async function clearAuth() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
