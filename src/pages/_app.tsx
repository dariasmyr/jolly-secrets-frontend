import { ReactNode, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledComponentProvider } from 'styled-components';

import { useApolloClient } from '@/services/apollo-client.service';
import { log } from '@/services/log';
import { useSettingsStore } from '@/store/settings.store';
import { themeMui, themeMuiDark, themeStyled } from '@/theme';

import '../styles/global.css';

import nextI18NextConfig from '../../next-i18next.config';

import { ThemeProvider as MaterialUiProvider } from '@mui/material/styles';

const handleError = (event: ErrorEvent): void => {
  log.error('Unhandled error', event.error);
};

const handlePromiseRejection = (event: PromiseRejectionEvent): void => {
  log.error('Unhandled promise rejection', event.reason);
};

function MyApp({ Component, pageProps }: AppProps): ReactNode {
  const { debugMode } = useSettingsStore();
  const apolloClient = useApolloClient();
  const [rendered, setRendered] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for tracking dark mode

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  if (!apolloClient) {
    return <div>ApolloClient is not initialized</div>;
  }

  if (!rendered) {
    return <div>Loading...</div>;
  }

  // Select the appropriate theme based on the darkMode state
  const selectedTheme = darkMode ? themeMuiDark : themeMui;

  return (
    <StyledComponentProvider theme={themeStyled}>
      <MaterialUiProvider theme={selectedTheme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </StyledEngineProvider>
      </MaterialUiProvider>
      {debugMode && (
        <Script
          src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
          onLoad={(): void => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-new
            new window.VConsole();
          }}
        />
      )}
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </StyledComponentProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
