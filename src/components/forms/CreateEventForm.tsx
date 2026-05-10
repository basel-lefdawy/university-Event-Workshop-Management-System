import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { submitCreateEventDraft, type CreateEventDraftValues } from "@/services/forms.service";
import { EVENT_FILTER_CATEGORIES } from "@/constants/eventFilters";
import { ROUTES } from "@/constants/routes";

const defaultValues: CreateEventDraftValues = {
  title: "",
  category: "Workshops",
  date: "",
  time: "",
  location: "",
  description: "",
  maxAttendees: "",
};

export function CreateEventForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateEventDraftValues>({ defaultValues });

  const categoryOptions = EVENT_FILTER_CATEGORIES.filter((c) => c.name !== "All");

  const onSubmit = async (data: CreateEventDraftValues) => {
    await submitCreateEventDraft(data);
    reset(defaultValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="evt-title" className="block text-sm font-semibold text-slate-700 mb-2">
          Event title
        </label>
        <input
          id="evt-title"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="e.g. Intro to Robotics Lab"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="evt-category" className="block text-sm font-semibold text-slate-700 mb-2">
          Category
        </label>
        <select
          id="evt-category"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
          {...register("category", { required: true })}
        >
          {categoryOptions.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="evt-date" className="block text-sm font-semibold text-slate-700 mb-2">
            Date
          </label>
          <input
            id="evt-date"
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="evt-time" className="block text-sm font-semibold text-slate-700 mb-2">
            Time
          </label>
          <input
            id="evt-time"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="10:00 AM – 12:00 PM"
            {...register("time", { required: "Time is required" })}
          />
          {errors.time && <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="evt-location" className="block text-sm font-semibold text-slate-700 mb-2">
          Location
        </label>
        <input
          id="evt-location"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="Building and room"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>}
      </div>

      <div>
        <label htmlFor="evt-capacity" className="block text-sm font-semibold text-slate-700 mb-2">
          Max attendees
        </label>
        <input
          id="evt-capacity"
          inputMode="numeric"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          placeholder="40"
          {...register("maxAttendees", { required: "Capacity is required" })}
        />
        {errors.maxAttendees && (
          <p className="text-sm text-red-600 mt-1">{errors.maxAttendees.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="evt-description" className="block text-sm font-semibold text-slate-700 mb-2">
          Description
        </label>
        <textarea
          id="evt-description"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          placeholder="Agenda, requirements, and who should attend."
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Submit draft for review"}
      </button>

      <p className="text-sm text-slate-500 text-center">
        Drafts are stored locally for this demo.{" "}
        <Link to={ROUTES.EVENTS} className="text-blue-600 font-semibold hover:underline">
          Browse published events
        </Link>
      </p>
    </form>
  );
}
