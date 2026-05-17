import { motion } from "motion/react";
import { BarChart3, Calendar, ClipboardCheck, Loader2, Trash2, Users } from "lucide-react";
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
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as registrationsService from "@/services/registrations.service";
import * as usersService from "@/services/users.service";
import type { AdminRegistrationRow, AdminUserRow } from "@/types/registration";

type Tab = "users" | "registrations";

export default function AdminDashboardPage() {
  useDocumentTitle("Admin Dashboard | UniEvents");
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [registrations, setRegistrations] = useState<AdminRegistrationRow[]>([]);
  const [stats, setStats] = useState({ events: 0, users: 0, registrations: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [usersData, regsData, statsData] = await Promise.all([
        usersService.fetchAllUsers(),
        registrationsService.fetchAllRegistrationsAdmin(),
        registrationsService.fetchAdminStats(),
      ]);
      setUsers(usersData);
      setRegistrations(regsData);
      setStats(statsData);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await usersService.deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      toast.success("User deleted");
      setUserToDelete(null);
      await loadAll();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const updateStatus = async (id: string, status: "ACCEPTED" | "REJECTED") => {
    setUpdatingId(id);
    try {
      const updated = await registrationsService.updateRegistrationStatus(id, status);
      setRegistrations((prev) => prev.map((r) => (r.id === id ? updated : r)));
      toast.success(`Registration ${status.toLowerCase()}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statCards = [
    { label: "Published events", value: String(stats.events), icon: Calendar },
    { label: "Pending approvals", value: String(stats.pending), icon: ClipboardCheck },
    { label: "Total registrations", value: String(stats.registrations), icon: Users },
    { label: "Student accounts", value: String(stats.users), icon: BarChart3 },
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Admin dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Campus programs overview</h1>
          <p className="text-slate-600 max-w-2xl mb-10">
            Manage student accounts and review event registration requests.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Icon className="text-blue-600 mb-3" size={28} />
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-600 mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6">
          {(["users", "registrations"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl font-semibold capitalize transition-colors ${
                tab === t
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-slate-500">
            <Loader2 className="animate-spin mr-2" size={22} />
            Loading…
          </div>
        ) : tab === "users" ? (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Role</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Registrations</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-900 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-slate-600">{u.email}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{u.role}</td>
                    <td className="px-4 py-3 text-slate-600">{u.registrationCount}</td>
                    <td className="px-4 py-3 text-right">
                      {u.role !== "admin" && (
                        <button
                          type="button"
                          onClick={() => setUserToDelete(u)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.length === 0 ? (
              <p className="text-slate-600 text-center py-12">No registrations yet.</p>
            ) : (
              registrations.map((reg) => (
                <motion.div
                  key={reg.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{reg.event.title}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      {reg.user?.name} · {reg.user?.email}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">Status: {reg.status}</p>
                  </div>
                  {reg.status === "pending" && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={updatingId === reg.id}
                        onClick={() => updateStatus(reg.id, "ACCEPTED")}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 disabled:opacity-60"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        disabled={updatingId === reg.id}
                        onClick={() => updateStatus(reg.id, "REJECTED")}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-wrap gap-4 items-center justify-between mt-12">
          <p className="text-slate-700">Need to review campus listings?</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.EVENTS}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              View events
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-100 transition-colors"
            >
              Contact channel
            </Link>
          </div>
        </div>
      </div>

      <AlertDialog open={Boolean(userToDelete)} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>{userToDelete?.name}</strong> and all of their event
              registrations. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                void confirmDeleteUser();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting…" : "Delete user"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
