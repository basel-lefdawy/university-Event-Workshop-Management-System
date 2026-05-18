import { motion } from "motion/react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ROUTES, editEventPath } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { deleteEvent, fetchCampusEvents } from "@/services/events.service";
import type { CampusEvent } from "@/types/event";

export default function AdminEventsPage() {
  useDocumentTitle("Manage Events | UniEvents Admin");
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<CampusEvent | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setEvents(await fetchCampusEvents());
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteEvent(toDelete.id);
      setEvents((prev) => prev.filter((e) => e.id !== toDelete.id));
      toast.success("Event deleted");
      setToDelete(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-1">Admin</p>
            <h1 className="text-3xl font-bold text-slate-900">Manage events</h1>
            <p className="text-slate-600 mt-1">Create, edit, and remove published campus events.</p>
          </div>
          <Link
            to={ROUTES.CREATE_EVENT}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
          >
            <Plus size={18} />
            Create event
          </Link>
        </div>

        {loading ? (
          <motion.div className="flex justify-center py-20 text-slate-500" initial={false}>
            <Loader2 className="animate-spin mr-2" size={24} />
            Loading events…
          </motion.div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600 mb-4">No events published yet.</p>
            <Link to={ROUTES.CREATE_EVENT} className="text-blue-600 font-semibold hover:underline">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Event</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Capacity</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.category}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{event.date}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {event.attendees}/{event.maxAttendees}
                      {event.isFull && (
                        <span className="ml-2 text-xs font-semibold text-red-600">Full</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={editEventPath(event.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <Pencil size={14} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setToDelete(event)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-medium"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>{toDelete?.title}</strong> and all related
              registrations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                void confirmDelete();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
