import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d7e3f8',
      contrastText: '#001c38',
    },
    secondary: {
      main: '#d7e3f8',
      contrastText: '#111c2b',
    },
    warning: {
      main: '#f5d9ff',
      contrastText: '#261431',
    },
    error: {
      main: '#ffdad6',
      contrastText: '#410002',
    },
    info: {
      main: '#dfe2eb',
      contrastText: '#43474e',
    },
    background: {
      default: '#fdfbff',
      paper: '#215FA60D',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#004881',
      contrastText: '#d3e4ff',
    },
    secondary: {
      main: '#3c4758',
      contrastText: '#d7e3f8',
    },
    warning: {
      main: '#543f5e',
      contrastText: '#f5d9ff',
    },
    error: {
      main: '#ffb4ab',
      contrastText: '#690005',
    },
    info: {
      main: '#43474e',
      contrastText: '#c3c6cf',
    },
    background: {
      default: '#1a1c1e',
      paper: '#43474e',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
