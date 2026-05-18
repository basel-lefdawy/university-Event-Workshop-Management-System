import { useForm } from "react-hook-form";
import { EVENT_FILTER_CATEGORIES } from "@/constants/eventFilters";
import type { EventFormValues } from "@/types/event";

const categoryOptions = EVENT_FILTER_CATEGORIES.filter((c) => c.name !== "All");

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => Promise<void>;
  submitLabel: string;
  showAdminFields?: boolean;
}

const emptyDefaults: EventFormValues = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  category: "Workshops",
  maxAttendees: 50,
  image: "",
  organizer: "",
  price: "Free",
  featured: false,
};

export function EventForm({
  defaultValues,
  onSubmit,
  submitLabel,
  showAdminFields = false,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EventFormValues>({
    defaultValues: { ...emptyDefaults, ...defaultValues },
  });

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
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 bg-white"
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
            type="text"
            placeholder="May 15, 2026"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
            placeholder="10:00 AM – 12:00 PM"
            {...register("time")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="evt-location" className="block text-sm font-semibold text-slate-700 mb-2">
          Location
        </label>
        <input
          id="evt-location"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
          placeholder="Building and room"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>}
      </div>

      <div>
        <label htmlFor="evt-capacity" className="block text-sm font-semibold text-slate-700 mb-2">
          Capacity
        </label>
        <input
          id="evt-capacity"
          type="number"
          min={1}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
          {...register("maxAttendees", {
            required: "Capacity is required",
            valueAsNumber: true,
            min: { value: 1, message: "Minimum 1 attendee" },
          })}
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
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 resize-none"
          placeholder="Agenda, requirements, and who should attend."
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="evt-image" className="block text-sm font-semibold text-slate-700 mb-2">
          Image URL <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="evt-image"
          type="url"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
          placeholder="https://..."
          {...register("image")}
        />
      </div>

      {showAdminFields && (
        <>
          <div>
            <label htmlFor="evt-organizer" className="block text-sm font-semibold text-slate-700 mb-2">
              Organizer
            </label>
            <input
              id="evt-organizer"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
              {...register("organizer")}
            />
          </div>
          <div>
            <label htmlFor="evt-price" className="block text-sm font-semibold text-slate-700 mb-2">
              Price
            </label>
            <input
              id="evt-price"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
              {...register("price")}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600" {...register("featured")} />
            <span className="text-sm font-medium text-slate-700">Featured event</span>
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
