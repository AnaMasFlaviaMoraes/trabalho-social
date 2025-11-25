import api from "../api/apiClient";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | string;
}

export interface LoginResponse {
  user: User;
  jwt: string;
}

export async function loginService(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", {
    email,
    password,
  });

  return response.data;
}
