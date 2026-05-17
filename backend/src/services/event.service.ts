import { RegistrationStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { notFound } from "../utils/errors.js";
import { mapEvent } from "../utils/mappers.js";

async function getAttendeeCount(eventId: number) {
  return prisma.registration.count({
    where: { eventId, status: RegistrationStatus.ACCEPTED },
  });
}

export async function listEvents() {
  const events = await prisma.event.findMany({ orderBy: { id: "asc" } });
  const counts = await Promise.all(events.map((e) => getAttendeeCount(e.id)));
  return events.map((event, i) => mapEvent(event, counts[i] ?? 0));
}

export async function getEventById(id: number) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    throw notFound("Event not found");
  }
  const attendees = await getAttendeeCount(id);
  return mapEvent(event, attendees);
}
