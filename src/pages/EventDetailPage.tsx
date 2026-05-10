import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Star, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCampusEventById } from "@/services/events.service";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const idNum = Number(eventId);
  const event = Number.isFinite(idNum) ? getCampusEventById(idNum) : undefined;

  useDocumentTitle(event ? `${event.title} | UniEvents` : "Event | UniEvents");

  if (!event) {
    return (
      <div className="pt-32 pb-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Event not found</h1>
        <p className="text-slate-600 mb-8">That listing may have been unpublished or the link is incorrect.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-4 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50"
        >
          Go back
        </button>
        <Link to={ROUTES.EVENTS} className="inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold">
          Browse events
        </Link>
      </div>
    );
  }

  const max = event.maxAttendees ?? 1;
  const pct = Math.min(100, (event.attendees / max) * 100);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to={ROUTES.EVENTS}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Back to events
        </Link>

        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-8">
            <div className="relative h-64 md:h-80">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              {event.featured && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={14} fill="white" />
                  Featured
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-1">{event.category}</p>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white/90 text-slate-900 font-semibold inline-flex items-center gap-2 hover:bg-white"
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">About this session</h2>
                <p className="text-slate-600 leading-relaxed">{event.description}</p>
              </section>
              {event.organizer && (
                <section className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Organizer</p>
                  <p className="font-semibold text-slate-900">{event.organizer}</p>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
                <dl className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <Calendar className="text-blue-500 shrink-0" size={20} />
                    <div>
                      <dt className="font-semibold text-slate-900">Date</dt>
                      <dd className="text-slate-600">{event.date}</dd>
                    </div>
                  </div>
                  {event.time && (
                    <div className="flex gap-3">
                      <Clock className="text-blue-500 shrink-0" size={20} />
                      <div>
                        <dt className="font-semibold text-slate-900">Time</dt>
                        <dd className="text-slate-600">{event.time}</dd>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <MapPin className="text-blue-500 shrink-0" size={20} />
                    <div>
                      <dt className="font-semibold text-slate-900">Venue</dt>
                      <dd className="text-slate-600">{event.location}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="text-blue-500 shrink-0" size={20} />
                    <div>
                      <dt className="font-semibold text-slate-900">Registration</dt>
                      <dd className="text-slate-600">
                        {event.attendees} / {max} seats · {event.price ?? "See organizer"}
                      </dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Capacity</span>
                    <span className="font-semibold">{pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <Link
                  to={ROUTES.MY_REGISTRATIONS}
                  className="mt-6 block text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Register (demo)
                </Link>
              </div>
            </aside>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
