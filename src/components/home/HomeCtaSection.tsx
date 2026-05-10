import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { DecorativeGrid } from "@/components/common/DecorativeGrid";
import { ROUTES } from "@/constants/routes";

export function HomeCtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
      <DecorativeGrid opacityClass="opacity-10" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Start exploring events and connecting with fellow students today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={ROUTES.SIGNUP}
              className="px-10 py-4 bg-white text-blue-900 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg"
            >
              Get Started Now
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
  );
}
