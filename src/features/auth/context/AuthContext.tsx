import React, { useState, useCallback } from "react";
import {
  API_BASE_URL,
  getToken,
  setToken,
  getUser,
  setUser,
  clearAuth,
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
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  } catch {
    console.warn("Failed to save registered user to localStorage");
  }
};

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida/AEtjO1Xvsc_93oFqSnauAp5IVQNZ060MQM2fk7ENYui9h9Doqrms9Q1An_AyUnNX0QafrbPqs3xDSqOHbxhZkumc8EZlidbsxNBitNlvTQX45B5nelOhjI2EAFDQzMWtUMO-XsLjhimgdCEMoMR2EudWXzn8o89qqYMAXS_XWChKLqJrK57sibKH_TKMEd9j7p2KEitcWNexrWHyL-5xO7PYqqX11JnqaoWxaz679trS2V-jOx4YQJoRKk8q0mU";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state lazily from localStorage to avoid cascading render effects
  const [currentUser, setCurrentUser] = useState<User | null>(() => getUser<User>());
  const [currentToken, setCurrentToken] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

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
          : "Олександр Пловайко",
        email: credentials.emailOrPhone.includes("@")
          ? credentials.emailOrPhone
          : "user@masterdim.ua",
        phone: credentials.emailOrPhone.includes("@")
          ? "+380 50 123 45 67"
          : credentials.emailOrPhone,
        role: credentials.role || "client",
        city: "Ужгород",
        avatarUrl: DEFAULT_AVATAR,
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
      // Fallback for offline mode / before backend lab
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
        city: data.city || "Ужгород",
        avatarUrl: DEFAULT_AVATAR,
        specialization: data.specialization,
        experience: data.experience,
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
    logout,
    clearError,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
