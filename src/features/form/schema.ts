import { FieldKeys } from "@/features/form/field-keys.tsx";
import { ContactMethodEnum } from "@/api/generated.schemas.ts";
import { z } from "zod";

export const formSchema = z.object({
  [FieldKeys.contact_method]: z.enum(ContactMethodEnum),
  [FieldKeys.full_name]: z.string().min(3, "Name must be at least 3 characters"),
  [FieldKeys.password]: z.string()
      .min(8, "Password should be at least 8 characters long")
      .regex(/[a-z]/, "Should contain at least one lowercase letter")
      .regex(/[A-Z]/, "Should contain at least one uppercase letter")
      .regex(/[0-9]/, "Should contain at least one digit"),
  [FieldKeys.age]: z.number().int().min(1).max(150).optional(),
  [FieldKeys.phone]: z.string().optional().or(z.literal("")).refine(
      (val) => !val || /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(val),
      { message: "Invalid phone number format" }
  ),
  [FieldKeys.country]: z.string().optional(),
  [FieldKeys.website]: z.url().optional().or(z.literal("")),
  [FieldKeys.bio]: z.string().max(500).optional(),
  [FieldKeys.email]: z.email("Should be a valid email"),
  [FieldKeys.agree_terms]: z.boolean().refine(value => value, { message: "You must agree to terms and conditions" }),
}).superRefine((values, ctx) => {
  if ((values[FieldKeys.contact_method] === ContactMethodEnum.phone || values[FieldKeys.contact_method] === ContactMethodEnum.both) && !values[FieldKeys.phone]) {
    ctx.addIssue({
      code: "custom",
      message: "Phone is required",
      path: [FieldKeys.phone],
    });
  }
});