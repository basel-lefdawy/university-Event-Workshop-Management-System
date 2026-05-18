import { NavLink, useLocation } from "react-router-dom";
import type { NavLinkItem } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";

interface NavItemsProps {
  items: NavLinkItem[];
  onNavigate?: () => void;
  className?: string;
  variant?: "header" | "footer" | "account";
}

const variantClasses = {
  header: {
    base: "text-slate-700 hover:text-blue-600 transition-colors font-medium",
    active: "text-blue-600 font-semibold",
  },
  footer: {
    base: "text-slate-400 hover:text-white transition-colors",
    active: "text-white",
  },
  account: {
    base: "px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors font-medium text-sm whitespace-nowrap",
    active: "bg-blue-50 text-blue-700 font-semibold",
  },
} as const;

export function NavItems({
  items,
  onNavigate,
  className = "",
  variant = "header",
}: NavItemsProps) {
  const { base, active } = variantClasses[variant];
  const location = useLocation();

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {items.map((item) => {
        if (item.kind === "hash") {
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${base} ${isActive && location.pathname === ROUTES.HOME ? active : ""}`
              }
            >
              {item.label}
            </NavLink>
          );
        }
        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === ROUTES.HOME}
            onClick={onNavigate}
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
}
