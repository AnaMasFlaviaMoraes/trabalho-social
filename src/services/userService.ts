import api from "../api/apiClient";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  id: number; 
  name: string;
  email: string;
}

export async function createUserService(
  payload: CreateUserPayload
): Promise<CreateUserResponse> {
  const response = await api.post<CreateUserResponse>("/users", payload);
  return response.data;
}
