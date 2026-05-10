export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  EVENTS: "/events",
  WORKSHOPS: "/workshops",
  CONTACT: "/contact",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ADMIN_DASHBOARD: "/admin",
  MY_REGISTRATIONS: "/my-registrations",
  CREATE_EVENT: "/events/create",
} as const;

export type RouteKey = keyof typeof ROUTES;

export function homeSectionHash(sectionId: string) {
  return `${ROUTES.HOME}#${sectionId}`;
}

export function eventDetailPath(eventId: string | number) {
  return `${ROUTES.EVENTS}/${eventId}`;
}
