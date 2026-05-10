import { motion } from "motion/react";
import { BarChart3, Calendar, ClipboardCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_EVENTS } from "@/constants/mockEvents";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const stats = [
  { label: "Published events", value: String(MOCK_EVENTS.length), icon: Calendar },
  { label: "Pending drafts", value: "3", icon: ClipboardCheck },
  { label: "Open registrations", value: "1.2k", icon: Users },
  { label: "Campus orgs", value: "48", icon: BarChart3 },
];

export default function AdminDashboardPage() {
  useDocumentTitle("Admin Dashboard | UniEvents");

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Admin dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Campus programs overview</h1>
          <p className="text-slate-600 max-w-2xl mb-10">
            Approvals, reporting, and audit trails will connect here. Mock figures below mirror the events catalog for
            layout only.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => {
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

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-slate-700">Need to review a draft or message an organizer?</p>
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
    </div>
  );
}
