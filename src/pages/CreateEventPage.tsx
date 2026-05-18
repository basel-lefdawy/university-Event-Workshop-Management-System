import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

/** Legacy route — redirects students to suggest flow and admins to create flow. */
export default function CreateEventPage() {
  const { user } = useAuth();
  if (user?.role === "admin") {
    return <Navigate to={ROUTES.CREATE_EVENT} replace />;
  }
  return <Navigate to={ROUTES.SUGGEST_EVENT} replace />;
}
