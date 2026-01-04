import { useEffect } from "react";
import { z } from "zod";
import { Button, Stack, MenuItem } from "@mui/material";

import { useForm } from "@tanstack/react-form";
import { useSubmitForm } from "@/api/queries";
import { ContactMethodEnum } from "@/api/generated.schemas";
import FormField from "@/common/components/form-field";
import { FORM_FIELD_TYPES } from "@/common/constants";
import { useSnackbar } from "@/common/contexts/snackbar-context";

import { FieldKeys } from "./field-keys";
import { formSchema } from "./schema";

type FormValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES: FormValues = {
  [FieldKeys.full_name]: "",
  [FieldKeys.password]: "",
  [FieldKeys.phone]: "",
  [FieldKeys.age]: undefined,
  [FieldKeys.website]: "",
  [FieldKeys.country]: "",
  [FieldKeys.bio]: "",
  [FieldKeys.email]: "",
  [FieldKeys.contact_method]: ContactMethodEnum.email,
  [FieldKeys.agree_terms]: false,
};

export function SubmitForm() {
  const { showSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onChange: formSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  const { mutate } = useSubmitForm(
    {
      onSuccess: () => {
        form.reset(DEFAULT_VALUES);
        showSnackbar("Form submitted successfully!", "success");
      },
      onError: (error) => {
        showSnackbar(error.message || "An error occurred", "error");
      },
    }
  );

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <Stack spacing={2} sx={{ width: "100%", maxWidth: 800 }}>
          <FormField form={form} name={FieldKeys.full_name} label="Full Name" />
          <FormField form={form} name={FieldKeys.email} label="Email" type="email" />
          <FormField form={form} name={FieldKeys.phone} label="Phone" />
          <FormField form={form} name={FieldKeys.website} label="Website" type="url" />
          <FormField form={form} name={FieldKeys.password} label="Password" type="password" />
          <FormField form={form} name={FieldKeys.age} label="Age" type="number" />
          <FormField form={form} name={FieldKeys.country} label="Country" />

          <FormField form={form} name={FieldKeys.bio} label="Bio" formFieldType={FORM_FIELD_TYPES.textarea} />

          <FormField form={form} name={FieldKeys.contact_method} label="Contact Method"
                     formFieldType={FORM_FIELD_TYPES.select}>
            {Object.values(ContactMethodEnum).map((method) => (
              <MenuItem key={method} value={method}>{method}</MenuItem>
            ))}
          </FormField>
          <FormField form={form} name={FieldKeys.agree_terms} label="Agree Terms"
                     formFieldType={FORM_FIELD_TYPES.checkbox} />
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                loading={isSubmitting}
              >
                Submit Form
              </Button>
            )}
          </form.Subscribe>
        </Stack>
      </form>
    </>
  )
}
