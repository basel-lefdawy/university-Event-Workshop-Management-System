import { motion } from "motion/react";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_REGISTRATIONS } from "@/constants/mockRegistrations";
import { ROUTES, eventDetailPath } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const statusStyles = {
  confirmed: "bg-emerald-100 text-emerald-800",
  waitlist: "bg-amber-100 text-amber-800",
  cancelled: "bg-slate-200 text-slate-700",
};

export default function MyRegistrationsPage() {
  useDocumentTitle("My Registrations | UniEvents");

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My registrations</h1>
          <p className="text-slate-600">
            Live data will sync from the registration service. These entries demonstrate the layout.
          </p>
        </motion.div>

        <ul className="space-y-4">
          {MOCK_REGISTRATIONS.map((reg, index) => (
            <motion.li
              key={reg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h2 className="font-semibold text-slate-900 text-lg mb-2">{reg.eventTitle}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={16} className="text-blue-500" />
                    {reg.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} className="text-blue-500" />
                    {reg.location}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[reg.status]}`}
                >
                  {reg.status}
                </span>
                <Link
                  to={ROUTES.EVENTS}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  View in catalog
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate-500">
          Looking for more?{" "}
          <Link to={eventDetailPath(1)} className="text-blue-600 font-semibold hover:underline">
            Open a sample event detail
          </Link>{" "}
          or{" "}
          <Link to={ROUTES.EVENTS} className="text-blue-600 font-semibold hover:underline">
            browse all events
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
