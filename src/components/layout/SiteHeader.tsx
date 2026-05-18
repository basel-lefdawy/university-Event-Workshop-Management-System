import { LogOut, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrandLogoRow } from "@/components/layout/BrandLogo";
import { NavItems } from "@/components/layout/NavItems";
import { getAccountNav, PUBLIC_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "admin";
  const accountNav = getAccountNav(user?.role);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-sm border-b ${
        isAdmin
          ? "bg-slate-900/95 backdrop-blur-xl border-slate-700"
          : "bg-white/80 backdrop-blur-xl border-slate-200/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-[4.5rem] gap-4">
          <Link to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME} aria-label="UniEvents Home">
            <BrandLogoRow
              titleClassName={
                isAdmin
                  ? "text-xl font-bold text-white"
                  : "text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              }
              subtitle={isAdmin ? <span className="text-slate-400">Admin portal</span> : undefined}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6 min-w-0 flex-1 justify-center">
            <NavItems
              items={PUBLIC_NAV}
              variant="header"
              className={isAdmin ? "[&_a]:text-slate-300 [&_a:hover]:text-white [&_.font-semibold]:text-white" : ""}
            />
          </div>

          <div className="hidden md:flex items-center gap-1 shrink-0">
            {user ? (
              <>
                <NavItems items={accountNav} variant="account" className={isAdmin ? "[&_a]:text-slate-200 [&_a:hover]:bg-slate-800" : ""} />
                <button
                  type="button"
                  onClick={logout}
                  className={`ml-1 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isAdmin
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
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
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={`md:hidden p-2 rounded-lg ${isAdmin ? "hover:bg-slate-800 text-white" : "hover:bg-slate-100"}`}
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
          className={`md:hidden border-t ${isAdmin ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}
        >
          <div className="px-4 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <NavItems
              items={PUBLIC_NAV}
              onNavigate={() => setMobileOpen(false)}
              className={`flex-col items-stretch ${isAdmin ? "[&_a]:text-slate-200" : ""}`}
            />
            {user && (
              <div className={`pt-4 border-t space-y-1 ${isAdmin ? "border-slate-700" : "border-slate-100"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isAdmin ? "text-slate-400" : "text-slate-500"}`}>
                  {isAdmin ? "Admin" : "Your account"}
                </p>
                <NavItems
                  items={accountNav}
                  onNavigate={() => setMobileOpen(false)}
                  variant="account"
                  className={`flex-col items-stretch ${isAdmin ? "[&_a]:text-slate-200 [&_a:hover]:bg-slate-800" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className={`w-full mt-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${
                    isAdmin ? "border-slate-600 text-slate-200" : "border-slate-200 text-slate-800"
                  }`}
                >
                  Sign out
                </button>
              </div>
            )}
            {!user && (
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <Link
                  to={ROUTES.LOGIN}
                  className="block w-full px-4 py-2.5 text-center rounded-lg border border-slate-300 font-medium"
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
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
