import type { AnyFieldApi, ReactFormApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { FORM_FIELD_TYPES } from "@/common/constants.ts";
import { Checkbox, Select, TextField, FormControl, InputLabel, FormHelperText, FormControlLabel } from "@mui/material";

interface FormFieldProps<TData> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  form: ReactFormApi;
  name: keyof TData;
  label: string;
  type?: string;
  formFieldType?: FORM_FIELD_TYPES;
  children?: ReactNode;
}

function FormField<TData>({ form, name, label, type = "text", formFieldType = FORM_FIELD_TYPES.input, children }: FormFieldProps<TData>) {
  return (
    <form.Field name={name}>
      {(field: AnyFieldApi) => {
        const errorText = field.state.meta.isTouched && field.state.meta.errors?.length 
          ? field.state.meta.errors.map(error => error.message).join(", ") 
          : "";
        const isError = !!errorText;

        return (
          <FormControl fullWidth error={isError}>
            {formFieldType === FORM_FIELD_TYPES.input && (
              <TextField
                label={label}
                id={field.name}
                type={type}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const val = type === "number" ? (e.target as HTMLInputElement).valueAsNumber : e.target.value;
                  field.handleChange(val);
                }}
                error={isError}
                helperText={errorText || (field.state.meta.isValidating ? 'Validating...' : null)}
                fullWidth
              />
            )}

            {formFieldType === FORM_FIELD_TYPES.textarea && (
              <TextField
                label={label}
                id={field.name}
                multiline
                minRows={5}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                error={isError}
                helperText={errorText}
                fullWidth
              />
            )}

            {formFieldType === FORM_FIELD_TYPES.select && (
              <>
                <InputLabel id={`${field.name}-label`}>{label}</InputLabel>
                <Select
                  labelId={`${field.name}-label`}
                  label={label}
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={isError}
                >
                  {children}
                </Select>
                {isError && <FormHelperText>{errorText}</FormHelperText>}
              </>
            )}

            {formFieldType === FORM_FIELD_TYPES.checkbox && (
              <FormControlLabel
                control={
                  <Checkbox
                    id={field.name}
                    checked={!!field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const val = e.target.checked;
                      field.handleChange(val);
                    }}
                  />
                }
                label={label}
              />
            )}
          </FormControl>
        );
      }}
    </form.Field>
  );
}

export default FormField;