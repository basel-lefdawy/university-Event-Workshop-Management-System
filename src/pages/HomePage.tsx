import { HeroSection } from "@/components/home/HeroSection";
import { HomeCategoriesSection } from "@/components/home/HomeCategoriesSection";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomeFeaturesSection } from "@/components/home/HomeFeaturesSection";
import { HomeStatsSection } from "@/components/home/HomeStatsSection";
import { HomeUpcomingEventsSection } from "@/components/home/HomeUpcomingEventsSection";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("UniEvents — University Events & Workshops");

  return (
    <>
      <HeroSection />
      <HomeUpcomingEventsSection />
      <HomeCategoriesSection />
      <HomeStatsSection />
      <HomeFeaturesSection />
      <HomeCtaSection />
    </>
  );
}
