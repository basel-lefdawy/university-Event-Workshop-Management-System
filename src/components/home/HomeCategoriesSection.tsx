import { motion } from "motion/react";
import { SectionIntro } from "@/components/home/SectionIntro";
import { HOME_CATEGORIES } from "@/constants/homeContent";

export function HomeCategoriesSection() {
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <SectionIntro
          title="Event Categories"
          description="Explore various types of events across campus"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {HOME_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-transparent overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white" size={32} />
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-slate-600">{category.count} Events</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
