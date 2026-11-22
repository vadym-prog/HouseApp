/**
 * MasterDim API Configuration and LocalStorage Helpers
 * Ready for Node.js / Express backend integration in Lab 7
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: "master_dim_token",
  USER: "master_dim_user",
  BOOKINGS: "bookings_history",
  REGISTERED_USERS: "master_dim_registered_users",
} as const;

/**
 * JWT Token Helpers
 */
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } catch {
    console.warn("Failed to save token to localStorage");
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  } catch {
    console.warn("Failed to remove token from localStorage");
  }
};

/**
 * User Data Helpers
 */
export const getUser = <T = unknown>(): T | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const setUser = <T = unknown>(user: T): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch {
    console.warn("Failed to save user to localStorage");
  }
};

export const removeUser = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch {
    console.warn("Failed to remove user from localStorage");
  }
};

/**
 * Clear all authentication data
 */
export const clearAuth = (): void => {
  removeToken();
  removeUser();
};

/**
 * Booking History Helpers (LocalStorage Fallback)
 */
export const getStoredBookings = <T = unknown>(): T[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
};

export const saveStoredBooking = <T = unknown>(booking: T): void => {
  try {
    const existing = getStoredBookings<T>();
    existing.unshift(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(existing));
  } catch {
    console.warn("Failed to save booking to localStorage");
  }
};

/**
 * HTTP Auth Headers Helper
 */
export const getAuthHeaders = (
  customHeaders: Record<string, string> = {}
): Record<string, string> => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
};
