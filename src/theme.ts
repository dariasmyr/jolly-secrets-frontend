import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#215fa6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d9e3f8',
      contrastText: '#121c2b',
    },
    warning: {
      main: '#f7d8ff',
      contrastText: '#27132f',
    },
    error: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    info: {
      main: '#e0e2ec',
      contrastText: '#43474e',
    },
    background: {
      default: '#fdfbff',
      paper: '#e0e2ec',
    },
  },
});

export const themeMuiDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a6c8ff',
      contrastText: '#00305f',
    },
    secondary: {
      main: '#bdc7dc',
      contrastText: '#273141',
    },
    warning: {
      main: '#dabde2',
      contrastText: '#273141',
    },
    error: {
      main: '#ffb4ab',
      contrastText: '#690005',
    },
    info: {
      main: '#3d4758',
      contrastText: '#d9e3f8',
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
