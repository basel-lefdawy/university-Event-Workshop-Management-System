export interface MockRegistration {
  id: string;
  eventTitle: string;
  date: string;
  location: string;
  status: "confirmed" | "waitlist" | "cancelled";
}

export const MOCK_REGISTRATIONS: MockRegistration[] = [
  {
    id: "reg-1",
    eventTitle: "AI & Machine Learning Workshop",
    date: "May 15, 2026",
    location: "Engineering Hall, Room 301",
    status: "confirmed",
  },
  {
    id: "reg-2",
    eventTitle: "Career Fair 2026",
    date: "June 10, 2026",
    location: "Main Hall",
    status: "confirmed",
  },
  {
    id: "reg-3",
    eventTitle: "Photography Workshop",
    date: "June 5, 2026",
    location: "Art Studio",
    status: "waitlist",
  },
];
