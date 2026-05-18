import { motion } from "motion/react";
import { Calendar, Loader2, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import * as suggestionsService from "@/services/suggestions.service";
import type { EventSuggestion, SuggestionStatus } from "@/types/suggestion";

const statusStyles: Record<SuggestionStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

export default function MySuggestionsPage() {
  useDocumentTitle("My Suggested Events | UniEvents");
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setSuggestions(await suggestionsService.fetchMySuggestions());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My suggested events</h1>
            <p className="text-slate-600">Track approval status for events you proposed.</p>
          </div>
          <Link
            to={ROUTES.SUGGEST_EVENT}
            className="inline-flex px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm"
          >
            Suggest another
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16 text-slate-500">
            <Loader2 className="animate-spin mr-2" size={22} />
            Loading…
          </div>
        ) : suggestions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600 mb-6">You have not submitted any event suggestions yet.</p>
            <Link
              to={ROUTES.SUGGEST_EVENT}
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            >
              Suggest an event
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {suggestions.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                  <h2 className="font-semibold text-lg text-slate-900">{s.title}</h2>
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={16} className="text-blue-500" />
                    {s.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} className="text-blue-500" />
                    {s.location}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Submitted {new Date(s.createdAt).toLocaleDateString()}
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
