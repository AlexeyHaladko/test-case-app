import { useQuery } from "@tanstack/react-query";
import { get } from "@/api/client.ts";
import { QUERY_KEYS } from "@/api/query-keys.ts";
import { PATHS } from "@/api/paths.ts";
import { getAuthToken } from "@/api/utils.ts";
import type { PaginatedCropResponse, TableDataRetrieveParams } from "@/api/generated.schemas.ts";

export function useGetTableData(params: TableDataRetrieveParams) {
  const token = getAuthToken()
  return useQuery({
    queryKey: [QUERY_KEYS.getTableData, params],
    queryFn: () => get<PaginatedCropResponse>(PATHS.getTableData, { params }),
    staleTime: 0,
    retry: false,
    enabled: !!token,
  });
}
