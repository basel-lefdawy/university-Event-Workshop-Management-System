import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { DecorativeGrid } from "@/components/common/DecorativeGrid";
import { SectionIntro } from "@/components/home/SectionIntro";
import { PLATFORM_FEATURES } from "@/constants/homeContent";
import { ROUTES } from "@/constants/routes";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AboutPage() {
  useDocumentTitle("About | UniEvents");

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <DecorativeGrid />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About UniEvents</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We partner with clubs, faculties, and student leaders to keep campus life organized,
              inclusive, and easy to navigate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-lg text-slate-600 leading-relaxed">
          <p>
            UniEvents began as a simple idea: students should never miss a workshop because the details were buried in
            a group chat. Today, we centralize discovery, registration, and updates for events of every size—from
            orientation week to faculty research talks.
          </p>
          <p>
            Our roadmap includes deeper integrations with room booking, payment providers, and single sign-on so your
            university IT team can adopt the platform with confidence.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionIntro
            title="What we focus on"
            description="Thoughtful tooling for organizers and frictionless journeys for attendees."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLATFORM_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <DecorativeGrid opacityClass="opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Partner with UniEvents?</h2>
          <p className="text-blue-100 mb-8">
            Faculty coordinators, clubs, and central IT can reach us for onboarding, SSO, or room integrations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={ROUTES.CONTACT}
              className="px-8 py-3 rounded-xl bg-white text-blue-900 font-semibold hover:shadow-xl transition-all"
            >
              Contact team
            </Link>
            <Link
              to={ROUTES.CREATE_EVENT}
              className="px-8 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-900 transition-all"
            >
              Submit an event draft
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
