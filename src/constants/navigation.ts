import { ROUTES, homeSectionHash } from "@/constants/routes";
import type { UserRole } from "@/types/user";

export type NavLinkItem =
  | { kind: "route"; label: string; to: string }
  | { kind: "hash"; label: string; to: ReturnType<typeof homeSectionHash> };

/** Links visible to everyone (logged in or out) */
export const PUBLIC_NAV: NavLinkItem[] = [
  { kind: "route", label: "Home", to: ROUTES.HOME },
  { kind: "route", label: "Events", to: ROUTES.EVENTS },
  { kind: "route", label: "Workshops", to: ROUTES.WORKSHOPS },
  { kind: "hash", label: "Categories", to: homeSectionHash("categories") },
  { kind: "route", label: "About", to: ROUTES.ABOUT },
  { kind: "route", label: "Contact", to: ROUTES.CONTACT },
];

export function getStudentNav(): NavLinkItem[] {
  return [
    { kind: "route", label: "Dashboard", to: ROUTES.DASHBOARD },
    { kind: "route", label: "My Registrations", to: ROUTES.MY_REGISTRATIONS },
    { kind: "route", label: "Suggest Event", to: ROUTES.SUGGEST_EVENT },
    { kind: "route", label: "My Suggestions", to: ROUTES.MY_SUGGESTIONS },
  ];
}

export function getAdminNav(): NavLinkItem[] {
  return [
    { kind: "route", label: "Admin Dashboard", to: ROUTES.ADMIN_DASHBOARD },
    { kind: "route", label: "Manage Events", to: ROUTES.ADMIN_EVENTS },
    { kind: "route", label: "Create Event", to: ROUTES.CREATE_EVENT },
  ];
}

export function getAccountNav(role: UserRole | undefined): NavLinkItem[] {
  if (!role) return [];
  return role === "admin" ? getAdminNav() : getStudentNav();
}

export const FOOTER_QUICK: NavLinkItem[] = [
  { kind: "route", label: "Home", to: ROUTES.HOME },
  { kind: "route", label: "Events", to: ROUTES.EVENTS },
  { kind: "route", label: "Workshops", to: ROUTES.WORKSHOPS },
  { kind: "route", label: "About", to: ROUTES.ABOUT },
  { kind: "route", label: "Contact", to: ROUTES.CONTACT },
];
