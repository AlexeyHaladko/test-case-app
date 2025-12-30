import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { post } from "@/api/client.ts";
import { PATHS } from "@/api/paths.ts";
import type { LoginRequest, TokenResponse } from "@/api/generated.schemas.ts";

const login = async (payload: LoginRequest): Promise<TokenResponse> => {
  return await post<LoginRequest, TokenResponse>(PATHS.login, payload);
}

function useLogin(options: UseMutationOptions<TokenResponse, string, LoginRequest> = {}) {
  const query = useMutation<TokenResponse, string, LoginRequest>({
    mutationFn: login,
    ...options
  });

  return query;
}

export default useLogin;