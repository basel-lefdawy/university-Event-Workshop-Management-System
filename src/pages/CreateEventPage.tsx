import { FormPageHero } from "@/components/common/FormPageHero";
import { CreateEventForm } from "@/components/forms/CreateEventForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function CreateEventPage() {
  useDocumentTitle("Create Event | UniEvents");

  return (
    <>
      <FormPageHero
        title="Propose a campus event"
        description="Share the basics and we will route your draft to approvers when workflow is connected."
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
          <CreateEventForm />
        </div>
      </section>
    </>
  );
}
