import { type PropsWithChildren } from 'react';
import useGetUserInfo from "@/api/auth/useGetUserInfo.ts";
import { useNavigate } from "react-router";
import useLogin from "@/api/auth/useLogin.ts";
import { clearAuthToken, getAuthToken, setAuthToken } from "@/api/utils.ts";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/queryKeys.ts";
import { PAGE_PATHS } from "@/routes.ts";
import { AuthContext } from "./context";
import { useSnackbar } from "@/common/contexts/snackbar/snackbar-context";

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
