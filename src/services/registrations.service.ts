import { api } from "@/services/apiInstance";
import type { AdminRegistrationRow, EventRegistration } from "@/types/registration";

interface MyRegistrationsResponse {
  success: boolean;
  registrations: EventRegistration[];
}

interface RegistrationResponse {
  success: boolean;
  registration: EventRegistration | null;
}

interface AdminRegistrationsResponse {
  success: boolean;
  registrations: AdminRegistrationRow[];
}

export async function fetchMyRegistrations(): Promise<EventRegistration[]> {
  const res = await api.get<MyRegistrationsResponse>("/registrations/me");
  return res.registrations;
}

export async function fetchMyRegistrationForEvent(eventId: number): Promise<EventRegistration | null> {
  const res = await api.get<RegistrationResponse>(`/registrations/event/${eventId}`);
  return res.registration;
}

export async function registerForEvent(eventId: number): Promise<EventRegistration> {
  const res = await api.post<{ success: boolean; registration: EventRegistration }>("/registrations", {
    eventId,
  });
  return res.registration;
}

export async function cancelRegistration(registrationId: string): Promise<void> {
  await api.delete(`/registrations/${registrationId}`);
}

export async function fetchAllRegistrationsAdmin(): Promise<AdminRegistrationRow[]> {
  const res = await api.get<AdminRegistrationsResponse>("/registrations/admin/all");
  return res.registrations;
}

export async function updateRegistrationStatus(
  registrationId: string,
  status: "ACCEPTED" | "REJECTED" | "PENDING"
): Promise<AdminRegistrationRow> {
  const res = await api.patch<{ success: boolean; registration: AdminRegistrationRow }>(
    `/registrations/${registrationId}/status`,
    { status }
  );
  return res.registration;
}

export async function fetchAdminStats(): Promise<{
  events: number;
  users: number;
  registrations: number;
  pending: number;
}> {
  const res = await api.get<{
    success: boolean;
    stats: { events: number; users: number; registrations: number; pending: number };
  }>("/registrations/admin/stats");
  return res.stats;
}
