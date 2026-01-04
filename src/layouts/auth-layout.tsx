import { Outlet } from "react-router";
import ErrorBoundaryFallback from "@/common/components/error-boundary-fallback";
import { ErrorBoundary } from "react-error-boundary";
import { Box } from "@mui/material";

export function AuthLayout() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Outlet />
        </ErrorBoundary>
    </Box>
  );
}