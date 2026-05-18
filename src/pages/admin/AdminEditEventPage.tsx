import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { EventForm } from "@/components/forms/EventForm";
import { FormPageHero } from "@/components/common/FormPageHero";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchCampusEventById, updateEvent } from "@/services/events.service";
import type { CampusEvent, EventFormValues } from "@/types/event";

export default function AdminEditEventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const id = Number(eventId);
  const navigate = useNavigate();
  const [event, setEvent] = useState<CampusEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(event ? `Edit ${event.title} | Admin` : "Edit Event | Admin");

  const load = useCallback(async () => {
    if (!Number.isFinite(id)) return;
    setLoading(true);
    try {
      const data = await fetchCampusEventById(id);
      setEvent(data ?? null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (data: EventFormValues) => {
    await updateEvent(id, data);
    toast.success("Event updated!");
    navigate(ROUTES.ADMIN_EVENTS);
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center text-slate-500">
        <Loader2 className="animate-spin mr-2" size={22} />
        Loading…
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-32 text-center px-4">
        <p className="text-slate-600">Event not found.</p>
      </div>
    );
  }

  return (
    <>
      <FormPageHero title="Edit event" description={`Update details for ${event.title}`} />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8"
        >
          <EventForm
            showAdminFields
            submitLabel="Save changes"
            defaultValues={{
              title: event.title,
              description: event.description,
              date: event.date,
              time: event.time ?? "",
              location: event.location,
              category: event.category,
              maxAttendees: event.maxAttendees ?? 100,
              image: event.image,
              organizer: event.organizer ?? "",
              price: event.price ?? "Free",
              featured: event.featured ?? false,
            }}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </section>
    </>
  );
}
