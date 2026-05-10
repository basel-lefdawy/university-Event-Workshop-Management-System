import type { AuthUser, LoginCredentials, RegisterPayload, UserRole } from "@/types/user";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function roleFromEmail(email: string): UserRole {
  const e = email.trim().toLowerCase();
  if (e.startsWith("admin@")) {
    return "admin";
  }
  return "student";
}

/** Replace internals with api.post('/auth/login', ...) when backend is ready. */
export async function loginWithCredentials(creds: LoginCredentials): Promise<AuthUser> {
  await delay(400);
  const nameFromEmail = creds.email.split("@")[0]?.replace(/\./g, " ") ?? "Student";
  return {
    id: crypto.randomUUID(),
    email: creds.email,
    name: nameFromEmail.slice(0, 1).toUpperCase() + nameFromEmail.slice(1),
    role: roleFromEmail(creds.email),
  };
}

export async function registerAccount(payload: RegisterPayload): Promise<AuthUser> {
  await delay(500);
  return {
    id: crypto.randomUUID(),
    email: payload.email,
    name: payload.name,
    role: roleFromEmail(payload.email),
  };
}
