import React, { useState, useEffect, useCallback } from "react";
import {
  API_BASE_URL,
  getToken,
  setToken,
  getUser,
  setUser,
  clearAuth,
  getAuthHeaders,
  STORAGE_KEYS,
} from "../../../config/api";
import { AuthContext } from "./authContextDef";
import type { User, LoginCredentials, RegisterData, AuthResponse, AuthContextType } from "../types";

// Helper to get registered users pool from localStorage
const getStoredRegisteredUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
};

const saveStoredRegisteredUser = (user: User): void => {
  try {
    const users = getStoredRegisteredUsers();
    const index = users.findIndex((u) => u.id === user.id || u.email === user.email);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  } catch {
    console.warn("Failed to save registered user to localStorage");
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state lazily from localStorage to avoid cascading render effects
  const [currentUser, setCurrentUser] = useState<User | null>(() => getUser<User>());
  const [currentToken, setCurrentToken] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  // Verify token with backend /api/auth/me on mount if token exists
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    let isMounted = true;
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: getAuthHeaders(),
        });
        if (response.ok && isMounted) {
          const data = await response.json();
          if (data?.user) {
            setCurrentUser(data.user);
            setUser(data.user);
          }
        }
      } catch {
        // Silently fall back to cached localStorage user if backend is offline
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setError(null);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Validation
    if (!credentials.emailOrPhone.trim()) {
      setError("Введіть email або номер телефону");
      setIsLoading(false);
      return false;
    }
    if (!credentials.password || credentials.password.length < 4) {
      setError("Пароль повинен містити щонайменше 4 символи");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Помилка авторизації: ${response.status}`);
      }

      const data: AuthResponse = await response.json();
      setCurrentToken(data.token);
      setCurrentUser(data.user);
      setToken(data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: unknown) {
      // Fallback for offline mode / before backend lab
      console.info(
        "Backend /api/auth/login unavailable. Falling back to local offline authentication.",
        err
      );

      // Check if user was registered previously in localStorage
      const storedUsers = getStoredRegisteredUsers();
      const existing = storedUsers.find(
        (u) =>
          u.email.toLowerCase() === credentials.emailOrPhone.toLowerCase() ||
          (u.phone && u.phone.includes(credentials.emailOrPhone))
      );

      const targetUser: User = existing || {
        id: `usr_${Date.now()}`,
        name: credentials.emailOrPhone.includes("@")
          ? credentials.emailOrPhone.split("@")[0]
          : "Олександр Коваль",
        email: credentials.emailOrPhone.includes("@")
          ? credentials.emailOrPhone
          : "user@masterdim.ua",
        phone: credentials.emailOrPhone.includes("@")
          ? "+380 67 123 45 67"
          : credentials.emailOrPhone,
        role: credentials.role || "client",
        city: "Київ",
        addresses: ["вул. Садова, 14"],
      };

      const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      setCurrentToken(mockToken);
      setCurrentUser(targetUser);
      setToken(mockToken);
      setUser(targetUser);
      setIsAuthModalOpen(false);
      return true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Validation
    if (!data.name.trim() || data.name.trim().length < 2) {
      setError("Ім’я повинно містити щонайменше 2 символи");
      setIsLoading(false);
      return false;
    }
    if (!data.email.trim() || !data.email.includes("@")) {
      setError("Введіть коректну електронну адресу");
      setIsLoading(false);
      return false;
    }
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 9) {
      setError("Введіть коректний номер телефону (від 9 цифр)");
      setIsLoading(false);
      return false;
    }
    if (!data.password || data.password.length < 6) {
      setError("Пароль для реєстрації повинен містити не менше 6 символів");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Помилка реєстрації: ${response.status}`);
      }

      const resData: AuthResponse = await response.json();
      setCurrentToken(resData.token);
      setCurrentUser(resData.user);
      setToken(resData.token);
      setUser(resData.user);
      saveStoredRegisteredUser(resData.user);
      setIsAuthModalOpen(false);
      return true;
    } catch (err: unknown) {
      console.info(
        "Backend /api/auth/register unavailable. Registering user locally in localStorage.",
        err
      );

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        role: data.role,
        city: data.city || "Київ",
        specialization: data.specialization,
        experience: data.experience,
        addresses: data.addresses || ["вул. Садова, 14"],
      };

      const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      saveStoredRegisteredUser(newUser);
      setCurrentToken(mockToken);
      setCurrentUser(newUser);
      setToken(mockToken);
      setUser(newUser);
      setIsAuthModalOpen(false);
      return true;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `Помилка оновлення: ${response.status}`);
        }

        const resData = await response.json();
        const updatedUser: User = resData.user || resData;
        setCurrentUser(updatedUser);
        setUser(updatedUser);
        saveStoredRegisteredUser(updatedUser);
        return true;
      } catch (err: unknown) {
        console.info(
          "Backend /api/users/profile unavailable. Updating profile locally in localStorage.",
          err
        );

        if (currentUser) {
          const updatedUser: User = {
            ...currentUser,
            ...data,
          };
          setCurrentUser(updatedUser);
          setUser(updatedUser);
          saveStoredRegisteredUser(updatedUser);
          return true;
        }
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser]
  );

  const logout = useCallback(() => {
    clearAuth();
    setCurrentToken(null);
    setCurrentUser(null);
    setError(null);
  }, []);

  const value: AuthContextType = {
    user: currentUser,
    token: currentToken,
    isAuthenticated: Boolean(currentUser && currentToken),
    isLoading,
    error,
    login,
    register,
    updateProfile,
    logout,
    clearError,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
