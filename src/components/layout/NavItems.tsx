import { Link, NavLink } from "react-router-dom";
import type { NavLinkItem } from "@/constants/navigation";

interface NavItemsProps {
  items: NavLinkItem[];
  onNavigate?: () => void;
  className?: string;
  variant?: "header" | "footer";
}

const variantClasses = {
  header: {
    base: "transition-colors font-medium text-slate-700 hover:text-blue-600 whitespace-nowrap",
    active: "text-blue-600",
  },
  footer: {
    base: "transition-colors text-slate-400 hover:text-white text-left whitespace-nowrap",
    active: "text-white",
  },
} as const;

export function NavItems({
  items,
  onNavigate,
  className = "",
  variant = "header",
}: NavItemsProps) {
  const { base, active } = variantClasses[variant];

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {items.map((item) => {
        if (item.kind === "hash") {
          return (
            <Link key={item.label} to={item.to} onClick={onNavigate} className={base}>
              {item.label}
            </Link>
          );
        }
        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
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
