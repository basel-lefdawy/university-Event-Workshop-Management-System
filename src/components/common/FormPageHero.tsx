import { motion } from "motion/react";
import { DecorativeGrid } from "@/components/common/DecorativeGrid";

interface FormPageHeroProps {
  title: string;
  description: string;
}

export function FormPageHero({ title, description }: FormPageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
      <DecorativeGrid />
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
