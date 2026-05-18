import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function UserDashboardPage() {
  const { user, logout } = useAuth();
  useDocumentTitle("User Dashboard | UniEvents");

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Student dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Hi{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-slate-600 leading-relaxed mb-8">
            Browse events, manage your registrations, or suggest a new campus activity.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8 text-slate-700">
            <li>
              <Link
                to={ROUTES.MY_REGISTRATIONS}
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50/50 transition-colors font-medium"
              >
                My registrations
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.SUGGEST_EVENT}
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50/50 transition-colors font-medium"
              >
                Suggest an event
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.MY_SUGGESTIONS}
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50/50 transition-colors font-medium"
              >
                My suggested events
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.EVENTS}
                className="block rounded-xl border border-slate-200 px-4 py-3 hover:border-blue-300 hover:bg-blue-50/50 transition-colors font-medium"
              >
                Browse events
              </Link>
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link
              to={ROUTES.EVENTS}
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              Explore events
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
            >
              Sign out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
