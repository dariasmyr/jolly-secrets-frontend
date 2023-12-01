import { ReactNode, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider as StyledComponentProvider } from 'styled-components';

import { useApolloClient } from '@/services/apollo-client.service';
import { log } from '@/services/log';
import { useSocketIo } from '@/services/use-socket-io';
import { useSettingsStore } from '@/store/settings.store';
import { useThemeStore } from '@/store/theme.store';
import { getThemeMui, themeStyled } from '@/theme';

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
  const { darkMode } = useThemeStore();
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    link: '',
  });
  const handleClose = (): void => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  const socket = useSocketIo();
  const router = useRouter();

  useEffect(() => {
    if (router.route !== '/chat') {
      console.log('Subscribe to socket.io');
      socket.on('new_message', (parameters) => {
        console.log('AAAAAAAAAAAA NEW MESSAGE:', parameters.text);
        // eslint-disable-next-line no-alert
        setAlertInfo({
          open: true,
          message: `<strong>New message:</strong> "${parameters.text}". `,
          link: parameters.link,
        });
      });
    }

    return () => {
      console.log('Unsubscribe to socket.io');
      socket.close();
    };
  }, []);

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

  if (!apolloClient) {
    return <div>ApolloClient is not initialized</div>;
  }

  if (!rendered) {
    return <div>Loading...</div>;
  }

  const selectedTheme = getThemeMui(darkMode);

  return (
    <StyledComponentProvider theme={themeStyled}>
      <MaterialUiProvider theme={selectedTheme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
          <Snackbar
            open={alertInfo.open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info">
              {alertInfo.message}
              <Link href={alertInfo.link}>
                <a>Go by link to see it</a>
              </Link>
            </Alert>
          </Snackbar>
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
    </StyledComponentProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
