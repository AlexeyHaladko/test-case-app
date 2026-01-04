import { type PropsWithChildren } from 'react';

import { useGetUserInfo, useLogin } from "@/api/queries";
import { useNavigate } from "react-router";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/api/utils";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/query-keys";
import { PAGE_PATHS } from "@/routes";
import { useSnackbar } from "@/common/contexts/snackbar-context";
import type { LoginRequest, User } from "@/api/generated.schemas";
import { createContext, useContext } from "react";

interface IAuthContext {
  user?: User;
  login: (payload: LoginRequest) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userDataLoading: boolean;
  loginProcessing: boolean;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = getAuthToken();

  const { data: userData, isLoading: userLoading } = useGetUserInfo();
  const { mutate: login, isPending: loginProcessing } = useLogin({
    onSuccess: (data) => {
      queryClient.setQueryData( [QUERY_KEYS.userInfo], data.user);
      setAuthToken(data.access);
    },
    onError: (error) => {
      showSnackbar(error, "error");
    }
  });
  const logout = () => {
    clearAuthToken();
    queryClient.setQueryData( [QUERY_KEYS.userInfo], null);
    navigate(PAGE_PATHS.LOGIN);
  }

  const value = {
    login,
    user: userData,
    logout,
    isAuthenticated: !!userData && !!token,
    userDataLoading: userLoading,
    loginProcessing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};