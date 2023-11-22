import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a04028',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#77574f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f7e1a6',
      contrastText: '#000000',
    },
    error: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#a28f5c',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFBFF',
      paper: '#FAF1F4',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark', // Set mode to 'dark'
    primary: {
      main: '#a04028',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#77574f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f7e1a6',
      contrastText: '#000000',
    },
    error: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#a28f5c',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
