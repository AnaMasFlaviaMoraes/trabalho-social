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

export interface UserItem {
  id: number;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export interface UsersResponse {
  count: number;
  users: UserItem[];
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export async function createUserService(
  payload: CreateUserPayload
): Promise<CreateUserResponse> {
  const response = await api.post<CreateUserResponse>("/users", payload);
  return response.data;
}

export async function getUsersService(
  params: GetUsersParams = {}
): Promise<UsersResponse> {
  const response = await api.get<UsersResponse>("/users", { params });
  return response.data;
}
