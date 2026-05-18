import { RegistrationStatus, Role } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { badRequest, conflict, forbidden, notFound } from "../utils/errors.js";
import { getAcceptedCount, getReservedCount, isEventFull, isRegistrationClosed } from "../utils/capacity.js";
import { mapEvent, mapRegistration } from "../utils/mappers.js";

export async function registerForEvent(userId: number, eventId: number) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    throw notFound("Event not found");
  }

  const existing = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (existing) {
    throw conflict("You are already registered for this event");
  }

  const [acceptedCount, reservedCount] = await Promise.all([
    getAcceptedCount(eventId),
    getReservedCount(eventId),
  ]);

  if (isEventFull(acceptedCount, event.maxAttendees)) {
    throw badRequest("Event is full");
  }

  if (isRegistrationClosed(reservedCount, event.maxAttendees)) {
    throw badRequest("Event is full — no registration spots remaining");
  }

  const registration = await prisma.registration.create({
    data: { userId, eventId, status: RegistrationStatus.PENDING },
    include: { event: true },
  });

  const [attendees, reserved] = await Promise.all([
    getAcceptedCount(eventId),
    getReservedCount(eventId),
  ]);
  return mapRegistration(registration, attendees, reserved);
}

export async function listMyRegistrations(userId: number) {
  const registrations = await prisma.registration.findMany({
    where: { userId },
    include: { event: true },
    orderBy: { createdAt: "desc" },
  });

  return Promise.all(
    registrations.map(async (reg) => {
      const [attendees, reserved] = await Promise.all([
        getAcceptedCount(reg.eventId),
        getReservedCount(reg.eventId),
      ]);
      return mapRegistration(reg, attendees, reserved);
    })
  );
}

export async function getMyRegistrationForEvent(userId: number, eventId: number) {
  const registration = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
    include: { event: true },
  });
  if (!registration) return null;
  const [attendees, reserved] = await Promise.all([
    getAcceptedCount(eventId),
    getReservedCount(eventId),
  ]);
  return mapRegistration(registration, attendees, reserved);
}

export async function cancelRegistration(userId: number, registrationId: number) {
  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
  });

  if (!registration) {
    throw notFound("Registration not found");
  }

  if (registration.userId !== userId) {
    throw forbidden("You can only cancel your own registrations");
  }

  await prisma.registration.delete({ where: { id: registrationId } });
}

export async function listAllRegistrations() {
  const registrations = await prisma.registration.findMany({
    include: { event: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return Promise.all(
    registrations.map(async (reg) => {
      const [attendees, reserved] = await Promise.all([
        getAcceptedCount(reg.eventId),
        getReservedCount(reg.eventId),
      ]);
      return mapRegistration(reg, attendees, reserved);
    })
  );
}

export async function updateRegistrationStatus(
  registrationId: number,
  status: RegistrationStatus
) {
  const registration = await prisma.registration.findUnique({
    where: { id: registrationId },
    include: { event: true, user: true },
  });

  if (!registration) {
    throw notFound("Registration not found");
  }

  if (status === RegistrationStatus.ACCEPTED) {
    const acceptedCount = await getAcceptedCount(registration.eventId);
    if (isEventFull(acceptedCount, registration.event.maxAttendees)) {
      throw badRequest("Event is at full capacity");
    }
  }

  const updated = await prisma.registration.update({
    where: { id: registrationId },
    data: { status },
    include: { event: true, user: true },
  });

  const [attendees, reserved] = await Promise.all([
    getAcceptedCount(updated.eventId),
    getReservedCount(updated.eventId),
  ]);
  return mapRegistration(updated, attendees, reserved);
}

export async function getAdminStats() {
  const [events, users, registrations, pendingRegs, pendingSuggestions] = await Promise.all([
    prisma.event.count(),
    prisma.user.count({ where: { role: Role.STUDENT } }),
    prisma.registration.count(),
    prisma.registration.count({ where: { status: RegistrationStatus.PENDING } }),
    prisma.eventSuggestion.count({ where: { status: "PENDING" } }),
  ]);

  return { events, users, registrations, pending: pendingRegs, pendingSuggestions };
}
