import { Outlet } from "react-router";
import ErrorBoundaryFallback from "@/common/components/error-boundary-fallback";
import { ErrorBoundary } from "react-error-boundary";
import NavigationBar from "@/features/navigation/navigation-bar";

function CommonLayout() {

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <NavigationBar />
      <Outlet />
    </ErrorBoundary>
  )
}

export default CommonLayout;