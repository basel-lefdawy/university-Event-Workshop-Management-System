import { motion } from "motion/react";
import { Calendar, Users, Award, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { AUTH_PANEL_GRID } from "@/constants/patterns";

const features = [
  { icon: Calendar, title: "500+ Events", description: "Annual campus activities" },
  { icon: Users, title: "10K+ Students", description: "Active community members" },
  { icon: Award, title: "50+ Workshops", description: "Professional development" },
];

const defaultHeadline = (
  <>
    Welcome to the Future of
    <span className="block">University Events</span>
  </>
);

export function AuthMarketingAside({
  headline = defaultHeadline,
  subheadline = "Discover, register, and manage all campus events and workshops in one centralized platform.",
}: {
  headline?: ReactNode;
  subheadline?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: AUTH_PANEL_GRID }}
        aria-hidden
      />
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">UniEvents</h2>
              <p className="text-sm text-white/80">Event Management System</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold leading-tight mb-4"
            >
              {headline}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/90 leading-relaxed"
            >
              {subheadline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <Icon className="mb-3" size={32} />
                  <div className="text-2xl font-bold mb-1">{feature.title}</div>
                  <div className="text-sm text-white/80">{feature.description}</div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
              alt="University students collaborating"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </motion.div>
        </div>

        <div className="text-sm text-white/70">&copy; 2026 UniEvents. All rights reserved.</div>
      </div>
    </motion.div>
  );
}
