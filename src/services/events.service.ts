import { api } from "@/services/apiInstance";
import type { CampusEvent, EventFormValues } from "@/types/event";
import { MOCK_EVENTS } from "@/constants/mockEvents";

interface EventsListResponse {
  success: boolean;
  events: CampusEvent[];
}

interface EventResponse {
  success: boolean;
  event: CampusEvent;
}

export async function fetchCampusEvents(): Promise<CampusEvent[]> {
  try {
    const res = await api.get<EventsListResponse>("/events");
    return res.events;
  } catch {
    return MOCK_EVENTS;
  }
}

export async function fetchCampusEventById(id: number): Promise<CampusEvent | undefined> {
  try {
    const res = await api.get<EventResponse>(`/events/${id}`);
    return res.event;
  } catch {
    return MOCK_EVENTS.find((e) => e.id === id);
  }
}

export async function createEvent(data: EventFormValues): Promise<CampusEvent> {
  const res = await api.post<EventResponse>("/events", data);
  return res.event;
}

export async function updateEvent(id: number, data: Partial<EventFormValues>): Promise<CampusEvent> {
  const res = await api.put<EventResponse>(`/events/${id}`, data);
  return res.event;
}

export async function deleteEvent(id: number): Promise<void> {
  await api.delete(`/events/${id}`);
}

export function getCampusEventById(id: number): CampusEvent | undefined {
  return MOCK_EVENTS.find((e) => e.id === id);
}
