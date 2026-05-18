import { api } from "@/services/apiInstance";
import type { EventFormValues } from "@/types/event";
import type { EventSuggestion } from "@/types/suggestion";

interface SuggestionsResponse {
  success: boolean;
  suggestions: EventSuggestion[];
}

interface SuggestionResponse {
  success: boolean;
  suggestion: EventSuggestion;
}

export async function submitSuggestion(data: EventFormValues): Promise<EventSuggestion> {
  const res = await api.post<SuggestionResponse>("/suggestions", data);
  return res.suggestion;
}

export async function fetchMySuggestions(): Promise<EventSuggestion[]> {
  const res = await api.get<SuggestionsResponse>("/suggestions/me");
  return res.suggestions;
}

export async function fetchAllSuggestionsAdmin(): Promise<EventSuggestion[]> {
  const res = await api.get<SuggestionsResponse>("/suggestions/admin/all");
  return res.suggestions;
}

export async function updateSuggestionStatus(
  id: string,
  status: "ACCEPTED" | "REJECTED"
): Promise<EventSuggestion> {
  const res = await api.patch<SuggestionResponse>(`/suggestions/${id}/status`, { status });
  return res.suggestion;
}
