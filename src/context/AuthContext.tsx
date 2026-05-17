import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, LoginCredentials, RegisterPayload } from "@/types/user";
import * as authService from "@/services/auth.service";
import { setHttpAuthTokenGetter } from "@/services/apiInstance";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticating: boolean;
  isBootstrapping: boolean;
  error: string | null;
  login: (creds: LoginCredentials) => Promise<AuthUser>;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "unievents_auth_token";
const USER_KEY = "unievents_auth_user";

function parseStoredUser(raw: string): AuthUser | null {
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed.id || !parsed.email || !parsed.name) {
      return null;
    }
    return {
      id: String(parsed.id),
      email: String(parsed.email),
      name: String(parsed.name),
      role: parsed.role === "admin" ? "admin" : "student",
    };
  } catch {
    return null;
  }
}

function readStoredAuth(): { user: AuthUser | null; token: string | null } {
  const token = localStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY);
  if (!token || !rawUser) {
    if (token && !rawUser) {
      localStorage.removeItem(TOKEN_KEY);
    }
    if (!token && rawUser) {
      localStorage.removeItem(USER_KEY);
    }
    return { user: null, token: null };
  }
  const user = parseStoredUser(rawUser);
  if (!user) {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    return { user: null, token: null };
  }
  return { user, token };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [initialAuth] = useState(readStoredAuth);
  const [user, setUser] = useState<AuthUser | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(initialAuth.token));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHttpAuthTokenGetter(() => localStorage.getItem(TOKEN_KEY));
  }, [token]);

  useEffect(() => {
    if (!initialAuth.token) return;

    let cancelled = false;
    (async () => {
      try {
        const profile = await authService.fetchCurrentUser();
        if (!cancelled) {
          setUser(profile);
          localStorage.setItem(USER_KEY, JSON.stringify(profile));
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
          setToken(null);
        }
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialAuth.token]);

  const persistSession = useCallback((nextUser: AuthUser | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextToken && nextUser) {
      localStorage.setItem(TOKEN_KEY, nextToken);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  const login = useCallback(
    async (creds: LoginCredentials) => {
      setIsAuthenticating(true);
      setError(null);
      try {
        const { user: nextUser, token: nextToken } = await authService.loginWithCredentials(creds);
        persistSession(nextUser, nextToken);
        return nextUser;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Login failed";
        setError(message);
        throw e;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsAuthenticating(true);
      setError(null);
      try {
        const { user: nextUser, token: nextToken } = await authService.registerAccount(payload);
        persistSession(nextUser, nextToken);
        return nextUser;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Registration failed";
        setError(message);
        throw e;
      } finally {
        setIsAuthenticating(false);
      }
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    persistSession(null, null);
  }, [persistSession]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    (): AuthContextValue => ({
      user,
      token,
      isAuthenticating,
      isBootstrapping,
      error,
      login,
      logout,
      register,
      clearError,
    }),
    [user, token, isAuthenticating, isBootstrapping, error, login, logout, register, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
