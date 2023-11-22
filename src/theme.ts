import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006397',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d4e4f6',
      contrastText: '#0d1d2a',
    },
    warning: {
      main: '#eddcff',
      contrastText: '#221534',
    },
    error: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#dee3eb',
      contrastText: '#42474e',
    },
    background: {
      default: '#fcfcff',
      paper: '#EFF4FA',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#92ccff',
      contrastText: '#003351',
    },
    secondary: {
      main: '#b8c8da',
      contrastText: '#23323f',
    },
    warning: {
      main: '#d1bfe7',
      contrastText: '#372a4a',
    },
    error: {
      main: '#ffb4ab',
      contrastText: '#690005',
    },
    info: {
      main: '#394857',
      contrastText: '#d4e4f6',
    },
    background: {
      default: '#1a1c1e',
      paper: '#202529',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
