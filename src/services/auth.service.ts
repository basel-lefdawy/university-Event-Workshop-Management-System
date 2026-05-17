import { api } from "@/services/apiInstance";
import type { AuthUser, LoginCredentials, RegisterPayload } from "@/types/user";

interface AuthResponse {
  success: boolean;
  user: AuthUser;
  token: string;
}

interface MeResponse {
  success: boolean;
  user: AuthUser;
}

export async function loginWithCredentials(
  creds: LoginCredentials
): Promise<{ user: AuthUser; token: string }> {
  const res = await api.post<AuthResponse>("/auth/login", {
    email: creds.email,
    password: creds.password,
  });
  return { user: res.user, token: res.token };
}

export async function registerAccount(
  payload: RegisterPayload
): Promise<{ user: AuthUser; token: string }> {
  const res = await api.post<AuthResponse>("/auth/register", payload);
  return { user: res.user, token: res.token };
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await api.get<MeResponse>("/auth/me");
  return res.user;
}
