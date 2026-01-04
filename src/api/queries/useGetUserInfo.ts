import { useQuery } from "@tanstack/react-query";
import { get } from "@/api/client.ts";
import { QUERY_KEYS } from "@/api/query-keys.ts";
import { PATHS } from "@/api/paths.ts";
import type { User } from "@/api/generated.schemas.ts";
import { getAuthToken } from "@/api/utils.ts";

export function useGetUserInfo() {
  const token = getAuthToken()
  return useQuery({
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => get<User>(PATHS.getUserInfo),
    staleTime: Infinity,
    retry: false,
    enabled: !!token,
  });
}
