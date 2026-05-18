import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EventForm } from "@/components/forms/EventForm";
import { FormPageHero } from "@/components/common/FormPageHero";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as suggestionsService from "@/services/suggestions.service";
import type { EventFormValues } from "@/types/event";

export default function SuggestEventPage() {
  useDocumentTitle("Suggest Event | UniEvents");
  const navigate = useNavigate();

  const handleSubmit = async (data: EventFormValues) => {
    await suggestionsService.submitSuggestion(data);
    toast.success("Event suggestion submitted! An admin will review it soon.");
    navigate(ROUTES.MY_SUGGESTIONS);
  };

  return (
    <>
      <FormPageHero
        title="Suggest a campus event"
        description="Share your idea with campus administrators. Approved suggestions become public events."
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8"
        >
          <EventForm submitLabel="Submit for approval" onSubmit={handleSubmit} />
        </motion.div>
      </section>
    </>
  );
}
