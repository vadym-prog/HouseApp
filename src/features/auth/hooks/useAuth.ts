import { useContext } from "react";
import { AuthContext } from "../context/authContextDef";
import type { AuthContextType } from "../types";

/**
 * Custom hook to access authentication state and dispatch auth actions
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
