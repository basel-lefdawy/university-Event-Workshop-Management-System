import type { CampusEvent } from "@/types/event";

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    description:
      "Learn the fundamentals of AI and ML with industry experts. Hands-on projects and real-world applications.",
    date: "May 15, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Engineering Hall, Room 301",
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 85,
    maxAttendees: 100,
    organizer: "Tech Club",
    price: "Free",
    featured: true,
  },
  {
    id: 2,
    title: "Annual Sports Championship",
    description:
      "Join us for the biggest sports event of the year. Multiple sports, exciting matches, and amazing prizes!",
    date: "May 20, 2026",
    time: "8:00 AM - 6:00 PM",
    location: "Main Sports Complex",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1687709645969-0fb890c168c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 250,
    maxAttendees: 300,
    organizer: "Sports Committee",
    price: "$5",
    featured: true,
  },
  {
    id: 3,
    title: "Entrepreneurship Seminar",
    description:
      "Learn from successful entrepreneurs about building startups, funding, and scaling your business.",
    date: "May 22, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Business Center Auditorium",
    category: "Seminars",
    image:
      "https://images.unsplash.com/photo-1542868727-2666cd25399c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 120,
    maxAttendees: 150,
    organizer: "Business Club",
    price: "Free",
    featured: false,
  },
  {
    id: 4,
    title: "Music Festival 2026",
    description:
      "Experience an unforgettable night of live music, performances, and entertainment from talented artists.",
    date: "May 28, 2026",
    time: "6:00 PM - 11:00 PM",
    location: "Main Campus Grounds",
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1720525200240-17cd4ffd127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 500,
    maxAttendees: 600,
    organizer: "Arts & Culture Society",
    price: "$10",
    featured: true,
  },
  {
    id: 5,
    title: "Coding Competition 2026",
    description:
      "Test your programming skills in this intense coding challenge. Prizes for top performers!",
    date: "June 1, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Computer Science Building",
    category: "Competitions",
    image:
      "https://images.unsplash.com/photo-1662148931662-8089bc1a67be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 95,
    maxAttendees: 120,
    organizer: "Programming Club",
    price: "Free",
    featured: false,
  },
  {
    id: 6,
    title: "Photography Workshop",
    description:
      "Master the art of photography with professional photographers. Bring your camera and learn!",
    date: "June 5, 2026",
    time: "1:00 PM - 4:00 PM",
    location: "Art Studio",
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1662148932231-f75d645631c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 45,
    maxAttendees: 50,
    organizer: "Photography Club",
    price: "$8",
    featured: false,
  },
  {
    id: 7,
    title: "Career Fair 2026",
    description:
      "Meet top employers, explore career opportunities, and network with industry professionals.",
    date: "June 10, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Main Hall",
    category: "Seminars",
    image:
      "https://images.unsplash.com/photo-1728206313441-281ef4ea5d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 180,
    maxAttendees: 200,
    organizer: "Career Services",
    price: "Free",
    featured: true,
  },
  {
    id: 8,
    title: "Dance Competition",
    description:
      "Showcase your dance moves in this exciting competition. Solo and group categories available.",
    date: "June 15, 2026",
    time: "5:00 PM - 9:00 PM",
    location: "University Theater",
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1765474604988-4fc3fa14f46b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    attendees: 75,
    maxAttendees: 100,
    organizer: "Dance Society",
    price: "$3",
    featured: false,
  },
];

export const UPCOMING_PREVIEW_LIMIT = 4;
