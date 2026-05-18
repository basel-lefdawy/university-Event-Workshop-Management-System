import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EventForm } from "@/components/forms/EventForm";
import { FormPageHero } from "@/components/common/FormPageHero";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { createEvent } from "@/services/events.service";
import type { EventFormValues } from "@/types/event";

export default function AdminCreateEventPage() {
  useDocumentTitle("Create Event | UniEvents Admin");
  const navigate = useNavigate();

  const handleSubmit = async (data: EventFormValues) => {
    await createEvent(data);
    toast.success("Event published successfully!");
    navigate(ROUTES.ADMIN_EVENTS);
  };

  return (
    <>
      <FormPageHero
        title="Create campus event"
        description="Published events appear immediately in the public catalog."
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8"
        >
          <EventForm submitLabel="Publish event" showAdminFields onSubmit={handleSubmit} />
        </motion.div>
      </section>
    </>
  );
}
