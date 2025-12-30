import type { LoginRequest, User } from "@/api/generated.schemas.ts";
import { createContext, useContext } from "react";

interface IAuthContext {
  user?: User;
  login: (payload: LoginRequest) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userDataLoading: boolean;
  loginProcessing: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};