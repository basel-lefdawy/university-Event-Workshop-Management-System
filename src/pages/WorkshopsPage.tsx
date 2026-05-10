import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { DecorativeGrid } from "@/components/common/DecorativeGrid";
import { MOCK_EVENTS } from "@/constants/mockEvents";
import { eventDetailPath, ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function WorkshopsPage() {
  useDocumentTitle("Workshops | UniEvents");

  const workshops = MOCK_EVENTS.filter((e) => e.category === "Workshops");

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700">
        <DecorativeGrid />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Workshops</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Hands-on sessions, skill-building labs, and faculty-led intensives across campus.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-slate-600 mb-8">
            Showing {workshops.length} workshop{workshops.length === 1 ? "" : "s"} from the UniEvents catalog. For the
            full calendar, visit{" "}
            <Link to={ROUTES.EVENTS} className="text-blue-600 font-semibold hover:underline">
              Events
            </Link>
            .
          </p>

          <ul className="space-y-6">
            {workshops.map((event, index) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-slate-200 overflow-hidden md:flex bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="md:w-72 h-48 md:h-auto shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={16} className="text-blue-500" />
                      {event.date}
                    </span>
                    {event.time && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={16} className="text-blue-500" />
                        {event.time}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" />
                      {event.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={16} className="text-blue-500" />
                      {event.attendees}/{event.maxAttendees ?? "—"}
                    </span>
                  </div>
                  <Link
                    to={eventDetailPath(event.id)}
                    className="inline-flex items-center gap-2 mt-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold w-fit hover:shadow-lg transition-all"
                  >
                    Event details
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
