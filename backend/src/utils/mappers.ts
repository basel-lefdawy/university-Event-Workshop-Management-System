import type { Event, Registration, RegistrationStatus, Role, User } from "@prisma/client";

export function mapRole(role: Role): "student" | "admin" {
  return role === "ADMIN" ? "admin" : "student";
}

export function mapRegistrationStatus(status: RegistrationStatus): "pending" | "accepted" | "rejected" {
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

export async function countAcceptedAttendees(eventId: number, prismaCount: (args: {
  where: { eventId: number; status: "ACCEPTED" };
}) => Promise<number>) {
  return prismaCount({
    where: { eventId, status: "ACCEPTED" },
  });
}

export function mapEvent(event: Event, attendees: number) {
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
    maxAttendees: event.maxAttendees,
    organizer: event.organizer ?? undefined,
    price: event.price ?? undefined,
    featured: event.featured,
  };
}

export function mapRegistration(
  registration: Registration & {
    event: Event;
    user?: User;
  },
  attendees: number
) {
  return {
    id: String(registration.id),
    status: mapRegistrationStatus(registration.status),
    createdAt: registration.createdAt.toISOString(),
    event: mapEvent(registration.event, attendees),
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
