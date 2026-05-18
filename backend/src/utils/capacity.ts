import { RegistrationStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export async function getAcceptedCount(eventId: number) {
  return prisma.registration.count({
    where: { eventId, status: RegistrationStatus.ACCEPTED },
  });
}

/** Accepted + pending registrations count toward capacity limits */
export async function getReservedCount(eventId: number) {
  return prisma.registration.count({
    where: {
      eventId,
      status: { in: [RegistrationStatus.ACCEPTED, RegistrationStatus.PENDING] },
    },
  });
}

export function isEventFull(acceptedCount: number, maxAttendees: number) {
  return acceptedCount >= maxAttendees;
}

export function isRegistrationClosed(reservedCount: number, maxAttendees: number) {
  return reservedCount >= maxAttendees;
}
