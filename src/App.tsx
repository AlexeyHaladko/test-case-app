import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { AuthProvider, SnackbarProvider, ColorModeContext, type ColorMode } from "@/common/contexts";
import { queryClient } from "@/common/config";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "@/common/theme";
import { useState, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "@/common/components/error-boundary-fallback";

function App() {
  const [mode, setMode] = useState<ColorMode>('light');

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), [mode]);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <CssBaseline />
          <SnackbarProvider>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </SnackbarProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;