import type { CampusEvent } from "@/types/event";
import { MOCK_EVENTS } from "@/constants/mockEvents";

/** Stub: swap for api.get<CampusEvent[]>('/events'). */
export async function fetchCampusEvents(): Promise<CampusEvent[]> {
  return Promise.resolve(MOCK_EVENTS);
}

export function getCampusEventById(id: number): CampusEvent | undefined {
  return MOCK_EVENTS.find((e) => e.id === id);
}
