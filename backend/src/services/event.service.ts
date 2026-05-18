import type { Event } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { notFound } from "../utils/errors.js";
import { getAcceptedCount, getReservedCount } from "../utils/capacity.js";
import { mapEvent } from "../utils/mappers.js";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540575467061-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";

export interface EventInput {
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  maxAttendees: number;
  image?: string;
  organizer?: string;
  price?: string;
  featured?: boolean;
}

async function mapEventWithCounts(event: Event) {
  const [accepted, reserved] = await Promise.all([
    getAcceptedCount(event.id),
    getReservedCount(event.id),
  ]);
  return mapEvent(event, accepted, { reservedCount: reserved });
}

export async function listEvents() {
  const events = await prisma.event.findMany({ orderBy: { id: "desc" } });
  return Promise.all(events.map((e) => mapEventWithCounts(e)));
}

export async function getEventById(id: number) {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    throw notFound("Event not found");
  }
  return mapEventWithCounts(event);
}

export async function createEvent(input: EventInput, createdById: number) {
  const event = await prisma.event.create({
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      time: input.time?.trim() || null,
      location: input.location.trim(),
      category: input.category,
      maxAttendees: input.maxAttendees,
      image: input.image?.trim() || DEFAULT_IMAGE,
      organizer: input.organizer?.trim() || null,
      price: input.price?.trim() || "Free",
      featured: input.featured ?? false,
      createdById,
    },
  });
  return mapEventWithCounts(event);
}

export async function updateEvent(id: number, input: Partial<EventInput>) {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    throw notFound("Event not found");
  }

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title.trim() }),
      ...(input.description !== undefined && { description: input.description.trim() }),
      ...(input.date !== undefined && { date: input.date }),
      ...(input.time !== undefined && { time: input.time?.trim() || null }),
      ...(input.location !== undefined && { location: input.location.trim() }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.maxAttendees !== undefined && { maxAttendees: input.maxAttendees }),
      ...(input.image !== undefined && { image: input.image.trim() || DEFAULT_IMAGE }),
      ...(input.organizer !== undefined && { organizer: input.organizer?.trim() || null }),
      ...(input.price !== undefined && { price: input.price?.trim() || null }),
      ...(input.featured !== undefined && { featured: input.featured }),
    },
  });
  return mapEventWithCounts(event);
}

export async function deleteEvent(id: number) {
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) {
    throw notFound("Event not found");
  }
  await prisma.event.delete({ where: { id } });
}
