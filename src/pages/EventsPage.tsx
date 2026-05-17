import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Heart,
  MapPin,
  Search,
  Share2,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { DecorativeGrid } from "@/components/common/DecorativeGrid";
import { EVENT_FILTER_CATEGORIES } from "@/constants/eventFilters";
import { ROUTES, eventDetailPath } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchCampusEvents } from "@/services/events.service";
import type { CampusEvent } from "@/types/event";

export default function EventsPage() {
  useDocumentTitle("Events | UniEvents");

  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchCampusEvents();
      setEvents(data);
      setLoading(false);
    })();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  const toggleLike = (eventId: number) => {
    setLikedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
        <DecorativeGrid />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Explore Campus Events</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover exciting events, workshops, and activities happening across campus
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input
                type="search"
                placeholder="Search events by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events"
                className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-white/20 focus:border-white focus:outline-none text-slate-900 placeholder:text-slate-400 text-lg shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                aria-expanded={showFilters}
                className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{events.length}</div>
              <div className="text-blue-100 text-sm mt-1">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{EVENT_FILTER_CATEGORIES.length - 1}</div>
              <div className="text-blue-100 text-sm mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{filteredEvents.length}</div>
              <div className="text-blue-100 text-sm mt-1">Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-x-0 top-28 z-40 mx-auto max-w-lg px-4 sm:px-0"
          role="dialog"
          aria-label="Date filters placeholder"
        >
          <div className="rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
              <ChevronDown size={18} />
              Filters — date range coming soon
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-lg hover:bg-slate-100"
              aria-label="Close filters panel"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {EVENT_FILTER_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={20} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{filteredEvents.length} Events Found</h2>
              <p className="text-slate-600 mt-1">
                {selectedCategory !== "All"
                  ? `Showing ${selectedCategory} events`
                  : "Showing all events"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-slate-500">
              <Loader2 className="animate-spin mr-2" size={24} />
              Loading events…
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => {
              const isLiked = likedEvents.includes(event.id);
              const max = event.maxAttendees ?? 1;
              const attendancePercentage = (event.attendees / max) * 100;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 relative"
                >
                  {event.featured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star size={14} fill="white" />
                      Featured
                    </div>
                  )}

                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                      {event.category}
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggleLike(event.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isLiked
                            ? "bg-red-500 text-white"
                            : "bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-red-500 hover:text-white"
                        }`}
                        aria-pressed={isLiked}
                        aria-label={isLiked ? "Unlike event" : "Like event"}
                      >
                        <Heart size={18} fill={isLiked ? "white" : "none"} />
                      </button>
                      <button
                        type="button"
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                        aria-label="Share event"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl font-bold text-blue-600">
                      {event.price ?? "—"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-blue-500 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock size={16} className="text-blue-500 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-blue-500 shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-blue-500 shrink-0" />
                        <span>
                          {event.attendees}/{max} Registered
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-slate-600 mb-1.5">
                        <span>Attendance</span>
                        <span className="font-semibold">{attendancePercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            attendancePercentage >= 80
                              ? "bg-gradient-to-r from-red-500 to-orange-500"
                              : attendancePercentage >= 50
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "bg-gradient-to-r from-green-500 to-teal-500"
                          }`}
                          style={{ width: `${Math.min(100, attendancePercentage)}%` }}
                        />
                      </div>
                    </div>

                    {event.organizer && (
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">
                              {event.organizer.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Organized by</p>
                            <p className="text-sm font-semibold text-slate-900">{event.organizer}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Link
                      to={eventDetailPath(event.id)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center justify-center gap-2 group/link"
                    >
                      View Details
                      <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
          )}

          {!loading && filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Events Found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filters to find what you&apos;re looking for
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <DecorativeGrid opacityClass="opacity-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Want to Host an Event?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Create and manage your own campus events with our easy-to-use platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to={ROUTES.CREATE_EVENT}
                className="px-10 py-4 bg-white text-blue-900 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg"
              >
                Create Event
              </Link>
              <Link
                to={ROUTES.ABOUT}
                className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-900 transition-all font-bold text-lg"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}


