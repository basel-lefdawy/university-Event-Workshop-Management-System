import { ROUTES, homeSectionHash } from "@/constants/routes";

export type NavLinkItem =
  | { kind: "route"; label: string; to: string }
  | { kind: "hash"; label: string; to: string };

export const PRIMARY_NAV: NavLinkItem[] = [
  { kind: "route", label: "Home", to: ROUTES.HOME },
  { kind: "route", label: "Events", to: ROUTES.EVENTS },
  { kind: "route", label: "Workshops", to: ROUTES.WORKSHOPS },
  { kind: "hash", label: "Categories", to: homeSectionHash("categories") },
  { kind: "route", label: "About", to: ROUTES.ABOUT },
  { kind: "route", label: "Contact", to: ROUTES.CONTACT },
];

export const SECONDARY_NAV: NavLinkItem[] = [
  { kind: "route", label: "Create Event", to: ROUTES.CREATE_EVENT },
  { kind: "route", label: "My Registrations", to: ROUTES.MY_REGISTRATIONS },
];

export const FOOTER_QUICK: NavLinkItem[] = [
  { kind: "route", label: "Home", to: ROUTES.HOME },
  { kind: "route", label: "Events", to: ROUTES.EVENTS },
  { kind: "route", label: "Workshops", to: ROUTES.WORKSHOPS },
  { kind: "route", label: "About", to: ROUTES.ABOUT },
  { kind: "route", label: "Contact", to: ROUTES.CONTACT },
];
