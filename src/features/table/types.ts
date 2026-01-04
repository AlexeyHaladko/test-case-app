import type { CropRecord } from "@/api/generated.schemas.ts";

export interface HeadCell {
  field: keyof CropRecord;
  headerName: string;
  sortable: boolean;
}