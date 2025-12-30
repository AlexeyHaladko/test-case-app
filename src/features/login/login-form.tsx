import { Button, Box, Stack } from "@mui/material";
import { useForm } from "@tanstack/react-form";

import { useAuth } from "@/common/contexts/auth/context";
import { loginSchema } from "./schema";
import { FieldKeys } from "./field-keys";
import FormField from "@/common/components/form-field.tsx";

function LoginForm() {
  const { login } = useAuth();
  const form = useForm({
    defaultValues: {
      [FieldKeys.username]: 'testuser',
      [FieldKeys.password]: 'Test1234!',
    },
    onSubmit: ({ value }) => {
      login(value)
    },
    validators: {
      onChange: loginSchema,
    },
  })

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <form onSubmit={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        await form.handleSubmit()
      }}>
        <Stack spacing={2}>
          <FormField form={form} name={FieldKeys.username} label="Username"/>
          <FormField form={form} name={FieldKeys.password} label="Password" type="password"/>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!canSubmit}
                loading={isSubmitting}
              >
                Login
              </Button>
            )}
          />
        </Stack>
      </form>
    </Box>
  )
}

export default LoginForm;

/*
Username: testuser
Password: Test1234!
* */