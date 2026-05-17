import type { CampusEvent } from "@/types/event";

export type RegistrationStatus = "pending" | "accepted" | "rejected";

export interface EventRegistration {
  id: string;
  status: RegistrationStatus;
  createdAt: string;
  event: CampusEvent;
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  registrationCount: number;
  createdAt: string;
}

export interface AdminRegistrationRow extends EventRegistration {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "student" | "admin";
  };
}
