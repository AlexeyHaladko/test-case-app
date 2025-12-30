import { Outlet } from "react-router";
import ErrorBoundaryFallback from "@/common/components/error-boundary-fallback.tsx";
import { ErrorBoundary } from "react-error-boundary";

export function AuthLayout() {
  return (
    <div className="auth-container"
         style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}