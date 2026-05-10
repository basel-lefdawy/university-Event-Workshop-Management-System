import { createHttpClient } from "@/services/api/httpClient";

let tokenGetter: (() => string | null) | undefined;

/** Wire this from AuthProvider when you persist tokens (e.g. localStorage). */
export function setHttpAuthTokenGetter(getToken: () => string | null) {
  tokenGetter = getToken;
}

export const api = createHttpClient({
  getToken: () => tokenGetter?.() ?? null,
});
