import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminCreateEventPage from "@/pages/admin/AdminCreateEventPage";
import AdminEditEventPage from "@/pages/admin/AdminEditEventPage";
import AdminEventsPage from "@/pages/admin/AdminEventsPage";
import ContactPage from "@/pages/ContactPage";
import CreateEventPage from "@/pages/CreateEventPage";
import EventDetailPage from "@/pages/EventDetailPage";
import EventsPage from "@/pages/EventsPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MyRegistrationsPage from "@/pages/MyRegistrationsPage";
import MySuggestionsPage from "@/pages/MySuggestionsPage";
import SignupPage from "@/pages/SignupPage";
import SuggestEventPage from "@/pages/SuggestEventPage";
import UserDashboardPage from "@/pages/UserDashboardPage";
import WorkshopsPage from "@/pages/WorkshopsPage";
import { ROUTES } from "@/constants/routes";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.WORKSHOPS} element={<WorkshopsPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={`${ROUTES.EVENTS}/:eventId`} element={<EventDetailPage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />

        <Route
          path={ROUTES.CREATE_EVENT}
          element={
            <ProtectedRoute requireAdmin>
              <AdminCreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:eventId/edit"
          element={
            <ProtectedRoute requireAdmin>
              <AdminEditEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_EVENTS}
          element={
            <ProtectedRoute requireAdmin>
              <AdminEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SUGGEST_EVENT}
          element={
            <ProtectedRoute requireStudent>
              <SuggestEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MY_REGISTRATIONS}
          element={
            <ProtectedRoute>
              <MyRegistrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MY_SUGGESTIONS}
          element={
            <ProtectedRoute requireStudent>
              <MySuggestionsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
