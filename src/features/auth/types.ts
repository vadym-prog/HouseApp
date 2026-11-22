export type UserRole = "client" | "master";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  city?: string;
  avatarUrl?: string;
  specialization?: string;
  experience?: string;
}

export interface LoginCredentials {
  emailOrPhone: string;
  password: string;
  role?: UserRole;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  city?: string;
  specialization?: string;
  experience?: string;
  hasTools?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
}
