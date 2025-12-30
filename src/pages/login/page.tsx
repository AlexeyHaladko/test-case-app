import { Container, Box, Typography } from "@mui/material";
import { Suspense, useEffect } from "react";
import { replace, useNavigate } from "react-router";
import { PAGE_PATHS } from "@/routes.ts";
import LoginForm from "@/features/login/login-form.tsx";
import { useAuth } from "@/common/contexts/auth/context.ts";

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated)  {
      navigate(`/test-case-app/${PAGE_PATHS.DASHBOARD}`);
    }
  }, [isAuthenticated, navigate]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxWidth="sm">
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </Suspense>
  )
}