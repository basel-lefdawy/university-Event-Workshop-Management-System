import { useForm } from "react-hook-form";
import { submitContactInquiry, type ContactFormValues } from "@/services/forms.service";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ContactFormValues>({ defaultValues });

  const onSubmit = async (data: ContactFormValues) => {
    await submitContactInquiry(data);
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-2">
          Full name
        </label>
        <input
          id="contact-name"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-2">
          University email
        </label>
        <input
          id="contact-email"
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="you@university.edu"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-2">
          Subject
        </label>
        <input
          id="contact-subject"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="e.g. Room booking for a club fair"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          placeholder="Tell us how we can help with your event or workshop."
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
