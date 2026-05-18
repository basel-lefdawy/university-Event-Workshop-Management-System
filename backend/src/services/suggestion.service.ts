import { SuggestionStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { badRequest, forbidden, notFound } from "../utils/errors.js";
import { createEvent, type EventInput } from "./event.service.js";
import { mapSuggestion } from "../utils/mappers.js";

export interface SuggestionInput {
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  maxAttendees: number;
  image?: string;
}

export async function submitSuggestion(userId: number, input: SuggestionInput) {
  const suggestion = await prisma.eventSuggestion.create({
    data: {
      userId,
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      time: input.time?.trim() || null,
      location: input.location.trim(),
      category: input.category,
      maxAttendees: input.maxAttendees,
      image: input.image?.trim() || null,
      status: SuggestionStatus.PENDING,
    },
    include: { user: true },
  });
  return mapSuggestion(suggestion);
}

export async function listMySuggestions(userId: number) {
  const suggestions = await prisma.eventSuggestion.findMany({
    where: { userId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return suggestions.map(mapSuggestion);
}

export async function listAllSuggestions() {
  const suggestions = await prisma.eventSuggestion.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  return suggestions.map(mapSuggestion);
}

export async function updateSuggestionStatus(
  suggestionId: number,
  status: SuggestionStatus,
  adminUserId: number
) {
  const suggestion = await prisma.eventSuggestion.findUnique({
    where: { id: suggestionId },
    include: { user: true },
  });

  if (!suggestion) {
    throw notFound("Suggestion not found");
  }

  if (suggestion.status !== SuggestionStatus.PENDING && status !== suggestion.status) {
    throw badRequest("This suggestion has already been reviewed");
  }

  if (status === SuggestionStatus.ACCEPTED) {
    const eventInput: EventInput = {
      title: suggestion.title,
      description: suggestion.description,
      date: suggestion.date,
      time: suggestion.time ?? undefined,
      location: suggestion.location,
      category: suggestion.category,
      maxAttendees: suggestion.maxAttendees,
      image: suggestion.image ?? undefined,
      organizer: suggestion.user.name,
      price: "Free",
    };
    await createEvent(eventInput, adminUserId);
  }

  const updated = await prisma.eventSuggestion.update({
    where: { id: suggestionId },
    data: { status },
    include: { user: true },
  });

  return mapSuggestion(updated);
}

export async function getSuggestionById(suggestionId: number, userId: number, isAdmin: boolean) {
  const suggestion = await prisma.eventSuggestion.findUnique({
    where: { id: suggestionId },
    include: { user: true },
  });
  if (!suggestion) {
    throw notFound("Suggestion not found");
  }
  if (!isAdmin && suggestion.userId !== userId) {
    throw forbidden("Access denied");
  }
  return mapSuggestion(suggestion);
}
