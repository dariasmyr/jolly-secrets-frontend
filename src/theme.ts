import { createTheme } from '@mui/material';

export const colors = {
  primary: {
    light: {
      main: 'rgba(0, 96, 169, 0.8)',
      contrastText: '#ffffff',
    },
    dark: {
      main: '#a2c9ff',
      contrastText: '#00315b',
    },
  },
  secondary: {
    light: {
      main: '#d7e3f8',
      contrastText: '#111c2b',
    },
    dark: {
      main: '#3c4758',
      contrastText: '#d7e3f8',
    },
  },
  warning: {
    light: {
      main: '#f5d9ff',
      contrastText: '#261431',
    },
    dark: {
      main: '#543f5e',
      contrastText: '#f5d9ff',
    },
  },
  error: {
    light: {
      main: '#ba1a1a',
      contrastText: '#ffffff',
    },
    dark: {
      main: '#ffb4ab',
      contrastText: '#690005',
    },
  },
  info: {
    light: {
      main: '#dfe2eb',
      contrastText: '#43474e',
    },
    dark: {
      main: '#43474e',
      contrastText: '#c3c6cf',
    },
  },
  background: {
    default: {
      light: '#fdfbff',
      dark: '#1A1C1E',
    },
    paper: {
      light: '#F2F3FA',
      dark: '#202529',
    },
  },
};

export const getThemeMui = (darkMode = false): ReturnType<typeof createTheme> =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? colors.primary.dark.main : colors.primary.light.main,
        contrastText: darkMode
          ? colors.primary.dark.contrastText
          : colors.primary.light.contrastText,
      },
      secondary: {
        main: darkMode
          ? colors.secondary.dark.main
          : colors.secondary.light.main,
        contrastText: darkMode
          ? colors.secondary.dark.contrastText
          : colors.secondary.light.contrastText,
      },
      warning: {
        main: darkMode ? colors.warning.dark.main : colors.warning.light.main,
        contrastText: darkMode
          ? colors.warning.dark.contrastText
          : colors.warning.light.contrastText,
      },
      error: {
        main: darkMode ? colors.error.dark.main : colors.error.light.main,
        contrastText: darkMode
          ? colors.error.dark.contrastText
          : colors.error.light.contrastText,
      },
      info: {
        main: darkMode ? colors.info.dark.main : colors.info.light.main,
        contrastText: darkMode
          ? colors.info.dark.contrastText
          : colors.info.light.contrastText,
      },
      background: {
        default: darkMode
          ? colors.background.default.dark
          : colors.background.default.light,
        paper: darkMode
          ? colors.background.paper.dark
          : colors.background.paper.light,
      },
    },
  });

export const themeStyled = {
  buttonsPaddings: 10,
} as const;
