import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrandLogoRow } from "@/components/layout/BrandLogo";
import { NavItems } from "@/components/layout/NavItems";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const accountLinks =
    user == null
      ? []
      : [
          { to: ROUTES.DASHBOARD, label: "Dashboard" },
          { to: ROUTES.MY_REGISTRATIONS, label: "Registrations" },
          { to: ROUTES.CREATE_EVENT, label: "Create event" },
          ...(user.role === "admin" ? [{ to: ROUTES.ADMIN_DASHBOARD, label: "Admin" }] : []),
        ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to={ROUTES.HOME} aria-label="UniEvents Home">
            <BrandLogoRow />
          </Link>

          <div className="hidden md:flex md:flex-col md:items-end md:gap-2 lg:flex-row lg:items-center lg:gap-8">
            <NavItems items={PRIMARY_NAV} className="" />
            <NavItems items={SECONDARY_NAV} className="lg:ml-0 text-sm gap-4" />
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0 flex-wrap justify-end">
            {user ? (
              <>
                {accountLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-t border-slate-200"
        >
          <div className="px-4 py-6 space-y-6">
            <NavItems
              items={PRIMARY_NAV}
              onNavigate={() => setMobileOpen(false)}
              className="flex-col items-stretch"
            />
            <NavItems
              items={SECONDARY_NAV}
              onNavigate={() => setMobileOpen(false)}
              className="flex-col items-stretch"
            />
            <div className="pt-2 space-y-3 border-t border-slate-100">
              {user ? (
                <>
                  {accountLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block w-full text-center px-6 py-2.5 rounded-lg border border-slate-200 font-medium text-slate-800"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    className="block w-full px-4 py-2 text-slate-700 border border-slate-300 rounded-lg text-center font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to={ROUTES.SIGNUP}
                    className="block w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
