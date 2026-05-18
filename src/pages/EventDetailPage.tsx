import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Loader2, MapPin, Share2, Star, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { fetchCampusEventById } from "@/services/events.service";
import * as registrationsService from "@/services/registrations.service";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { CampusEvent } from "@/types/event";
import type { EventRegistration } from "@/types/registration";

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const idNum = Number(eventId);

  const [event, setEvent] = useState<CampusEvent | undefined>();
  const [registration, setRegistration] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useDocumentTitle(event ? `${event.title} | UniEvents` : "Event | UniEvents");

  const loadData = useCallback(async () => {
    if (!Number.isFinite(idNum)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const eventData = await fetchCampusEventById(idNum);
      setEvent(eventData);
      if (user && token) {
        const reg = await registrationsService.fetchMyRegistrationForEvent(idNum);
        setRegistration(reg);
      } else {
        setRegistration(null);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load event");
    } finally {
      setLoading(false);
    }
  }, [idNum, user, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRegister = async () => {
    if (!user) {
      navigate(ROUTES.LOGIN, { state: { from: { pathname: `/events/${idNum}` } } });
      return;
    }
    if (user.role === "admin") {
      toast.error("Admins cannot register for events. Use a student account.");
      return;
    }
    setActionLoading(true);
    try {
      const reg = await registrationsService.registerForEvent(idNum);
      setRegistration(reg);
      toast.success("Registration submitted! Awaiting admin approval.");
      await loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!registration) return;
    setActionLoading(true);
    try {
      await registrationsService.cancelRegistration(registration.id);
      setRegistration(null);
      toast.success("Registration cancelled");
      await loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not cancel registration");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-4 flex justify-center text-slate-600">
        <Loader2 className="animate-spin mr-2" size={22} />
        Loading event…
      </div>
    );
  }

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
  const isFull = event.isFull ?? event.attendees >= max;
  const registrationClosed = event.isRegistrationClosed ?? isFull;

  const statusLabel = registration
    ? `Status: ${registration.status}`
    : isFull
      ? "Event is full"
      : user
        ? "Not registered"
        : "Sign in to register";

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

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
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
                <p className="mt-4 text-sm text-slate-600 capitalize">{statusLabel}</p>
                {registration ? (
                  <div className="mt-4 space-y-2">
                    <Link
                      to={ROUTES.MY_REGISTRATIONS}
                      className="block text-center py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-all"
                    >
                      View my registrations
                    </Link>
                    {registration.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={handleCancel}
                        className="w-full py-3 rounded-xl border border-red-200 text-red-700 font-semibold hover:bg-red-50 disabled:opacity-60"
                      >
                        {actionLoading ? "Processing…" : "Cancel registration"}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={actionLoading || user?.role === "admin" || registrationClosed}
                    onClick={handleRegister}
                    className={`mt-6 w-full text-center py-3 rounded-xl font-semibold transition-all disabled:opacity-60 ${
                      registrationClosed
                        ? "bg-slate-200 text-slate-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {actionLoading
                      ? "Processing…"
                      : registrationClosed
                        ? "Event is full"
                        : user
                          ? "Register for event"
                          : "Sign in to register"}
                  </button>
                )}
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
