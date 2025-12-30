import { createTheme, type PaletteMode } from '@mui/material/styles';

export const getAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        }
      : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
        }),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0px 2px 8px rgba(103, 58, 183, 0.3)'
            : '0px 2px 8px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});