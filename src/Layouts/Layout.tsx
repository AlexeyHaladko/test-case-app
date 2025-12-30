import { Outlet } from "react-router";
import ErrorBoundaryFallback from "@/common/components/error-boundary-fallback.tsx";
import { ErrorBoundary } from "react-error-boundary";
import NavigationBar from "@/features/navigation/navigation-bar.tsx";

function Layout() {

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <NavigationBar />
      <Outlet />
    </ErrorBoundary>
  )
}

export default Layout;