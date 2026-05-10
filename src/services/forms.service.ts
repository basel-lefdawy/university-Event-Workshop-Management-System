export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateEventDraftValues {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees: string;
}

/** Stub submissions — replace with api.post when API routes exist. */
export async function submitContactInquiry(payload: ContactFormValues) {
  console.info("[contact]", payload);
  await new Promise((r) => setTimeout(r, 400));
  return { id: crypto.randomUUID() };
}

export async function submitCreateEventDraft(payload: CreateEventDraftValues) {
  console.info("[event-draft]", payload);
  await new Promise((r) => setTimeout(r, 400));
  return { id: crypto.randomUUID() };
}
