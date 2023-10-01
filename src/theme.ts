import { createTheme } from '@mui/material';

export const themeMui = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F36D21',
      contrastText: '#fff',
    },
    warning: {
      main: '#C62828',
      contrastText: '#fff',
    },
  },
});

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
