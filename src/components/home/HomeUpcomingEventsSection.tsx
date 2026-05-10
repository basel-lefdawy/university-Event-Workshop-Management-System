import { motion } from "motion/react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionIntro } from "@/components/home/SectionIntro";
import { MOCK_EVENTS, UPCOMING_PREVIEW_LIMIT } from "@/constants/mockEvents";
import { ROUTES, eventDetailPath } from "@/constants/routes";

export function HomeUpcomingEventsSection() {
  const upcoming = MOCK_EVENTS.slice(0, UPCOMING_PREVIEW_LIMIT);

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          title="Upcoming Events"
          description="Don't miss out on these exciting upcoming events and activities"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcoming.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                  {event.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={16} className="text-blue-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-blue-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} className="text-blue-500" />
                    {event.attendees} Attendees
                  </div>
                </div>

                <Link
                  to={eventDetailPath(event.id)}
                  className="block text-center w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={ROUTES.EVENTS}
            className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-semibold"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
