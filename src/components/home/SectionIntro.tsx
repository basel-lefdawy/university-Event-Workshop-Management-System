import { motion } from "motion/react";

interface SectionIntroProps {
  title: string;
  description: string;
  className?: string;
}

export function SectionIntro({ title, description, className = "" }: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">{description}</p>
    </motion.div>
  );
}
