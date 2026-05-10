import { BookOpen, Dumbbell, Mic2, Music, Tag, Trophy, type LucideIcon } from "lucide-react";

export interface EventFilterCategory {
  name: string;
  icon: LucideIcon;
  color: string;
}

export const EVENT_FILTER_CATEGORIES: EventFilterCategory[] = [
  { name: "All", icon: Tag, color: "from-slate-500 to-slate-600" },
  { name: "Workshops", icon: BookOpen, color: "from-blue-500 to-indigo-600" },
  { name: "Seminars", icon: Mic2, color: "from-purple-500 to-pink-600" },
  { name: "Sports", icon: Dumbbell, color: "from-green-500 to-teal-600" },
  { name: "Competitions", icon: Trophy, color: "from-orange-500 to-red-600" },
  { name: "Entertainment", icon: Music, color: "from-indigo-500 to-purple-600" },
];
