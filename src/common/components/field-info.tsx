import type { AnyFieldApi } from "@tanstack/react-form";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const errors = field.state.meta.errors
  const errorText = errors?.map(error => error.message).join(", ")
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{errorText}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export default FieldInfo;