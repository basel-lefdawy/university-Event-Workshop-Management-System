import { motion } from "motion/react";
import { Calendar, Loader2, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES, eventDetailPath } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as registrationsService from "@/services/registrations.service";
import type { EventRegistration, RegistrationStatus } from "@/types/registration";

const statusStyles: Record<RegistrationStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

export default function MyRegistrationsPage() {
  useDocumentTitle("My Registrations | UniEvents");
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await registrationsService.fetchMyRegistrations();
      setRegistrations(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const handleCancel = async (registration: EventRegistration) => {
    setCancellingId(registration.id);
    try {
      await registrationsService.cancelRegistration(registration.id);
      setRegistrations((prev) => prev.filter((r) => r.id !== registration.id));
      toast.success("Registration cancelled");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not cancel registration");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My registrations</h1>
          <p className="text-slate-600">Track pending, accepted, and rejected event registrations.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16 text-slate-500">
            <Loader2 className="animate-spin mr-2" size={22} />
            Loading registrations…
          </div>
        ) : registrations.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600 mb-6">You have not registered for any events yet.</p>
            <Link
              to={ROUTES.EVENTS}
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            >
              Browse events
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {registrations.map((reg, index) => (
              <motion.li
                key={reg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h2 className="font-semibold text-slate-900 text-lg mb-2">{reg.event.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={16} className="text-blue-500" />
                      {reg.event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={16} className="text-blue-500" />
                      {reg.event.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[reg.status]}`}
                  >
                    {reg.status}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={eventDetailPath(reg.event.id)}
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      View event
                    </Link>
                    {reg.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={cancellingId === reg.id}
                        onClick={() => handleCancel(reg)}
                        className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
                      >
                        {cancellingId === reg.id ? "Cancelling…" : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
