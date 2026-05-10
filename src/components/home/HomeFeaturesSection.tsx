import { motion } from "motion/react";
import { SectionIntro } from "@/components/home/SectionIntro";
import { PLATFORM_FEATURES } from "@/constants/homeContent";

export function HomeFeaturesSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          title="Why Choose Our Platform?"
          description="Experience the best event management system designed for students"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLATFORM_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
