import { api } from "@/services/apiInstance";
import type { AdminUserRow } from "@/types/registration";

interface UsersResponse {
  success: boolean;
  users: AdminUserRow[];
}

export async function fetchAllUsers(): Promise<AdminUserRow[]> {
  const res = await api.get<UsersResponse>("/users");
  return res.users;
}

export async function deleteUser(userId: string): Promise<void> {
  await api.delete(`/users/${userId}`);
}
