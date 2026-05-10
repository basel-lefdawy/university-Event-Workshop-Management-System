export type EventCategory =
  | "Workshops"
  | "Seminars"
  | "Sports"
  | "Competitions"
  | "Entertainment";

export interface CampusEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: EventCategory;
  image: string;
  attendees: number;
  maxAttendees?: number;
  organizer?: string;
  price?: string;
  featured?: boolean;
}

export interface HomePreviewEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
}
