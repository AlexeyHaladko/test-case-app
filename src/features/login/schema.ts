import { z } from "zod";
import { FieldKeys } from "@/features/login/field-keys.ts";

export const loginSchema = z.object({
  [FieldKeys.username]: z.string().min(1, "Field is required"),
  [FieldKeys.password]: z.string().min(8, "Field is required"),
})