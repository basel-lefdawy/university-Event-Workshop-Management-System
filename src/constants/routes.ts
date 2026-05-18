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
  ADMIN_EVENTS: "/admin/events",
  MY_REGISTRATIONS: "/my-registrations",
  MY_SUGGESTIONS: "/my-suggestions",
  SUGGEST_EVENT: "/events/suggest",
  CREATE_EVENT: "/admin/events/create",
  EDIT_EVENT: "/admin/events/:eventId/edit",
} as const;

export type RouteKey = keyof typeof ROUTES;

export function homeSectionHash(sectionId: string) {
  return { pathname: ROUTES.HOME, hash: sectionId };
}

export function eventDetailPath(eventId: string | number) {
  return `${ROUTES.EVENTS}/${eventId}`;
}

export function editEventPath(eventId: string | number) {
  return `/admin/events/${eventId}/edit`;
}
