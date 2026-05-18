export type SuggestionStatus = "pending" | "accepted" | "rejected";

export interface EventSuggestion {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  maxAttendees: number;
  image?: string;
  status: SuggestionStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
