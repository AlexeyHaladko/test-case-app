import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { AuthProvider } from "@/common/contexts/auth/auth-context.tsx";
import { SnackbarProvider } from "@/common/contexts/snackbar/snackbar-context.tsx";
import { queryClient } from "@/common/config.ts";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "@/common/theme.ts";
import { useState, useMemo } from "react";
import { type ColorMode, ColorModeContext } from "@/common/contexts/theme/color-mode-context.tsx";

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
          <CssBaseline />
          <SnackbarProvider>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;