import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0856cf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dce2f9',
      contrastText: '#151b2c',
    },
    warning: {
      main: '#735471',
      contrastText: '#ffffff',
    },
    error: {
      main: '#fefbff',
      contrastText: '#ffffff',
    },
    info: {
      main: '#585e71',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fefbff',
      paper: '#fefbff',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b2c5ff',
      contrastText: '#002b72',
    },
    secondary: {
      main: '#404659',
      contrastText: '#dce2f9',
    },
    warning: {
      main: '#e1bbdd',
      contrastText: '#412741',
    },
    error: {
      main: '#ffb4ab',
      contrastText: '#690005',
    },
    info: {
      main: '#c0c6dd',
      contrastText: '#2a3042',
    },
    background: {
      default: '#1b1b1f',
      paper: '#e4e2e6',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
