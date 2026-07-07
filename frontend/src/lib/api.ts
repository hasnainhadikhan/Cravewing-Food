// Tiny fetch wrapper for the Laravel API.
// Base URL comes from VITE_API_URL (see frontend/.env), defaults to local Laravel.
const BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000/api";

const TOKEN_KEY = "crave_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;
  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

/** POST/GET JSON to the API. Throws ApiError on non-2xx (with Laravel validation errors). */
export async function api<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    /* no body */
  }

  if (!res.ok) {
    throw new ApiError(body?.message || `Request failed (${res.status})`, res.status, body?.errors);
  }
  return body as T;
}

export const post = <T = any>(path: string, data: unknown) =>
  api<T>(path, { method: "POST", body: JSON.stringify(data) });

export const get = <T = any>(path: string) => api<T>(path, { method: "GET" });
