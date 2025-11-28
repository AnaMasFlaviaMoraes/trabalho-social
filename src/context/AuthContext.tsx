import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../services/authService";
import {
  clearAuth,
  getAuth,
  saveAuth,
  type AuthData,
} from "../utils/authStorage";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (auth: AuthData) => Promise<void>;
  logout: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthData() {
      const stored = await getAuth();

      if (stored) {
        setUser(stored.user);
        setToken(stored.token);
      }

      setLoading(false);
    }

    loadAuthData();
  }, []);

  async function login(auth: AuthData) {
    setUser(auth.user);
    setToken(auth.token);
    await saveAuth(auth);
  }

  async function logout() {
    setUser(null);
    setToken(null);
    await clearAuth();
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}