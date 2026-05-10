import { motion } from "motion/react";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Sparkles size={18} />
              <span className="text-sm font-medium">Welcome to UniEvents Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Discover University
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Events & Activities
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Join thousands of students in exciting campus events, workshops, and activities. Connect, learn, and grow
              with your university community.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={ROUTES.EVENTS}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold flex items-center gap-2 group"
              >
                Explore Events
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={ROUTES.CREATE_EVENT}
                className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all font-semibold"
              >
                Plan an event
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-blue-600">350+</div>
                <div className="text-sm text-slate-600 mt-1">Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">5K+</div>
                <div className="text-sm text-slate-600 mt-1">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">45+</div>
                <div className="text-sm text-slate-600 mt-1">Clubs</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
                alt="University Event"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Next Event</div>
                    <div className="text-sm text-slate-600">AI Workshop - May 15, 2026</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
