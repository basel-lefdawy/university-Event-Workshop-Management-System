import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Bell,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  Mic2,
  Trophy,
  Music,
  Dumbbell,
  GraduationCap,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "May 15, 2026",
      location: "Engineering Hall",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      attendees: 85,
    },
    {
      id: 2,
      title: "Annual Sports Championship",
      date: "May 20, 2026",
      location: "Sports Complex",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1687709645969-0fb890c168c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      attendees: 250,
    },
    {
      id: 3,
      title: "Entrepreneurship Seminar",
      date: "May 22, 2026",
      location: "Business Center",
      category: "Seminar",
      image: "https://images.unsplash.com/photo-1542868727-2666cd25399c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      attendees: 120,
    },
    {
      id: 4,
      title: "Music Festival 2026",
      date: "May 28, 2026",
      location: "Main Campus",
      category: "Entertainment",
      image: "https://images.unsplash.com/photo-1720525200240-17cd4ffd127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      attendees: 500,
    },
  ];

  const categories = [
    { name: "Workshops", icon: BookOpen, color: "from-blue-500 to-indigo-600", count: 24 },
    { name: "Seminars", icon: Mic2, color: "from-purple-500 to-pink-600", count: 18 },
    { name: "Sports", icon: Dumbbell, color: "from-green-500 to-teal-600", count: 32 },
    { name: "Competitions", icon: Trophy, color: "from-orange-500 to-red-600", count: 15 },
    { name: "Entertainment", icon: Music, color: "from-indigo-500 to-purple-600", count: 28 },
  ];

  const stats = [
    { number: "350+", label: "Active Events", icon: Calendar },
    { number: "5,000+", label: "Student Participants", icon: Users },
    { number: "45+", label: "University Clubs", icon: Award },
    { number: "95%", label: "Satisfaction Rate", icon: TrendingUp },
  ];

  const features = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                UniEvents
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </a>
              <a href="#events" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Events
              </a>
              <a href="#categories" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Categories
              </a>
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                About Us
              </a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </a>
              <a href="#events" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Events
              </a>
              <a href="#categories" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Categories
              </a>
              <a href="#about" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">
                About Us
              </a>
              <a href="#contact" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
              <div className="pt-4 space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Login
                </button>
                <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Sparkles size={18} />
                <span className="text-sm font-medium">Welcome to UniEvents Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Discover University
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Events & Activities
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Join thousands of students in exciting campus events, workshops, and activities.
                Connect, learn, and grow with your university community.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold flex items-center gap-2 group">
                  Explore Events
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all font-semibold">
                  Create Event
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">350+</div>
                  <div className="text-sm text-slate-600 mt-1">Events</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">5K+</div>
                  <div className="text-sm text-slate-600 mt-1">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">45+</div>
                  <div className="text-sm text-slate-600 mt-1">Clubs</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
                  alt="University Event"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Next Event</div>
                      <div className="text-sm text-slate-600">AI Workshop - May 15, 2026</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Don't miss out on these exciting upcoming events and activities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} className="text-blue-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={16} className="text-blue-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-blue-500" />
                      {event.attendees} Attendees
                    </div>
                  </div>

                  <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-semibold">
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Event Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore various types of events across campus
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => {
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
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

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100 text-lg">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the best event management system designed for students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join the Community?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Start exploring events and connecting with fellow students today
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-blue-900 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-bold text-lg">
                Get Started Now
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-900 transition-all font-bold text-lg">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">UniEvents</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Your ultimate platform for discovering and managing university events and activities.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#events" className="text-slate-400 hover:text-white transition-colors">Events</a></li>
                <li><a href="#categories" className="text-slate-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-400">
                  <Mail size={18} className="text-blue-400" />
                  info@unievents.edu
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Phone size={18} className="text-blue-400" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <MapPin size={18} className="text-blue-400" />
                  123 University Ave, Campus
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 text-center text-slate-400">
            <p>&copy; 2026 UniEvents. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}