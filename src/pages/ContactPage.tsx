import { FormPageHero } from "@/components/common/FormPageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function ContactPage() {
  useDocumentTitle("Contact | UniEvents");

  return (
    <>
      <FormPageHero
        title="Contact the UniEvents team"
        description="Questions about publishing a workshop, access, or campus integrations—we reply during business hours."
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
