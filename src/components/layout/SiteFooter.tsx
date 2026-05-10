import { Facebook, GraduationCap, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { NavItems } from "@/components/layout/NavItems";
import { FOOTER_QUICK } from "@/constants/navigation";
import { ROUTES, homeSectionHash } from "@/constants/routes";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={`${href}-${index}`}
                  href={href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <NavItems
              variant="footer"
              items={FOOTER_QUICK}
              className="flex-col items-start gap-3"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTES.CONTACT} className="text-slate-400 hover:text-white transition-colors">
                  Help & contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail size={18} className="text-blue-400 shrink-0" />
                info@unievents.edu
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone size={18} className="text-blue-400 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>123 University Ave, Campus</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 flex flex-col sm:flex-row gap-4 justify-center sm:items-center text-sm">
          <p>&copy; 2026 UniEvents. All rights reserved. Made with care for students.</p>
          <Link to={homeSectionHash("about")} className="text-blue-400 hover:text-blue-300">
            Why UniEvents?
          </Link>
        </div>
      </div>
    </footer>
  );
}
