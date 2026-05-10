import {
  Award,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  Dumbbell,
  Mic2,
  Music,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "UniEvents",
  tagline: "University Events & Workshops",
} as const;

export interface StatItem {
  number: string;
  label: string;
  icon: LucideIcon;
}

export const STATS: StatItem[] = [
  { number: "350+", label: "Active Events", icon: Calendar },
  { number: "5,000+", label: "Student Participants", icon: Users },
  { number: "45+", label: "University Clubs", icon: Award },
  { number: "95%", label: "Satisfaction Rate", icon: TrendingUp },
];

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const PLATFORM_FEATURES: FeatureItem[] = [
  {
    title: "Easy Registration",
    description: "Register for events in seconds with our streamlined process",
    icon: CheckCircle,
  },
  {
    title: "Professional Organization",
    description: "Well-organized events with detailed schedules and locations",
    icon: Sparkles,
  },
  {
    title: "Instant Notifications",
    description: "Get real-time updates about your registered events",
    icon: Bell,
  },
  {
    title: "Event Tracking",
    description: "Keep track of all your past and upcoming activities",
    icon: Zap,
  },
];

export interface HomeCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
}

export const HOME_CATEGORIES: HomeCategory[] = [
  { name: "Workshops", icon: BookOpen, color: "from-blue-500 to-indigo-600", count: 24 },
  { name: "Seminars", icon: Mic2, color: "from-purple-500 to-pink-600", count: 18 },
  { name: "Sports", icon: Dumbbell, color: "from-green-500 to-teal-600", count: 32 },
  { name: "Competitions", icon: Trophy, color: "from-orange-500 to-red-600", count: 15 },
  { name: "Entertainment", icon: Music, color: "from-indigo-500 to-purple-600", count: 28 },
];
