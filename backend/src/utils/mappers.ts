import type { Event, EventSuggestion, Registration, RegistrationStatus, Role, User } from "@prisma/client";

export function mapRole(role: Role): "student" | "admin" {
  return role === "ADMIN" ? "admin" : "student";
}

export function mapRegistrationStatus(status: RegistrationStatus): "pending" | "accepted" | "rejected" {
  return status.toLowerCase() as "pending" | "accepted" | "rejected";
}

export function mapSuggestionStatus(status: string): "pending" | "accepted" | "rejected" {
  return status.toLowerCase() as "pending" | "accepted" | "rejected";
}

export function mapUser(user: User) {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    role: mapRole(user.role),
  };
}

export function mapEvent(
  event: Event,
  attendees: number,
  options?: { reservedCount?: number }
) {
  const reserved = options?.reservedCount ?? attendees;
  const max = event.maxAttendees;
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time ?? undefined,
    location: event.location,
    category: event.category,
    image: event.image,
    attendees,
    maxAttendees: max,
    organizer: event.organizer ?? undefined,
    price: event.price ?? undefined,
    featured: event.featured,
    createdById: event.createdById ?? undefined,
    isFull: attendees >= max,
    isRegistrationClosed: reserved >= max,
    spotsLeft: Math.max(0, max - attendees),
  };
}

export function mapRegistration(
  registration: Registration & {
    event: Event;
    user?: User;
  },
  attendees: number,
  reservedCount?: number
) {
  return {
    id: String(registration.id),
    status: mapRegistrationStatus(registration.status),
    createdAt: registration.createdAt.toISOString(),
    event: mapEvent(registration.event, attendees, { reservedCount }),
    user: registration.user
      ? {
          id: String(registration.user.id),
          name: registration.user.name,
          email: registration.user.email,
          role: mapRole(registration.user.role),
        }
      : undefined,
  };
}

export function mapSuggestion(
  suggestion: EventSuggestion & { user?: User }
) {
  return {
    id: String(suggestion.id),
    title: suggestion.title,
    description: suggestion.description,
    date: suggestion.date,
    time: suggestion.time ?? undefined,
    location: suggestion.location,
    category: suggestion.category,
    maxAttendees: suggestion.maxAttendees,
    image: suggestion.image ?? undefined,
    status: mapSuggestionStatus(suggestion.status),
    createdAt: suggestion.createdAt.toISOString(),
    updatedAt: suggestion.updatedAt.toISOString(),
    user: suggestion.user
      ? {
          id: String(suggestion.user.id),
          name: suggestion.user.name,
          email: suggestion.user.email,
        }
      : undefined,
  };
}
