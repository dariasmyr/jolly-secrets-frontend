import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00639a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d5e4f7',
      contrastText: '#0e1d2a',
    },
    warning: {
      main: '#EFDBFF',
      contrastText: '#231533',
    },
    error: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#d5e4f6',
      contrastText: '#0e1d2a',
    },
    background: {
      default: '#FCFCFF',
      paper: '#EFF4FA',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#95ccff',
      contrastText: '#003352',
    },
    secondary: {
      main: '#b9c8da',
      contrastText: '#233240',
    },
    warning: {
      main: '#504061',
      contrastText: '#382a49',
    },
    error: {
      main: '#ffb4ab',
      contrastText: '#AB99BC',
    },
    info: {
      main: '#3a4857',
      contrastText: '#d5e4f6',
    },
    background: {
      default: '#1a1c1e',
      paper: '#1A1C1E',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
