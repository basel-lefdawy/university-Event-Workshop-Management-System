import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  /** When true, only users with role `admin` may access the route. */
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin }: ProtectedRouteProps) {
  const { user, token, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center pt-32">
        <p className="text-slate-600 font-medium">Loading your session…</p>
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
